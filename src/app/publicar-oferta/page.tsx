'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, ShieldAlert, CheckCircle2, Building2, MapPin, Mail, AlertTriangle } from 'lucide-react';
import { BOLIVIA_ZONES, CITIES, WORK_SCHEDULES, MODALITIES, EXPERIENCE_LEVELS } from '@/lib/data/bolivia-zones';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export default function PublicarOfertaPage() {
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
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar la oferta.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Publicar Convocatoria Laboral
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Servicio gratuito para empresas, microempresas y entidades legítimas en La Paz y El Alto.
            </p>
          </div>
        </div>
      </div>

      {/* Declaración Obligatoria Ley 263 */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-2">
        <h2 className="font-bold text-amber-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
          Términos de Publicación y Ley N.º 263 de Bolivia:
        </h2>
        <p className="leading-relaxed">
          Toda oferta enviada es revisada editorialmente antes de su publicación. Queda <strong>terminantemente prohibido</strong> solicitar cobros a los postulantes (por entrevistas, cursos, carpetas, uniformes o exámenes médicos) o retener cédulas de identidad. Las ofertas que infrinjan esta norma serán rechazadas y denunciadas ante las autoridades competentes.
        </p>
      </div>

      {success ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            ¡Convocatoria enviada a revisión!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Hemos recibido los datos de tu oferta. Para garantizar la seguridad de la comunidad laboral, nuestro equipo editorial verificará la información en un plazo máximo de 24 horas hábiles.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/"
              className="bg-brand-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
            >
              Volver al Inicio
            </Link>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setFormData({
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
                });
              }}
              className="bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Publicar otra oferta
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs sm:text-sm flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Sección 1: Datos Generales */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-brand-600" />
              1. Datos de la Convocatoria y Empleador
            </h2>

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
                  placeholder="Ej: Asistente Contable, Operario de Almacén..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
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
                  placeholder="Ej: Distribuidora Paceña S.R.L."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ciudad *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => {
                    const newCity = e.target.value as 'La Paz' | 'El Alto';
                    const defaultZone = newCity === 'La Paz' ? 'Centro / San Pedro' : 'El Alto Ceja';
                    setFormData({ ...formData, city: newCity, zone: defaultZone });
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Zona o Barrio *
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                >
                  {filteredZones.map((z) => (
                    <option key={z.id} value={z.name}>{z.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sección 2: Clasificación */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-brand-600" />
              2. Clasificación del Empleo
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                >
                  {WORK_SCHEDULES.map((sch) => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Modalidad
                </label>
                <select
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                >
                  {MODALITIES.map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salario Opcional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Salario Mínimo (Bs BOB - Opcional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  placeholder="Ej: 2800"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Salario Máximo (Bs BOB - Opcional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  placeholder="Ej: 3500"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sección 3: Descripción y Requisitos */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Descripción Detallada del Puesto *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explica las funciones y responsabilidades del puesto de manera transparente..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Requisitos Exigidos *
              </label>
              <textarea
                required
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Nivel de estudios, habilidades técnicas requeridas o disponibilidad..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Beneficios Ofrecidos (Opcional)
              </label>
              <textarea
                rows={2}
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Beneficios de ley, refrigerio, transporte nocturno, etc."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Sección 4: Método de Postulación */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Mail className="w-4 h-4 text-brand-600" />
              3. ¿Cómo deben postularse los candidatos?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Canal de Postulación *
                </label>
                <select
                  value={formData.applyMethod}
                  onChange={(e) => setFormData({ ...formData, applyMethod: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                >
                  <option value="Correo Electrónico">Correo Electrónico</option>
                  <option value="WhatsApp Oficial">WhatsApp Corporativo / Oficial</option>
                  <option value="Enlace Externo">Página Web o Formulario de la Empresa</option>
                  <option value="Presencial">Presentación Física en Dirección</option>
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
                  placeholder="ejemplo@empresa.com.bo o +591 70000000 o https://..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Instrucciones Adicionales para el Candidato
              </label>
              <input
                type="text"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Ej: Indicar en el asunto 'Postulación Chofer El Alto'. Adjuntar Hoja de Vida en PDF."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? 'Validando y enviando...' : 'Enviar Convocatoria para Revisión'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
