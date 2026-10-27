import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, Award } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pasantías y Prácticas Profesionales en La Paz y El Alto | Bolivia 2026',
  description: 'Convocatorias de pasantías universitarias, prácticas pre-profesionales e institucionales en La Paz y El Alto. Certificados de experiencia y estipendio conforme a ley.',
};

export default async function PasantiasPage() {
  const jobs = await prisma.job.findMany({
    where: {
      experienceLevel: 'Pasantía / Prácticas',
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
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pasantías y Prácticas Profesionales
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Convocatorias para estudiantes de universidades (UMSA, UPEA, EMI, UCB, UNIFRANZ) e institutos de La Paz y El Alto.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-xs text-sky-950 space-y-2">
        <h2 className="font-bold text-sm text-sky-900 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-sky-700" />
          Reconocimiento y Valor Curricular:
        </h2>
        <p className="leading-relaxed">
          Las pasantías te permiten convalidar horas académicas de grado y obtener tu primer certificado laboral. Exige siempre convenio institucional firmado y horarios que respeten tus clases.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Pasantías Disponibles ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">No hay pasantías abiertas en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
