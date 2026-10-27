'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { 
  Briefcase, PlusCircle, Search, Filter, CheckCircle2, 
  Clock, AlertTriangle, Trash2, ExternalLink, RefreshCw 
} from 'lucide-react';

interface JobItem {
  id: string;
  title: string;
  companyName: string;
  city: string;
  zone: string;
  reviewStatus: string;
  isVigente: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function AdminOfertasPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODAS');
  const [cityFilter, setCityFilter] = useState('TODAS');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Endpoint administrativo o con límite alto
      const res = await fetch('/api/empleos?limit=50');
      const data = await res.json();
      // También traer pendientes
      setJobs(data.jobs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string, isVigente: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/empleos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewStatus: newStatus, isVigente }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, reviewStatus: newStatus, isVigente } : j))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar permanentemente esta vacante?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/empleos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.companyName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'TODAS' || j.reviewStatus === statusFilter;
    const matchCity = cityFilter === 'TODAS' || j.city === cityFilter;
    return matchSearch && matchStatus && matchCity;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Gestión y Moderación de Ofertas
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Aprobación, revisión editorial, control de vigencia y retiro de publicaciones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/ofertas/nueva"
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              Nueva Oferta
            </Link>
          </div>
        </div>

        {/* Filtros Administrativos */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título o empresa..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
            >
              <option value="TODAS">Todos los estados</option>
              <option value="APROBADA">Aprobadas / Vigentes</option>
              <option value="PENDIENTE">Pendientes de revisión</option>
              <option value="VENCIDA">Vencidas</option>
              <option value="RETIRADA">Retiradas / Rechazadas</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
            >
              <option value="TODAS">Todas las ciudades</option>
              <option value="La Paz">La Paz</option>
              <option value="El Alto">El Alto</option>
            </select>
          </div>
        </div>

        {/* Tabla de Ofertas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Puesto / Empresa</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Publicación</th>
                  <th className="py-3 px-4 text-right">Acciones de Moderación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/empleos/${job.id}`}
                          target="_blank"
                          className="font-bold text-slate-900 hover:text-brand-600 flex items-center gap-1"
                        >
                          {job.title}
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </Link>
                        <span className="text-[11px] text-slate-500 block">
                          {job.companyName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {job.city} &bull; <span className="text-slate-500">{job.zone}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge type="review" value={job.reviewStatus} />
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        {new Date(job.publishedAt || job.createdAt).toLocaleDateString('es-BO')}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1">
                        {job.reviewStatus !== 'APROBADA' && (
                          <button
                            type="button"
                            disabled={actionLoading === job.id}
                            onClick={() => handleUpdateStatus(job.id, 'APROBADA', true)}
                            title="Aprobar y publicar oferta"
                            className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            Aprobar
                          </button>
                        )}

                        {job.isVigente && (
                          <button
                            type="button"
                            disabled={actionLoading === job.id}
                            onClick={() => handleUpdateStatus(job.id, 'VENCIDA', false)}
                            title="Marcar como vencida o concluida"
                            className="text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                          >
                            Vencida
                          </button>
                        )}

                        {job.reviewStatus !== 'RETIRADA' && (
                          <button
                            type="button"
                            disabled={actionLoading === job.id}
                            onClick={() => handleUpdateStatus(job.id, 'RETIRADA', false)}
                            title="Retirar oferta por irregularidad"
                            className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 px-2 py-1 rounded-lg transition-colors"
                          >
                            Retirar
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={actionLoading === job.id}
                          onClick={() => handleDeleteJob(job.id)}
                          title="Eliminar registro"
                          className="text-xs text-rose-600 hover:bg-rose-50 p-1 rounded-lg transition-colors inline-flex items-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      {loading ? 'Cargando listado de ofertas...' : 'No se encontraron ofertas con los filtros seleccionados.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
