import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import Link from 'next/link';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trabajos Sin Experiencia en La Paz y El Alto | Primer Empleo Bolivia',
  description: 'Encuentra trabajo sin experiencia previa en La Paz y El Alto. Puestos con capacitación pagada para bachilleres, estudiantes y recién egresados. Postulación 100% gratuita y sin engaños.',
};

export default async function SinExperienciaPage() {
  const jobs = await prisma.job.findMany({
    where: {
      experienceLevel: 'Sin experiencia',
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trabajos Sin Experiencia en La Paz y El Alto
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Oportunidades que capacitan desde cero. Ideal para tu primer empleo, egresados universitarios o bachilleres.
            </p>
          </div>
        </div>
      </div>

      {/* Guía Anti-Fraude para Jóvenes sin Experiencia */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-xs sm:text-sm text-emerald-950 space-y-3">
        <h2 className="font-extrabold text-base text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          3 Consejos de Oro para tu Primer Empleo en Bolivia:
        </h2>
        <ul className="space-y-2 text-xs text-emerald-900">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span><strong>Cuidado con anuncios sospechosos:</strong> Si te prometen ganar 4.000 Bs por medio tiempo sin requisitos claros ni nombre de empresa, suele tratarse de redes piramidales o ventas bajo presión. Todas nuestras ofertas aquí son de empresas registradas.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span><strong>Destaca tus habilidades blandas:</strong> En tu Hoja de Vida, resalta puntualidad, manejo de computadora, disposición para aprender y proyectos académicos.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span><strong>Nunca pagues para trabajar:</strong> Por Ley N.º 263, la capacitación para el puesto debe ser provista por la empresa sin costo alguno para ti.</span>
          </li>
        </ul>
      </div>

      {/* Listado de Ofertas */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Vacantes Disponibles Sin Experiencia Previa ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">No hay vacantes sin experiencia en este momento. Revisa nuevamente pronto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
