'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, MapPin, Calendar, Clock, Sparkles, Coins, 
  ExternalLink, Mail, MessageSquare, AlertOctagon, 
  CheckCircle2, ArrowLeft, ShieldCheck 
} from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ReportJobModal } from '@/components/jobs/ReportJobModal';

interface JobDetailViewProps {
  job: {
    id: string;
    title: string;
    slug: string;
    description: string;
    requirements: string;
    benefits?: string | null;
    companyName: string;
    city: string;
    zone: string;
    address?: string | null;
    category: string;
    experienceLevel: string;
    workSchedule: string;
    modality: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    salaryCurrency?: string;
    salaryPeriod?: string | null;
    applyMethod: string;
    applyContact: string;
    instructions?: string | null;
    sourceName: string;
    sourceUrl?: string | null;
    verificationBadge: string;
    reviewStatus: string;
    isVigente: boolean;
    publishedAt: string | Date;
    lastVerifiedAt: string | Date;
    expiresAt?: string | Date | null;
  };
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ job }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const publishedDate = new Date(job.publishedAt).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verifiedDate = new Date(job.lastVerifiedAt).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const expiresDate = job.expiresAt ? new Date(job.expiresAt).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Botón Volver */}
      <div>
        <Link 
          href="/empleos" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista de ofertas
        </Link>
      </div>

      {/* Alerta de Oferta Vencida si aplica */}
      {!job.isVigente && (
        <div className="bg-slate-100 border-l-4 border-slate-500 p-4 rounded-xl text-slate-700 text-sm">
          <strong>Aviso de Vigencia:</strong> Esta convocatoria fue marcada como <strong>VENCIDA</strong> o cerrada por el empleador. Te sugerimos revisar las vacantes vigentes en nuestra portada.
        </div>
      )}

      {/* Tarjeta Principal de Información */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Encabezado: Badges y Fecha de Verificación */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge type="verification" value={job.verificationBadge} />
            <StatusBadge type="review" value={job.reviewStatus} />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Verificada por el equipo: <strong>{verifiedDate}</strong>
          </span>
        </div>

        {/* Título de la Vacante */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-700">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <Building2 className="w-4 h-4 text-brand-600" />
              {job.companyName}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-4 h-4 text-rose-500" />
              {job.city} &bull; <strong className="text-slate-800">{job.zone}</strong>
              {job.address && <span className="text-slate-500">({job.address})</span>}
            </span>
          </div>
        </div>

        {/* Resumen de Condiciones Clave en Cuadrícula */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Jornada</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              {job.workSchedule}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Experiencia</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {job.experienceLevel}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Modalidad</span>
            <span className="font-bold text-slate-900">
              {job.modality}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Remuneración</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              {job.salaryMin ? `Bs ${job.salaryMin.toLocaleString('es-BO')}` : 'A convenir'}
            </span>
          </div>
        </div>

        {/* Descripción del Puesto */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Descripción del Puesto</h2>
          <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Requisitos */}
        <div className="space-y-3 pt-2">
          <h2 className="text-lg font-bold text-slate-900">Requisitos Solicitados</h2>
          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl text-slate-800 text-sm leading-relaxed whitespace-pre-line">
            {job.requirements}
          </div>
        </div>

        {/* Beneficios si existen */}
        {job.benefits && (
          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-slate-900">Beneficios Ofrecidos</h2>
            <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl text-slate-800 text-sm leading-relaxed whitespace-pre-line">
              {job.benefits}
            </div>
          </div>
        )}

        {/* Procedencia y Fuente Original */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1">
          <p>
            <strong>Fuente de la convocatoria:</strong> {job.sourceName}
          </p>
          {job.sourceUrl && (
            <p>
              <strong>Enlace original verificado:</strong>{' '}
              <a 
                href={job.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer nofollow" 
                className="text-brand-600 underline font-semibold hover:text-brand-700 inline-flex items-center gap-1"
              >
                Visitar sitio oficial del empleador
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}
          <p className="text-slate-400">
            Publicado originalmente el {publishedDate} {expiresDate ? `• Válido tentativamente hasta: ${expiresDate}` : ''}
          </p>
        </div>

        {/* Bloque Destacado de Postulación */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold">¿Cómo postular a esta vacante?</h3>
          </div>

          {job.instructions && (
            <p className="text-xs text-slate-300 leading-relaxed">
              {job.instructions}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {job.applyMethod === 'Correo Electrónico' && (
              <a
                href={`mailto:${job.applyContact}?subject=Postulacion: ${encodeURIComponent(job.title)}`}
                className="bg-brand-500 hover:bg-brand-400 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Enviar Correo a {job.applyContact}
              </a>
            )}

            {job.applyMethod === 'WhatsApp Oficial' && (
              <a
                href={`https://wa.me/${job.applyContact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola, vi la oferta de "${job.title}" en Trabajos La Paz y El Alto y deseo postularme.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Contactar por WhatsApp Oficial
              </a>
            )}

            {job.applyMethod === 'Enlace Externo' && (
              <a
                href={job.applyContact}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ir al Formulario Oficial de Postulación
              </a>
            )}

            {job.applyMethod === 'Presencial' && (
              <div className="bg-slate-800 p-3 rounded-xl text-xs text-slate-200">
                <strong>Presentación personal:</strong> {job.applyContact}
              </div>
            )}
          </div>

          <div className="text-[11px] text-amber-300/90 pt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Recuerda: Ningún empleador puede cobrarte por postular ni retener tu cédula de identidad original.</span>
          </div>
        </div>

        {/* Botón de Reporte */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setReportModalOpen(true)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 p-1 focus:ring-2 focus:ring-rose-500 rounded"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            ¿Piden dinero o detectaste irregularidades en este aviso? Reportar aquí
          </button>
        </div>
      </section>

      {/* Modal de Reporte */}
      <ReportJobModal
        jobId={job.id}
        jobTitle={job.title}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};
