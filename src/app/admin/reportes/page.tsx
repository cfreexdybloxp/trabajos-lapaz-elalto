'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AlertOctagon, CheckCircle2, XCircle, ExternalLink, ShieldAlert, RefreshCw } from 'lucide-react';

interface ReportItem {
  id: string;
  reason: string;
  details: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    companyName: string;
    city: string;
    reviewStatus: string;
  };
}

export default function AdminReportesPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reportes');
      if (res.ok) {
        const data = await res.json();
        setReports(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id: string, status: string, notes: string) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/reportes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, resolutionNotes: notes }),
      });

      if (res.ok) {
        setReports((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Gestión de Denuncias Ciudadanas
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Reportes de ofertas presuntamente falsas, con cobros indebidos o vencidas (Ley N.º 263).
            </p>
          </div>

          <button
            type="button"
            onClick={fetchReports}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Actualizar
          </button>
        </div>

        {/* Listado de Denuncias */}
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm space-y-4 transition-all ${
                  report.status === 'PENDIENTE'
                    ? 'border-rose-200 bg-rose-50/20'
                    : 'border-slate-200 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      {report.reason}
                    </span>
                    <span className="text-xs text-slate-500">
                      Reportado el {new Date(report.createdAt).toLocaleString('es-BO')}
                    </span>
                  </div>

                  <div>
                    {report.status === 'PENDIENTE' ? (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        Pendiente de Resolución
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {report.status === 'RESUELTO_RETIRADO' ? '✓ Resuelto (Oferta Retirada)' : 'Descartado'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Oferta Denunciada y Detalle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Oferta Denunciada:
                    </span>
                    <p className="font-bold text-sm text-slate-900">
                      <Link
                        href={`/empleos/${report.job.id}`}
                        target="_blank"
                        className="hover:text-brand-600 inline-flex items-center gap-1"
                      >
                        {report.job.title}
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </p>
                    <p className="text-slate-500">
                      Empresa: <strong>{report.job.companyName}</strong> &bull; {report.job.city}
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Motivo del Denunciante:
                    </span>
                    <p className="text-slate-800 italic">
                      "{report.details}"
                    </p>
                  </div>
                </div>

                {/* Acciones si está pendiente */}
                {report.status === 'PENDIENTE' && (
                  <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={actionLoading === report.id}
                      onClick={() => handleResolve(report.id, 'DESCARTADO', 'Reporte verificado como infundado.')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Descartar (Reporte infundado)
                    </button>
                    <button
                      type="button"
                      disabled={actionLoading === report.id}
                      onClick={() => handleResolve(report.id, 'RESUELTO_RETIRADO', 'Oferta retirada inmediatamente por indicios de irregularidad.')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
                    >
                      Retirar Oferta Inmediatamente
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              {loading ? 'Cargando denuncias...' : '✓ No existen denuncias registradas en el sistema.'}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
