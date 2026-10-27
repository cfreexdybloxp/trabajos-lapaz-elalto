import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import { SearchBar } from '@/components/search/SearchBar';
import Link from 'next/link';
import { MapPin, ArrowLeft, Factory } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ofertas de Empleo en El Alto | Convocatorias y Trabajos en El Alto Bolivia',
  description: 'Oportunidades laborales y empleos en El Alto, Bolivia. Ofertas reales en La Ceja, 16 de Julio, Ciudad Satélite, Villa Adela y Río Seco. Comercio, oficios, industria y servicios.',
};

export default async function EmpleosElAltoPage() {
  const jobs = await prisma.job.findMany({
    where: {
      city: 'El Alto',
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
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ofertas de Empleo en El Alto
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Vacantes en La Ceja, Zona 16 de Julio, Ciudad Satélite, Villa Adela, Río Seco y Senkata.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <SearchBar initialCity="El Alto" />
      </div>

      {/* Dinámica Económica de El Alto */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
        <h2 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-700" />
          El Gran Eje Comercial e Industrial de El Alto:
        </h2>
        <p className="leading-relaxed">
          El Alto es uno de los motores económicos más dinámicos de Bolivia. Aquí se concentran miles de oportunidades en comercio mayorista, manufactura textil, metalmecánica, producción industrial y logística conectadas por las <strong>Líneas Roja, Azul, Plateada y Morada</strong>.
        </p>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Vacantes Vigentes en El Alto ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">No hay convocatorias activas para El Alto en este instante.</p>
          </div>
        )}
      </div>
    </div>
  );
}
