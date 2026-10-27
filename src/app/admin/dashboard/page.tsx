import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { 
  Briefcase, Clock, AlertOctagon, Building2, 
  CheckCircle2, ArrowRight, ShieldCheck, History 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Métricas reales
  const [
    activeJobsCount,
    pendingJobsCount,
    expiredJobsCount,
    pendingReportsCount,
    companiesCount,
    pendingJobs,
    pendingReports,
    recentLogs
  ] = await Promise.all([
    prisma.job.count({ where: { reviewStatus: 'APROBADA', isVigente: true } }),
    prisma.job.count({ where: { reviewStatus: 'PENDIENTE' } }),
    prisma.job.count({ where: { reviewStatus: 'VENCIDA' } }),
    prisma.report.count({ where: { status: 'PENDIENTE' } }),
    prisma.company.count(),
    prisma.job.findMany({
      where: { reviewStatus: 'PENDIENTE' },
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.report.findMany({
      where: { status: 'PENDIENTE' },
      include: { job: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AdminSidebar userEmail={session.email} userName={session.name} />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Panel de Control Editorial
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Gestión y auditoría de vacantes laborales para La Paz y El Alto.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/ofertas/nueva"
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              + Crear Oferta Verificada
            </Link>
          </div>
        </div>

        {/* Tarjetas de Métricas (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Ofertas Aprobadas</span>
              <p className="text-2xl font-black text-slate-900">{activeJobsCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Pendientes de Revisión</span>
              <p className="text-2xl font-black text-amber-700">{pendingJobsCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Denuncias Activas</span>
              <p className="text-2xl font-black text-rose-700">{pendingReportsCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-700 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Empresas Registradas</span>
              <p className="text-2xl font-black text-slate-900">{companiesCount}</p>
            </div>
          </div>
        </div>

        {/* Sección: Convocatorias Pendientes de Aprobación */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Ofertas Pendientes de Moderación ({pendingJobsCount})
            </h2>
            <Link href="/admin/ofertas?status=PENDIENTE" className="text-xs font-bold text-brand-600 hover:underline">
              Ver todas &rarr;
            </Link>
          </div>

          {pendingJobs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {pendingJobs.map((job) => (
                <div key={job.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{job.title}</h3>
                    <p className="text-xs text-slate-500">
                      {job.companyName} &bull; {job.city} ({job.zone}) &bull; Enviada el {new Date(job.createdAt).toLocaleDateString('es-BO')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/ofertas/${job.id}`}
                      className="text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Revisar y Aprobar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              ✓ No hay ofertas pendientes de revisión en este momento.
            </p>
          )}
        </section>

        {/* Sección: Denuncias Ciudadanas Pendientes */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              Denuncias Ciudadanas por Atender ({pendingReportsCount})
            </h2>
            <Link href="/admin/reportes" className="text-xs font-bold text-brand-600 hover:underline">
              Ir a denuncias &rarr;
            </Link>
          </div>

          {pendingReports.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {pendingReports.map((report) => (
                <div key={report.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {report.reason}
                      </span>
                      <span className="text-xs text-slate-500">
                        Puesto: <strong>{report.job.title}</strong> ({report.job.companyName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      "{report.details}"
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/admin/reportes"
                      className="text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 px-3 py-1.5 rounded-lg transition-colors inline-block"
                    >
                      Atender Denuncia
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              ✓ No hay denuncias ciudadanas pendientes por revisar.
            </p>
          )}
        </section>

        {/* Sección: Bitácora de Auditoría Reciente */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-600" />
              Historial de Auditoría Reciente
            </h2>
            <Link href="/admin/auditoria" className="text-xs font-bold text-brand-600 hover:underline">
              Ver bitácora completa &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <p className="text-slate-500">{log.details}</p>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString('es-BO')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
