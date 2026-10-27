'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ArrowLeft, Save, Trash2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminEditarOfertaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/empleos/${params.id}`);
        if (!res.ok) throw new Error('No se encontró la oferta.');
        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`/api/empleos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!res.ok) throw new Error('Error al guardar los cambios.');

      setMessage('✓ Oferta actualizada y auditada exitosamente.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />
        <main className="flex-1 p-10 text-center text-slate-500">Cargando datos de la oferta...</main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />
        <main className="flex-1 p-10 text-center text-rose-600">Oferta no encontrada.</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div>
          <Link href="/admin/ofertas" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al listado
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Auditar y Editar Oferta #{job.id.slice(-6)}
              </h1>
              <p className="text-xs text-slate-500">
                Puesto: <strong>{job.title}</strong> &bull; Empresa: {job.companyName}
              </p>
            </div>
            <StatusBadge type="review" value={job.reviewStatus} />
          </div>
        </div>

        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {message}
          </div>
        )}

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl">
          {/* Bloque de Decisión de Moderación */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Decisión Editorial y Estado de Revisión
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Estado de Revisión *
                </label>
                <select
                  value={job.reviewStatus}
                  onChange={(e) => setJob({ ...job, reviewStatus: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs sm:text-sm font-bold"
                >
                  <option value="APROBADA">APROBADA (Publicar en la web)</option>
                  <option value="PENDIENTE">PENDIENTE (En evaluación)</option>
                  <option value="CORRECCION">REQUIERE CORRECCIÓN</option>
                  <option value="RECHAZADA">RECHAZADA (No cumple requisitos)</option>
                  <option value="VENCIDA">VENCIDA (Plazo expirado)</option>
                  <option value="RETIRADA">RETIRADA (Por denuncia o baja)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sello de Verificación
                </label>
                <select
                  value={job.verificationBadge}
                  onChange={(e) => setJob({ ...job, verificationBadge: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs sm:text-sm"
                >
                  <option value="EMPRESA_VERIFICADA">EMPRESA_VERIFICADA</option>
                  <option value="CONVOCATORIA_OFICIAL">CONVOCATORIA_OFICIAL</option>
                  <option value="REVISION_EDITORIAL">REVISION_EDITORIAL</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ¿Es Vigente?
                </label>
                <select
                  value={job.isVigente ? 'true' : 'false'}
                  onChange={(e) => setJob({ ...job, isVigente: e.target.value === 'true' })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs sm:text-sm"
                >
                  <option value="true">Sí, Vigente</option>
                  <option value="false">No, Inactiva / Cerrada</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Título del Puesto
              </label>
              <input
                type="text"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Empresa
              </label>
              <input
                type="text"
                value={job.companyName}
                onChange={(e) => setJob({ ...job, companyName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ciudad
              </label>
              <select
                value={job.city}
                onChange={(e) => setJob({ ...job, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                <option value="La Paz">La Paz</option>
                <option value="El Alto">El Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Zona
              </label>
              <input
                type="text"
                value={job.zone}
                onChange={(e) => setJob({ ...job, zone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Descripción
            </label>
            <textarea
              rows={4}
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Requisitos
            </label>
            <textarea
              rows={3}
              value={job.requirements}
              onChange={(e) => setJob({ ...job, requirements: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Canal de Postulación
              </label>
              <select
                value={job.applyMethod}
                onChange={(e) => setJob({ ...job, applyMethod: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              >
                <option value="Correo Electrónico">Correo Electrónico</option>
                <option value="WhatsApp Oficial">WhatsApp Oficial</option>
                <option value="Enlace Externo">Enlace Externo</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contacto de Postulación
              </label>
              <input
                type="text"
                value={job.applyContact}
                onChange={(e) => setJob({ ...job, applyContact: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Link
              href={`/empleos/${job.id}`}
              target="_blank"
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Ver cómo se muestra en la web pública &rarr;
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Guardando...' : 'Guardar y Actualizar Auditoría'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
