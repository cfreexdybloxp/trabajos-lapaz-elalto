import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { sanitizeText, hashIp } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
    }

    const reports = await prisma.report.findMany({
      include: {
        job: {
          select: {
            id: true,
            title: true,
            companyName: true,
            city: true,
            reviewStatus: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    return NextResponse.json({ error: 'Error del servidor.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobId = sanitizeText(body.jobId || '');
    const reason = sanitizeText(body.reason || '');
    const details = sanitizeText(body.details || '');

    if (!jobId || !reason || !details) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Verificar existencia del empleo
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: 'El empleo reportado no existe.' }, { status: 404 });
    }

    // Hash anónimo de IP
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const reporterIpHash = hashIp(clientIp);

    // Rate-limit básico: No más de 3 reportes por IP en 10 minutos
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentReports = await prisma.report.count({
      where: {
        reporterIpHash,
        createdAt: { gte: tenMinutesAgo },
      },
    });

    if (recentReports >= 5) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de reportes por ahora. Por favor espera unos minutos.' },
        { status: 429 }
      );
    }

    const report = await prisma.report.create({
      data: {
        jobId,
        reason,
        details,
        reporterIpHash,
        status: 'PENDIENTE',
      },
    });

    return NextResponse.json({ success: true, id: report.id }, { status: 201 });
  } catch (error) {
    console.error('Error al registrar reporte:', error);
    return NextResponse.json({ error: 'Error al enviar reporte.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
    }

    const body = await request.json();
    const reportId = body.id;
    const status = body.status; // "RESUELTO_RETIRADO", "DESCARTADO"
    const resolutionNotes = sanitizeText(body.resolutionNotes || '');

    if (!reportId || !status) {
      return NextResponse.json({ error: 'ID y estado son requeridos.' }, { status: 400 });
    }

    const updated = await prisma.report.update({
      where: { id: reportId },
      data: {
        status,
        resolutionNotes,
        resolvedAt: new Date(),
      },
      include: { job: true },
    });

    // Si se resuelve retirando la oferta, actualizar el estado de la oferta también
    if (status === 'RESUELTO_RETIRADO' && updated.jobId) {
      await prisma.job.update({
        where: { id: updated.jobId },
        data: {
          reviewStatus: 'RETIRADA',
          isVigente: false,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: admin.userId,
        action: 'RESOLVER_REPORTE',
        targetType: 'REPORT',
        targetId: reportId,
        details: `Reporte ${reportId} resuelto como ${status}. Notas: ${resolutionNotes}`,
      },
    });

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    console.error('Error al resolver reporte:', error);
    return NextResponse.json({ error: 'Error al actualizar reporte.' }, { status: 500 });
  }
}
