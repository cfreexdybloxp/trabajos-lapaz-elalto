import React from 'react';
import { prisma } from '@/lib/prisma';
import { JobCard } from '@/components/search/JobCard';
import { FilterSidebar } from '@/components/search/FilterSidebar';
import { SearchBar } from '@/components/search/SearchBar';
import Link from 'next/link';
import { Briefcase, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface EmpleosPageProps {
  searchParams: {
    q?: string;
    ciudad?: string;
    zona?: string;
    categoria?: string;
    experiencia?: string;
    jornada?: string;
    modalidad?: string;
    page?: string;
  };
}

export default async function EmpleosPage({ searchParams }: EmpleosPageProps) {
  const q = searchParams.q || '';
  const city = searchParams.ciudad || '';
  const zone = searchParams.zona || '';
  const category = searchParams.categoria || '';
  const experience = searchParams.experiencia || '';
  const schedule = searchParams.jornada || '';
  const modality = searchParams.modalidad || '';
  const currentPage = Math.max(1, parseInt(searchParams.page || '1'));
  const pageSize = 12;
  const skip = (currentPage - 1) * pageSize;

  // Condiciones de búsqueda
  const where: Record<string, unknown> = {
    reviewStatus: 'APROBADA',
    isVigente: true,
  };

  if (city) where.city = city;
  if (zone) where.zone = zone;
  if (category) where.category = category;
  if (experience) where.experienceLevel = experience;
  if (schedule) where.workSchedule = schedule;
  if (modality) where.modality = modality;

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { companyName: { contains: q } },
      { requirements: { contains: q } },
    ];
  }

  const [jobs, totalCount] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.job.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Helper para generar URLs de paginación
  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (city) params.set('ciudad', city);
    if (zone) params.set('zona', zone);
    if (category) params.set('categoria', category);
    if (experience) params.set('experiencia', experience);
    if (schedule) params.set('jornada', schedule);
    if (modality) params.set('modalidad', modality);
    params.set('page', pageNumber.toString());
    return `/empleos?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Barra de Búsqueda Superior */}
      <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200">
        <SearchBar
          initialQuery={q}
          initialCity={city}
          initialZone={zone}
        />
      </div>

      {/* Título de Resultados y Conteo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ofertas de Empleo en La Paz y El Alto
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Se encontraron <strong className="text-slate-800">{totalCount}</strong> vacantes verificadas que coinciden con tu criterio.
          </p>
        </div>

        {/* Indicador de filtros activos */}
        {(city || zone || category || experience || schedule || modality) && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filtros aplicados:</span>
            <Link
              href="/empleos"
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar todos
            </Link>
          </div>
        )}
      </div>

      {/* Contenido Principal: Filtros a la izquierda + Resultados a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Barra Lateral de Filtros */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Listado de Ofertas */}
        <div className="lg:col-span-3 space-y-6">
          {jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="pt-8 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={buildPageUrl(currentPage - 1)}
                      className="px-4 py-2 text-xs sm:text-sm font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-1 shadow-sm text-slate-700"
                    >
                      <ArrowLeft className="w-4 h-4" /> Anterior
                    </Link>
                  )}

                  <span className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-500">
                    Página {currentPage} de {totalPages}
                  </span>

                  {currentPage < totalPages && (
                    <Link
                      href={buildPageUrl(currentPage + 1)}
                      className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm flex items-center gap-1"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                No encontramos coincidencias para estos filtros
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Prueba ampliando tu búsqueda seleccionando "Todas las ciudades" o quitando filtros específicos de zona o experiencia.
              </p>
              <div className="pt-2">
                <Link
                  href="/empleos"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-brand-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ver todos los empleos disponibles
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
