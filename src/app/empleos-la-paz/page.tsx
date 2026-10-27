import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import { SearchBar } from '@/components/search/SearchBar';
import Link from 'next/link';
import { Building2, MapPin, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ofertas de Empleo en La Paz | Convocatorias Laborales Paceñas',
  description: 'Encuentra trabajo en la ciudad de La Paz, Bolivia. Ofertas verificadas en Centro, Sopocachi, Miraflores, Obrajes y Calacoto. Fácil acceso en Teleférico y transporte público.',
};

export default async function EmpleosLaPazPage() {
  const jobs = await prisma.job.findMany({
    where: {
      city: 'La Paz',
      reviewStatus: 'APROBADA',
      isVigente: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link href="/empleos" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Explorar todas las ciudades
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ofertas de Empleo en La Paz
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Convocatorias laborales en la sede de gobierno: Centro, Sopocachi, Miraflores y Zona Sur.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <SearchBar initialCity="La Paz" />
      </div>

      {/* Guía de Movilidad y Teleférico */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 text-xs text-brand-950 space-y-2">
        <h2 className="font-bold text-sm text-brand-900 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-brand-600" />
          Consejo de Movilidad para Postulantes en La Paz:
        </h2>
        <p className="leading-relaxed">
          Al postularte, considera la cercanía a las estaciones de <strong>Mi Teleférico</strong> (Líneas Celeste, Morada, Blanca, Amarilla y Verde) y tramos de transporte público hacia el Centro o Zona Sur para planificar tus tiempos y costos diarios de traslado.
        </p>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Vacantes Vigentes en La Paz ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">No hay convocatorias activas para La Paz en este instante.</p>
          </div>
        )}
      </div>
    </div>
  );
}
