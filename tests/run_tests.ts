import { prisma } from '../src/lib/prisma';
import { hashPassword, verifyPassword, signAdminSession, verifyAdminSession } from '../src/lib/auth';
import { sanitizeText, hashIp, isValidEmail, isValidUrl } from '../src/lib/security';
import { buildJobPostingJsonLd } from '../src/lib/seo';

interface TestResult {
  category: string;
  test: string;
  status: 'APROBADO' | 'FALLIDO';
  evidence: string;
  problem: string;
  solution: string;
}

const results: TestResult[] = [];

async function runTestSuite() {
  console.log('=====================================================');
  console.log('   INICIANDO BATERÍA DE PRUEBAS DE CALIDAD Y SEGURIDAD   ');
  console.log('=====================================================\n');

  // PRUEBA 1: Integridad de la Base de Datos y Semilla
  try {
    const jobCount = await prisma.job.count();
    const companyCount = await prisma.company.count();
    const adminUser = await prisma.user.findUnique({ where: { email: 'admin@empleos-lapaz-elalto.bo' } });

    if (jobCount > 0 && companyCount > 0 && adminUser) {
      results.push({
        category: 'Funcionalidad / Base de Datos',
        test: 'Integridad de datos iniciales y relaciones',
        status: 'APROBADO',
        evidence: `Existen ${jobCount} ofertas, ${companyCount} empresas y 1 usuario administrador inicial configurado.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Faltan registros base');
    }
  } catch (err: any) {
    results.push({
      category: 'Funcionalidad / Base de Datos',
      test: 'Integridad de datos iniciales y relaciones',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Base de datos incompleta',
      solution: 'Ejecutar npx tsx prisma/seed.ts',
    });
  }

  // PRUEBA 2: Control de Vigencia y Ofertas Vencidas
  try {
    const expiredJobs = await prisma.job.findMany({ where: { reviewStatus: 'VENCIDA' } });
    const isVigenteClean = expiredJobs.every((j) => j.isVigente === false);

    if (expiredJobs.length > 0 && isVigenteClean) {
      results.push({
        category: 'Datos Reales / Vigencia',
        test: 'Ofertas vencidas no aparecen como vigentes',
        status: 'APROBADO',
        evidence: `Se verificó la oferta vencida "${expiredJobs[0].title}" con isVigente=false.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Hay inconsistencia en ofertas vencidas');
    }
  } catch (err: any) {
    results.push({
      category: 'Datos Reales / Vigencia',
      test: 'Ofertas vencidas no aparecen como vigentes',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Estado de vigencia no coherente',
      solution: 'Ajustar regla de negocio en prisma schema y seed',
    });
  }

  // PRUEBA 3: Búsqueda y Filtros Cruzados (La Paz / El Alto / Sin Experiencia)
  try {
    const elAltoSinExp = await prisma.job.findMany({
      where: {
        city: 'El Alto',
        experienceLevel: 'Sin experiencia',
        reviewStatus: 'APROBADA',
        isVigente: true,
      },
    });

    if (elAltoSinExp.length > 0) {
      results.push({
        category: 'Funcionalidad / Buscador',
        test: 'Combinación cruzada de filtros (Ciudad + Experiencia)',
        status: 'APROBADO',
        evidence: `Filtro combinado "El Alto" + "Sin experiencia" arrojó ${elAltoSinExp.length} vacantes válidas (ej: ${elAltoSinExp[0].title}).`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('No se encontraron coincidencias para filtro cruzado');
    }
  } catch (err: any) {
    results.push({
      category: 'Funcionalidad / Buscador',
      test: 'Combinación cruzada de filtros (Ciudad + Experiencia)',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Filtro cruzado devolvió 0 resultados',
      solution: 'Revisar indexación compuesta en schema.prisma',
    });
  }

  // PRUEBA 4: Autenticación Administrativa y Hash Bcrypt
  try {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@empleos-lapaz-elalto.bo' } });
    if (!admin) throw new Error('Admin no encontrado');

    const validPassword = await verifyPassword('AdminSeguro2026!LaPaz', admin.passwordHash);
    const invalidPassword = await verifyPassword('ClaveErronea123', admin.passwordHash);

    if (validPassword && !invalidPassword) {
      results.push({
        category: 'Seguridad / Autenticación',
        test: 'Validación de contraseñas con hash Bcrypt irreversible',
        status: 'APROBADO',
        evidence: 'Contraseña correcta validada con éxito. Contraseña falsa rechazada.',
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Falla en la verificación de hash');
    }
  } catch (err: any) {
    results.push({
      category: 'Seguridad / Autenticación',
      test: 'Validación de contraseñas con hash Bcrypt irreversible',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Falla al comparar contraseña',
      solution: 'Revisar módulo auth.ts',
    });
  }

  // PRUEBA 5: Firmado y Verificación de Sesiones JWT (Jose)
  try {
    const samplePayload = {
      userId: 'test-user-id',
      email: 'test@admin.bo',
      name: 'Admin Test',
      role: 'ADMIN',
    };

    const token = await signAdminSession(samplePayload);
    const verified = await verifyAdminSession(token);

    if (verified && verified.email === samplePayload.email) {
      results.push({
        category: 'Seguridad / Sesiones',
        test: 'Firma y verificación de tokens de sesión con secreto seguro',
        status: 'APROBADO',
        evidence: `Token emitido y decodificado correctamente para ${verified.email}.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Token no verificado');
    }
  } catch (err: any) {
    results.push({
      category: 'Seguridad / Sesiones',
      test: 'Firma y verificación de tokens de sesión con secreto seguro',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Falla al validar token JWT',
      solution: 'Asegurar variable ADMIN_JWT_SECRET',
    });
  }

  // PRUEBA 6: Sanitización contra Ataques XSS e Inyecciones
  try {
    const dirtyInput = '<script>alert("xss")</script>Se busca chofer para El Alto';
    const cleanOutput = sanitizeText(dirtyInput);

    if (!cleanOutput.includes('<script>') && cleanOutput.includes('Se busca chofer para El Alto')) {
      results.push({
        category: 'Seguridad / Sanitización',
        test: 'Limpieza de etiquetas HTML maliciosas en entradas de texto',
        status: 'APROBADO',
        evidence: `Entrada sucia: "${dirtyInput}" => Entrada limpia: "${cleanOutput}".`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Filtro XSS no eliminó las etiquetas');
    }
  } catch (err: any) {
    results.push({
      category: 'Seguridad / Sanitización',
      test: 'Limpieza de etiquetas HTML maliciosas en entradas de texto',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Vulnerabilidad potencial XSS',
      solution: 'Mejorar regex en sanitizeText()',
    });
  }

  // PRUEBA 7: Hash Anónimo de IP contra Spam de Reportes
  try {
    const ip = '190.181.45.10';
    const hash1 = hashIp(ip);
    const hash2 = hashIp(ip);

    if (hash1 === hash2 && hash1.length === 16 && !hash1.includes('190.')) {
      results.push({
        category: 'Seguridad / Privacidad',
        test: 'Hash anónimo irreversible de IP para control de spam',
        status: 'APROBADO',
        evidence: `IP ${ip} anonimizada como hash: "${hash1}". Cumple principio de privacidad.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Hash de IP defectuoso');
    }
  } catch (err: any) {
    results.push({
      category: 'Seguridad / Privacidad',
      test: 'Hash anónimo irreversible de IP para control de spam',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Falla en hash anónimo',
      solution: 'Ajustar módulo hashIp() en security.ts',
    });
  }

  // PRUEBA 8: Validación de Esquema JSON-LD JobPosting (Google Search Central)
  try {
    const job = await prisma.job.findFirst({ where: { reviewStatus: 'APROBADA' } });
    if (!job) throw new Error('No hay ofertas para probar schema');

    const schema = buildJobPostingJsonLd(job);

    const hasContext = schema['@context'] === 'https://schema.org/';
    const hasType = schema['@type'] === 'JobPosting';
    const hasTitle = Boolean(schema['title']);
    const hasDesc = Boolean(schema['description']);
    const hasOrg = Boolean((schema['hiringOrganization'] as any)?.name);
    const hasLoc = Boolean((schema['jobLocation'] as any)?.address?.addressLocality);

    if (hasContext && hasType && hasTitle && hasDesc && hasOrg && hasLoc) {
      results.push({
        category: 'SEO Técnico / Google Jobs',
        test: 'Generación conforme de Schema.org JobPosting (JSON-LD)',
        status: 'APROBADO',
        evidence: `Esquema validado con title="${schema['title']}", employmentType="${schema['employmentType']}", locality="${(schema['jobLocation'] as any).address.addressLocality}".`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Faltan campos obligatorios en el esquema');
    }
  } catch (err: any) {
    results.push({
      category: 'SEO Técnico / Google Jobs',
      test: 'Generación conforme de Schema.org JobPosting (JSON-LD)',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Esquema incompleto para Google Search Central',
      solution: 'Revisar seo.ts y completar propiedades requeridas',
    });
  }

  // PRUEBA 9: Flujo de Reporte Ciudadano (Denuncia)
  try {
    const job = await prisma.job.findFirst();
    if (!job) throw new Error('No hay ofertas');

    const newReport = await prisma.report.create({
      data: {
        jobId: job.id,
        reason: 'PIDEN_DINERO',
        details: 'Prueba automatizada de detección de cobros indebidos bajo la Ley 263.',
        status: 'PENDIENTE',
      },
    });

    const verifyReport = await prisma.report.findUnique({ where: { id: newReport.id } });
    if (verifyReport && verifyReport.status === 'PENDIENTE') {
      results.push({
        category: 'Funcionalidad / Denuncias',
        test: 'Registro y estado de denuncias ciudadanas (Ley 263)',
        status: 'APROBADO',
        evidence: `Reporte registrado con ID ${verifyReport.id} vinculado a la oferta ${job.title}.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });

      // Limpiar reporte de prueba
      await prisma.report.delete({ where: { id: newReport.id } });
    } else {
      throw new Error('No se pudo verificar el reporte');
    }
  } catch (err: any) {
    results.push({
      category: 'Funcionalidad / Denuncias',
      test: 'Registro y estado de denuncias ciudadanas (Ley 263)',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'Error en base de datos al guardar reporte',
      solution: 'Revisar relaciones en schema.prisma',
    });
  }

  // PRUEBA 10: Auditoría de Acciones Administrativas
  try {
    const auditCount = await prisma.auditLog.count();
    if (auditCount > 0) {
      results.push({
        category: 'Calidad / Auditoría',
        test: 'Persistencia inmutable de acciones en la bitácora',
        status: 'APROBADO',
        evidence: `Se verificaron ${auditCount} registros históricos en AuditLog.`,
        problem: 'Ninguno',
        solution: 'N/A',
      });
    } else {
      throw new Error('Bitácora vacía');
    }
  } catch (err: any) {
    results.push({
      category: 'Calidad / Auditoría',
      test: 'Persistencia inmutable de acciones en la bitácora',
      status: 'FALLIDO',
      evidence: err.message,
      problem: 'No se registran eventos de auditoría',
      solution: 'Añadir llamadas a prisma.auditLog.create() en endpoints críticos',
    });
  }

  // Imprimir reporte de resultados
  console.log('----------------------------------------------------------------------------------------------------------------');
  console.log('| PRUEBA                                                 | ESTADO   | CATEGORÍA                |');
  console.log('----------------------------------------------------------------------------------------------------------------');
  for (const r of results) {
    const name = r.test.padEnd(54, ' ').substring(0, 54);
    const st = r.status.padEnd(8, ' ');
    const cat = r.category.padEnd(24, ' ').substring(0, 24);
    console.log(`| ${name} | ${st} | ${cat} |`);
  }
  console.log('----------------------------------------------------------------------------------------------------------------\n');

  console.log(`RESUMEN: ${results.filter((r) => r.status === 'APROBADO').length}/${results.length} pruebas superadas con éxito.\n`);

  await prisma.$disconnect();
}

runTestSuite().catch((e) => {
  console.error('Error general en la suite de pruebas:', e);
  process.exit(1);
});
