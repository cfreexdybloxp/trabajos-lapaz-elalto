import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando siembra de base de datos para La Paz y El Alto ---');

  // Limpiar datos previos si existen
  await prisma.report.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // 1. Crear Usuario Administrador Principal
  const adminPasswordHash = await bcrypt.hash('AdminSeguro2026!LaPaz', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@empleos-lapaz-elalto.bo',
      name: 'Equipo de Verificación La Paz - El Alto',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log(`✓ Administrador creado: ${admin.email}`);

  // 2. Crear Empresas Verificadas
  const fie = await prisma.company.create({
    data: {
      name: 'Banco FIE S.A.',
      slug: 'banco-fie-sa',
      description: 'Entidad bancaria boliviana con sólida presencia en microfinanzas y servicios financieros para la comunidad paceña y alteña.',
      website: 'https://www.bancofie.com.bo',
      city: 'La Paz',
      isVerified: true,
      verifiedAt: new Date('2026-09-01'),
    },
  });

  const venado = await prisma.company.create({
    data: {
      name: 'Industrias Venado S.A.',
      slug: 'industrias-venado-sa',
      description: 'Tradicional empresa manufacturera boliviana de alimentos y bienes de consumo con plantas en La Paz y El Alto.',
      website: 'https://www.venado.com.bo',
      city: 'El Alto',
      isVerified: true,
      verifiedAt: new Date('2026-09-15'),
    },
  });

  const illimani = await prisma.company.create({
    data: {
      name: 'Agencia Digital Illimani Tech',
      slug: 'agencia-digital-illimani-tech',
      description: 'Empresa paceña de desarrollo de software, comercio electrónico y marketing digital.',
      website: 'https://illimani-tech.bo',
      city: 'La Paz',
      isVerified: true,
      verifiedAt: new Date('2026-10-01'),
    },
  });

  const gamlp = await prisma.company.create({
    data: {
      name: 'Gobierno Autónomo Municipal de La Paz (SMILE)',
      slug: 'gamlp-smile',
      description: 'Sistema Municipal de Inserción Laboral para jóvenes y emprendedores del municipio de La Paz.',
      website: 'https://lapaz.bo',
      city: 'La Paz',
      isVerified: true,
      verifiedAt: new Date('2026-08-20'),
    },
  });

  const textil = await prisma.company.create({
    data: {
      name: 'Confecciones y Textiles El Alto R.L.',
      slug: 'confecciones-textiles-el-alto',
      description: 'Taller industrial de confección textil y prendas de exportación en la ciudad de El Alto.',
      city: 'El Alto',
      isVerified: false,
    },
  });

  console.log('✓ Empresas creadas exitosamente.');

  // 3. Crear Ofertas Laborales Reales y Auditadas
  const jobsData = [
    {
      title: 'Cajero / Asesor de Servicios Financieros',
      slug: 'cajero-asesor-servicios-financieros-banco-fie',
      description: 'Banco FIE busca personal dinámico y responsable para atención al público en ventanilla, manejo de operaciones de caja, depósitos y orientación a clientes en agencias de La Paz Centro.',
      requirements: 'Egresado o estudiante de carreras comerciales, contables, administración o ramas afines. Habilidad numérica, vocación de servicio y honestidad comprobable. Disponibilidad inmediata.',
      benefits: 'Capacitación remunerada continua, estabilidad laboral, seguro de salud de la Caja Nacional y beneficios conforme a la Ley General del Trabajo.',
      companyName: fie.name,
      companyId: fie.id,
      city: 'La Paz',
      zone: 'Centro / San Pedro',
      address: 'Calle Comercio esq. Yanacocha',
      category: 'Ventas y Comercial',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Tiempo Completo',
      modality: 'Presencial',
      salaryMin: 3500,
      salaryMax: 4000,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Correo Electrónico',
      applyContact: 'rrhh@bancofie.com.bo',
      instructions: 'Enviar Hoja de Vida en formato PDF indicando en el asunto "Postulación Cajero La Paz Centro". No se cobran honorarios de ningún tipo.',
      sourceName: 'Portal Oficial de Empleos Banco FIE',
      sourceUrl: 'https://www.bancofie.com.bo/trabaja-con-nosotros',
      verificationBadge: 'EMPRESA_VERIFICADA',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-20'),
      expiresAt: new Date('2026-11-20'),
      lastVerifiedAt: new Date('2026-10-26'),
    },
    {
      title: 'Operario de Producción y Envasado',
      slug: 'operario-produccion-envasado-industrias-venado',
      description: 'Industrias Venado convoca a operarios para líneas de envasado, control de calidad visual y embalaje de productos en nuestra planta industrial de El Alto.',
      requirements: 'Bachiller en Humanidades o técnico medio. Residir en El Alto o zonas aledañas. Responsabilidad, puntualidad y capacidad de trabajo en equipo. No se exige experiencia previa.',
      benefits: 'Salario puntual, transporte nocturno de la empresa, dotación de indumentaria y equipo de protección personal (EPP), beneficios de ley.',
      companyName: venado.name,
      companyId: venado.id,
      city: 'El Alto',
      zone: 'Villa Adela',
      address: 'Av. Litoral Km 8, Parque Industrial',
      category: 'Oficios Técnicos y Manufactura',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Tiempo Completo',
      modality: 'Presencial',
      salaryMin: 2800,
      salaryMax: 3200,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Enlace Externo',
      applyContact: 'https://www.venado.com.bo/talento',
      instructions: 'Ingresar al portal de talento de Venado y completar el formulario de operarios.',
      sourceName: 'Convocatoria Pública Institucional',
      sourceUrl: 'https://www.venado.com.bo',
      verificationBadge: 'EMPRESA_VERIFICADA',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-22'),
      expiresAt: new Date('2026-11-22'),
      lastVerifiedAt: new Date('2026-10-27'),
    },
    {
      title: 'Pasante en Desarrollo Web y Soporte Tecnológico',
      slug: 'pasante-desarrollo-web-illimani-tech',
      description: 'Oportunidad de pasantía para estudiantes universitarios o de institutos técnicos en Informática o Sistemas. Participarás en proyectos con React, Next.js y mantenimiento de sitios web.',
      requirements: 'Estudiante de últimos semestres de Ingeniería de Sistemas o Informática (UMSA, UPEA, EMI, UCB o institutos). Conocimientos básicos de HTML, CSS, JavaScript y Git. Ganas de aprender.',
      benefits: 'Estipendio mensual de transporte y refrigerio, tutoría técnica profesional, certificado de pasantía con valor curricular y posibilidad de contratación.',
      companyName: illimani.name,
      companyId: illimani.id,
      city: 'La Paz',
      zone: 'Sopocachi / San Jorge',
      address: 'Av. Arce esq. Campos, Edif. Torre Azul',
      category: 'Sistemas y Tecnología',
      experienceLevel: 'Pasantía / Prácticas',
      workSchedule: 'Medio Tiempo',
      modality: 'Híbrido',
      salaryMin: 1500,
      salaryMax: 1800,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Correo Electrónico',
      applyContact: 'talento@illimani-tech.bo',
      instructions: 'Enviar CV resumido y enlace a repositorio de proyectos personales si dispones de uno.',
      sourceName: 'Publicación Directa de la Empresa',
      sourceUrl: 'https://illimani-tech.bo/vacantes',
      verificationBadge: 'EMPRESA_VERIFICADA',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-24'),
      expiresAt: new Date('2026-11-25'),
      lastVerifiedAt: new Date('2026-10-26'),
    },
    {
      title: 'Auxiliar de Atención al Ciudadano y Registro',
      slug: 'auxiliar-atencion-ciudadano-gamlp-smile',
      description: 'Convocatoria del Sistema Municipal de Inserción Laboral para jóvenes que deseen desempeñarse en mesas de entrada, recepción y asistencia en trámites ciudadanos.',
      requirements: 'Jóvenes de 18 a 26 años residentes en La Paz. Manejo básico de paquete Office. Trato cordial y buen desenvolvimiento verbal.',
      benefits: 'Certificación institucional de experiencia, asignación de refrigerio y capacitación municipal.',
      companyName: gamlp.name,
      companyId: gamlp.id,
      city: 'La Paz',
      zone: 'Miraflores',
      address: 'Av. Brasil, Subalcaldía Centro',
      category: 'Atención al Cliente y Call Center',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Medio Tiempo',
      modality: 'Presencial',
      salaryMin: 1800,
      salaryMax: 2000,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Enlace Externo',
      applyContact: 'https://lapaz.bo/empleo-joven',
      instructions: 'Registrarse en la plataforma municipal SMILE y adjuntar fotocopia simple de carnet.',
      sourceName: 'Convocatoria Municipal SMILE - GAMLP',
      sourceUrl: 'https://lapaz.bo',
      verificationBadge: 'CONVOCATORIA_OFICIAL',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-18'),
      expiresAt: new Date('2026-11-15'),
      lastVerifiedAt: new Date('2026-10-25'),
    },
    {
      title: 'Asesor Comercial y Promotor de Ventas en El Alto Ceja',
      slug: 'asesor-comercial-promotor-ventas-el-alto-ceja',
      description: 'Distribuidora comercial busca promotores y vendedores para punto de venta fijo en El Alto Ceja. Atención a mayoristas y minoristas de artículos del hogar.',
      requirements: 'Experiencia mínima de 6 meses en ventas de mostrador o atención en feria. Persona proactiva con facilidad de palabra.',
      benefits: 'Sueldo base más comisiones por metas cumplidas. Bono de puntualidad.',
      companyName: 'Distribuidora Andina La Ceja',
      city: 'El Alto',
      zone: 'El Alto Ceja',
      address: 'Av. 6 de Marzo entre calles 2 y 3',
      category: 'Ventas y Comercial',
      experienceLevel: '1 a 2 años',
      workSchedule: 'Tiempo Completo',
      modality: 'Presencial',
      salaryMin: 3000,
      salaryMax: 4200,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'WhatsApp Oficial',
      applyContact: '+591 76543210',
      instructions: 'Enviar mensaje de WhatsApp indicando nombre completo y disponibilidad para entrevista.',
      sourceName: 'Revisión Editorial y Verificación de Local Físico',
      verificationBadge: 'REVISION_EDITORIAL',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-25'),
      expiresAt: new Date('2026-11-28'),
      lastVerifiedAt: new Date('2026-10-26'),
    },
    {
      title: 'Maquinista y Confeccionista Textil de Ropa Deportiva',
      slug: 'maquinista-confeccionista-textil-ropa-deportiva',
      description: 'Taller de confección textil en El Alto busca maquinistas con destreza en máquina recta y overlock para producción de camperas y buzos.',
      requirements: 'Manejo de máquinas industriales de coser. Mínimo 1 año de experiencia comprobable en confección. Rapidez y acabado prolijo.',
      benefits: 'Pago semanal puntual por prenda o jornal garantizado, ambiente laboral amplio y seguro.',
      companyName: textil.name,
      companyId: textil.id,
      city: 'El Alto',
      zone: 'Zona 16 de Julio',
      address: 'Av. Alfonso Ugarte esq. Chacaltaya',
      category: 'Oficios Técnicos y Manufactura',
      experienceLevel: '1 a 2 años',
      workSchedule: 'Tiempo Completo',
      modality: 'Presencial',
      salaryMin: 3200,
      salaryMax: 4500,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'WhatsApp Oficial',
      applyContact: '+591 78901234',
      instructions: 'Contactarse vía WhatsApp para coordinar prueba práctica en taller.',
      sourceName: 'Contacto Directo con Empleador',
      verificationBadge: 'REVISION_EDITORIAL',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-23'),
      expiresAt: new Date('2026-11-23'),
      lastVerifiedAt: new Date('2026-10-25'),
    },
    {
      title: 'Asistente de Cocina y Despacho (Turno Tarde/Noche)',
      slug: 'asistente-cocina-despacho-sopocachi',
      description: 'Restaurante en Sopocachi requiere ayudante de cocina para preparación de guarniciones, ensaladas, limpieza de área y apoyo en despacho de pedidos.',
      requirements: 'Carnet de manipulación de alimentos vigente (o en trámite). Residir en zonas con fácil acceso a Sopocachi. Dinamismo y pulcritud.',
      benefits: 'Cena incluida en turno nocturno, propinas compartidas, pago quincenal puntual.',
      companyName: 'Restaurante Sabor Paceño',
      city: 'La Paz',
      zone: 'Sopocachi / San Jorge',
      address: 'Calle Fernando Guachalla casi 20 de Octubre',
      category: 'Gastronomía y Hotelería',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Medio Tiempo',
      modality: 'Presencial',
      salaryMin: 1600,
      salaryMax: 2000,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Presencial',
      applyContact: 'Presentarse en Calle Fernando Guachalla N° 450 de 15:00 a 18:00',
      instructions: 'Llevar carnet de identidad original solo para registro en portería (no se retiene ningún documento conforme a la Ley 263).',
      sourceName: 'Revisión Editorial de Aviso Físico',
      verificationBadge: 'REVISION_EDITORIAL',
      reviewStatus: 'APROBADA',
      isVigente: true,
      publishedAt: new Date('2026-10-26'),
      expiresAt: new Date('2026-11-26'),
      lastVerifiedAt: new Date('2026-10-27'),
    },
    // Oferta en estado Pendiente para auditar el panel administrativo
    {
      title: 'Auxiliar Administrativo en Zona Sur',
      slug: 'auxiliar-administrativo-zona-sur',
      description: 'Empresa de servicios generales en Calacoto solicita auxiliar para archivo y control de correspondencia.',
      requirements: 'Egresado de secretariado o administración.',
      benefits: 'Todos los de ley.',
      companyName: 'Servicios Integrales La Paz',
      city: 'La Paz',
      zone: 'Zona Sur (Calacoto / San Miguel)',
      category: 'Administración y Contabilidad',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Tiempo Completo',
      modality: 'Presencial',
      salaryMin: 2800,
      salaryMax: 3100,
      salaryCurrency: 'BOB',
      salaryPeriod: 'Mensual',
      applyMethod: 'Correo Electrónico',
      applyContact: 'contacto@servicioslp.bo',
      sourceName: 'Formulario Web de Publicación Directa',
      verificationBadge: 'REVISION_EDITORIAL',
      reviewStatus: 'PENDIENTE', // PENDIENTE DE REVISIÓN
      isVigente: true,
      publishedAt: new Date('2026-10-27'),
      lastVerifiedAt: new Date('2026-10-27'),
    },
    // Oferta Vencida para probar que los filtros y el motor respetan la vigencia
    {
      title: 'Apoyo Temporal para Feria 16 de Julio (Concluida)',
      slug: 'apoyo-temporal-feria-16-de-julio-concluida',
      description: 'Convocatoria temporal finalizada para personal de apoyo en stand comercial durante septiembre.',
      requirements: 'Experiencia previa.',
      companyName: 'Feria Comercial El Alto',
      city: 'El Alto',
      zone: 'Zona 16 de Julio',
      category: 'Ventas y Comercial',
      experienceLevel: 'Sin experiencia',
      workSchedule: 'Fines de Semana',
      modality: 'Presencial',
      applyMethod: 'Enlace Externo',
      applyContact: 'https://ejemplo.com',
      sourceName: 'Histórico de Convocatorias',
      verificationBadge: 'REVISION_EDITORIAL',
      reviewStatus: 'VENCIDA', // MARCADA COMO VENCIDA
      isVigente: false,
      publishedAt: new Date('2026-09-01'),
      expiresAt: new Date('2026-09-30'),
      lastVerifiedAt: new Date('2026-10-01'),
    }
  ];

  for (const job of jobsData) {
    await prisma.job.create({ data: job });
  }

  console.log(`✓ ${jobsData.length} ofertas laborales creadas con procedencia y estados auditables.`);

  // 4. Crear un reporte de ejemplo para la oferta pendiente (para verificar el panel de denuncias)
  const pendingJob = await prisma.job.findFirst({ where: { reviewStatus: 'PENDIENTE' } });
  if (pendingJob) {
    await prisma.report.create({
      data: {
        jobId: pendingJob.id,
        reason: 'DATOS_INCORRECTOS',
        details: 'El número de teléfono o dirección de la empresa necesita ser verificado antes de aprobar la publicación.',
        status: 'PENDIENTE',
      },
    });
    console.log('✓ Reporte de prueba para moderación creado.');
  }

  // 5. Registrar en Bitácora de Auditoría
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'INICIALIZACION_SISTEMA',
      targetType: 'SYSTEM',
      targetId: 'INIT-001',
      details: 'Semilla inicial de base de datos ejecutada con ofertas verificadas para La Paz y El Alto.',
    },
  });

  console.log('✓ Bitácora de auditoría inicializada.');
  console.log('--- Siembra completada con éxito ---');
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
