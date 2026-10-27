import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { sanitizeText } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { company: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Oferta laboral no encontrada.' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error al obtener oferta:', error);
    return NextResponse.json({ error: 'Error del servidor.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
    }

    const body = await request.json();

    const existing = await prisma.job.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Oferta no encontrada.' }, { status: 404 });
    }

    // Actualizar campos
    const updated = await prisma.job.update({
      where: { id: params.id },
      data: {
        ...(body.title ? { title: sanitizeText(body.title) } : {}),
        ...(body.companyName ? { companyName: sanitizeText(body.companyName) } : {}),
        ...(body.city ? { city: sanitizeText(body.city) } : {}),
        ...(body.zone ? { zone: sanitizeText(body.zone) } : {}),
        ...(body.category ? { category: sanitizeText(body.category) } : {}),
        ...(body.experienceLevel ? { experienceLevel: sanitizeText(body.experienceLevel) } : {}),
        ...(body.workSchedule ? { workSchedule: sanitizeText(body.workSchedule) } : {}),
        ...(body.modality ? { modality: sanitizeText(body.modality) } : {}),
        ...(body.description ? { description: sanitizeText(body.description) } : {}),
        ...(body.requirements ? { requirements: sanitizeText(body.requirements) } : {}),
        ...(body.benefits !== undefined ? { benefits: sanitizeText(body.benefits || '') } : {}),
        ...(body.applyMethod ? { applyMethod: sanitizeText(body.applyMethod) } : {}),
        ...(body.applyContact ? { applyContact: sanitizeText(body.applyContact) } : {}),
        ...(body.verificationBadge ? { verificationBadge: body.verificationBadge } : {}),
        ...(body.reviewStatus ? { reviewStatus: body.reviewStatus } : {}),
        ...(body.isVigente !== undefined ? { isVigente: Boolean(body.isVigente) } : {}),
        ...(body.lastVerifiedAt ? { lastVerifiedAt: new Date(body.lastVerifiedAt) } : { lastVerifiedAt: new Date() }),
      },
    });

    // Registrar en auditoría
    await prisma.auditLog.create({
      data: {
        userId: admin.userId,
        action: 'ACTUALIZAR_OFERTA',
        targetType: 'JOB',
        targetId: params.id,
        details: `Oferta actualizada por ${admin.name} (${admin.email}). Nuevo estado: ${updated.reviewStatus}.`,
      },
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error('Error al actualizar oferta:', error);
    return NextResponse.json({ error: 'Error al actualizar.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
    }

    await prisma.job.delete({ where: { id: params.id } });

    await prisma.auditLog.create({
      data: {
        userId: admin.userId,
        action: 'ELIMINAR_OFERTA',
        targetType: 'JOB',
        targetId: params.id,
        details: `Oferta eliminada por ${admin.name} (${admin.email}).`,
      },
    });

    return NextResponse.json({ success: true, message: 'Oferta eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    return NextResponse.json({ error: 'Error al eliminar.' }, { status: 500 });
  }
}
