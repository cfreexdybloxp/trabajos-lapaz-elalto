'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { PlusCircle, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { BOLIVIA_ZONES, CITIES, WORK_SCHEDULES, MODALITIES, EXPERIENCE_LEVELS } from '@/lib/data/bolivia-zones';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export default function AdminNuevaOfertaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    city: 'La Paz',
    zone: 'Centro / San Pedro',
    category: 'Ventas y Comercial',
    experienceLevel: 'Sin experiencia',
    workSchedule: 'Tiempo Completo',
    modality: 'Presencial',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
    applyMethod: 'Correo Electrónico',
    applyContact: '',
    instructions: '',
    sourceName: 'Portal Oficial de la Empresa',
    sourceUrl: '',
    verificationBadge: 'EMPRESA_VERIFICADA',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredZones = BOLIVIA_ZONES.filter(z => z.city === formData.city);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/empleos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          salaryMin: formData.salaryMin ? parseFloat(formData.salaryMin) : null,
          salaryMax: formData.salaryMax ? parseFloat(formData.salaryMax) : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear la oferta.');

      // Aprobarla automáticamente ya que proviene del moderador
      await fetch(`/api/empleos/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewStatus: 'APROBADA',
          verificationBadge: formData.verificationBadge,
          sourceName: formData.sourceName,
          sourceUrl: formData.sourceUrl || null,
          isVigente: true,
        }),
      });

      router.push('/admin/ofertas');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear oferta.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AdminSidebar userEmail="admin@empleos-lapaz-elalto.bo" userName="Equipo de Verificación" />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        <div>
          <Link href="/admin/ofertas" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al listado
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Crear Convocatoria Directa Verificada
              </h1>
              <p className="text-xs text-slate-500">
                Esta vacante será publicada con sello de verificación y aprobación editorial inmediata.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl">
          {/* Tipo de Sello de Verificación */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
              Sello de Procedencia y Verificación *
            </label>
            <select
              value={formData.verificationBadge}
              onChange={(e) => setFormData({ ...formData, verificationBadge: e.target.value })}
              className="w-full p-2.5 bg-white border border-blue-300 rounded-lg text-xs sm:text-sm font-semibold text-blue-950"
            >
              <option value="EMPRESA_VERIFICADA">Empresa Verificada (Con NIT o personería jurídica)</option>
              <option value="CONVOCATORIA_OFICIAL">Convocatoria Oficial (Ministerio, Municipio o Universidad)</option>
              <option value="REVISION_EDITORIAL">Revisión Editorial (Verificación física o telefónica)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Título del Puesto *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Ejecutivo de Cuentas, Cajero..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Empresa u Organización *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Ej: Cervecería Boliviana Nacional"
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
                value={formData.city}
                onChange={(e) => {
                  const newCity = e.target.value as 'La Paz' | 'El Alto';
                  const defaultZone = newCity === 'La Paz' ? 'Centro / San Pedro' : 'El Alto Ceja';
                  setFormData({ ...formData, city: newCity, zone: defaultZone });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Zona o Barrio
              </label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              >
                {filteredZones.map((z) => (
                  <option key={z.id} value={z.name}>{z.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Experiencia
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                {EXPERIENCE_LEVELS.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Jornada
              </label>
              <select
                value={formData.workSchedule}
                onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                {WORK_SCHEDULES.map((sch) => (
                  <option key={sch} value={sch}>{sch}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Descripción del Puesto *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Requisitos Solicitados *
            </label>
            <textarea
              required
              rows={2}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Canal de Postulación
              </label>
              <select
                value={formData.applyMethod}
                onChange={(e) => setFormData({ ...formData, applyMethod: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                <option value="Correo Electrónico">Correo Electrónico</option>
                <option value="WhatsApp Oficial">WhatsApp Oficial</option>
                <option value="Enlace Externo">Enlace Externo / Portal Web</option>
                <option value="Presencial">Presentación Física</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contacto de Postulación *
              </label>
              <input
                type="text"
                required
                value={formData.applyContact}
                onChange={(e) => setFormData({ ...formData, applyContact: e.target.value })}
                placeholder="correo@empresa.com o +591..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre de la Fuente
              </label>
              <input
                type="text"
                value={formData.sourceName}
                onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL de la Fuente (Opcional)
              </label>
              <input
                type="url"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/admin/ofertas"
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors text-xs sm:text-sm disabled:opacity-50"
            >
              {loading ? 'Creando y publicando...' : 'Publicar Inmediatamente'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
