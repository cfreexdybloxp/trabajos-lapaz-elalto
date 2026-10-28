import React from 'react';
import Link from 'next/link';
import { MapPin, Building2, Calendar, Clock, Sparkles, ChevronRight, Coins } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';

export interface JobCardData {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  city: string;
  zone: string;
  category: string;
  experienceLevel: string;
  workSchedule: string;
  modality: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;
  salaryPeriod?: string | null;
  publishedAt: string | Date;
  lastVerifiedAt: string | Date;
  verificationBadge: string;
  sourceName: string;
  isVigente: boolean;
}

export const JobCard: React.FC<{ job: JobCardData }> = ({ job }) => {
  const publishedDateFormatted = new Date(job.publishedAt).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const isSinExperiencia = job.experienceLevel === 'Sin experiencia' || job.experienceLevel === 'Pasantía / Prácticas';

  return (
    <article 
      className={`group bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between ${
        !job.isVigente 
          ? 'border-slate-200 opacity-70 bg-slate-50' 
          : 'border-slate-200/90 hover:border-brand-300 hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Cabecera de la tarjeta: Badges y Fecha */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge type="verification" value={job.verificationBadge} />
            {isSinExperiencia && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {job.experienceLevel}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <Calendar className="w-3 h-3 text-slate-400" />
            {publishedDateFormatted}
          </span>
        </div>

        {/* Título del puesto */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
          <Link href={`/empleos/${job.id}`} className="focus:ring-2 focus:ring-brand-500 rounded-lg outline-none">
            {job.title}
          </Link>
        </h3>

        {/* Empresa y Ciudad/Zona */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <Building2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
            {job.companyName}
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            {job.city} &bull; <span className="font-semibold text-slate-700">{job.zone}</span>
          </span>
        </div>

        {/* Tags de clasificación: Jornada, Modalidad, Categoría */}
        <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] font-medium text-slate-700">
          <span className="bg-slate-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-200/50">
            <Clock className="w-3 h-3 text-slate-500" />
            {job.workSchedule}
          </span>
          <span className="bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
            {job.modality}
          </span>
          <span className="bg-slate-100/80 px-2.5 py-1 rounded-lg text-slate-600 border border-slate-200/50">
            {job.category}
          </span>
        </div>
      </div>

      {/* Pie de tarjeta: Salario y Botón de Detalle */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-1">
        <div className="text-xs sm:text-sm">
          {job.salaryMin ? (
            <span className="font-extrabold text-slate-900 flex items-center gap-1">
              <Coins className="w-4 h-4 text-emerald-600" />
              Bs {job.salaryMin.toLocaleString('es-BO')}
              {job.salaryMax ? ` - ${job.salaryMax.toLocaleString('es-BO')}` : ''}
              <span className="text-[10px] font-normal text-slate-500">
                {job.salaryPeriod ? `/${job.salaryPeriod.toLowerCase()}` : '/mes'}
              </span>
            </span>
          ) : (
            <span className="text-slate-500 italic text-xs">
              Salario a convenir
            </span>
          )}
        </div>

        <Link
          href={`/empleos/${job.id}`}
          className="inline-flex items-center gap-1 bg-slate-900 group-hover:bg-brand-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-brand-500"
        >
          Ver Requisitos
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
