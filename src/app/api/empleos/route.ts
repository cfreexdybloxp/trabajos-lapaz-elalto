import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeText, isValidEmail, isValidUrl } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const city = searchParams.get('ciudad') || '';
    const zone = searchParams.get('zona') || '';
    const category = searchParams.get('categoria') || '';
    const experience = searchParams.get('experiencia') || '';
    const schedule = searchParams.get('jornada') || '';
    const modality = searchParams.get('modalidad') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));
    const skip = (page - 1) * limit;

    // Filtro base: Solo ofertas aprobadas y vigentes para el público general
    const where: Record<string, unknown> = {
      reviewStatus: 'APROBADA',
      isVigente: true,
    };

    if (city) {
      where.city = city;
    }

    if (zone) {
      where.zone = zone;
    }

    if (category) {
      where.category = category;
    }

    if (experience) {
      where.experienceLevel = experience;
    }

    if (schedule) {
      where.workSchedule = schedule;
    }

    if (modality) {
      where.modality = modality;
    }

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
        { companyName: { contains: q } },
        { requirements: { contains: q } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error al listar empleos:', error);
    return NextResponse.json(
      { error: 'Error al obtener la lista de empleos.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = sanitizeText(body.title || '');
    const companyName = sanitizeText(body.companyName || '');
    const city = sanitizeText(body.city || '');
    const zone = sanitizeText(body.zone || '');
    const category = sanitizeText(body.category || '');
    const experienceLevel = sanitizeText(body.experienceLevel || '');
    const workSchedule = sanitizeText(body.workSchedule || '');
    const modality = sanitizeText(body.modality || '');
    const description = sanitizeText(body.description || '');
    const requirements = sanitizeText(body.requirements || '');
    const applyMethod = sanitizeText(body.applyMethod || '');
    const applyContact = sanitizeText(body.applyContact || '');
    const instructions = sanitizeText(body.instructions || '');

    // Validaciones estrictas
    if (!title || title.length < 5) {
      return NextResponse.json({ error: 'El título del puesto debe tener al menos 5 caracteres.' }, { status: 400 });
    }
    if (!companyName) {
      return NextResponse.json({ error: 'El nombre de la empresa u organización es requerido.' }, { status: 400 });
    }
    if (!city || (city !== 'La Paz' && city !== 'El Alto')) {
      return NextResponse.json({ error: 'La ciudad debe ser La Paz o El Alto.' }, { status: 400 });
    }
    if (!description || description.length < 20) {
      return NextResponse.json({ error: 'La descripción del puesto debe ser clara (mínimo 20 caracteres).' }, { status: 400 });
    }
    if (!requirements || requirements.length < 10) {
      return NextResponse.json({ error: 'Los requisitos deben ser detallados (mínimo 10 caracteres).' }, { status: 400 });
    }
    if (!applyContact) {
      return NextResponse.json({ error: 'El contacto de postulación es obligatorio.' }, { status: 400 });
    }

    if (applyMethod === 'Correo Electrónico' && !isValidEmail(applyContact)) {
      return NextResponse.json({ error: 'El formato del correo de postulación no es válido.' }, { status: 400 });
    }

    if (applyMethod === 'Enlace Externo' && !isValidUrl(applyContact)) {
      return NextResponse.json({ error: 'La dirección URL de postulación debe comenzar con http:// o https://' }, { status: 400 });
    }

    // Generar slug único
    const baseSlug = `${title}-${companyName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newJob = await prisma.job.create({
      data: {
        title,
        slug,
        companyName,
        city,
        zone: zone || 'Por definir',
        category: category || 'Ventas y Comercial',
        experienceLevel: experienceLevel || 'Sin experiencia',
        workSchedule: workSchedule || 'Tiempo Completo',
        modality: modality || 'Presencial',
        description,
        requirements,
        applyMethod: applyMethod || 'Correo Electrónico',
        applyContact,
        instructions,
        sourceName: 'Propuesta Pública de Empleador',
        verificationBadge: 'REVISION_EDITORIAL',
        reviewStatus: 'PENDIENTE', // Pasa a revisión administrativa obligatoria
        isVigente: true,
        publishedAt: new Date(),
        lastVerifiedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Convocatoria enviada exitosamente. Será revisada por nuestro equipo antes de publicarse.',
      id: newJob.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Error al recibir propuesta de empleo:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar la propuesta.' },
      { status: 500 }
    );
  }
}
