import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trabajos de Medio Tiempo en La Paz y El Alto | Horarios Flexibles',
  description: 'Empleos de medio tiempo y media jornada en La Paz y El Alto. Ideales para estudiantes de UMSA, UPEA, institutos y personas que buscan compatibilizar horarios.',
};

export default async function MedioTiempoPage() {
  const jobs = await prisma.job.findMany({
    where: {
      workSchedule: 'Medio Tiempo',
      reviewStatus: 'APROBADA',
      isVigente: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link href="/empleos" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Explorar todas las ofertas
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trabajos de Medio Tiempo en La Paz y El Alto
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Vacantes con turnos de mañana o tarde, pensadas para estudiantes y personas con disponibilidad parcial.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Vacantes de Medio Tiempo ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">No hay convocatorias de medio tiempo disponibles hoy.</p>
          </div>
        )}
      </div>
    </div>
  );
}
