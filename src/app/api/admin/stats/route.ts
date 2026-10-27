import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Acceso no autorizado.' }, { status: 401 });
    }

    const [
      totalJobs,
      activeJobs,
      pendingJobs,
      expiredJobs,
      totalReports,
      pendingReports,
      totalCompanies,
      recentAuditLogs
    ] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { reviewStatus: 'APROBADA', isVigente: true } }),
      prisma.job.count({ where: { reviewStatus: 'PENDIENTE' } }),
      prisma.job.count({ where: { reviewStatus: 'VENCIDA' } }),
      prisma.report.count(),
      prisma.report.count({ where: { status: 'PENDIENTE' } }),
      prisma.company.count(),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalJobs,
        activeJobs,
        pendingJobs,
        expiredJobs,
        totalReports,
        pendingReports,
        totalCompanies,
      },
      recentAuditLogs,
    });
  } catch (error) {
    console.error('Error al obtener estadísticas administrativas:', error);
    return NextResponse.json({ error: 'Error del servidor.' }, { status: 500 });
  }
}
