import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Categorías de Empleo en La Paz y El Alto | Sectores Laborales',
  description: 'Explora vacantes clasificadas por sector profesional: ventas, administración, tecnología, gastronomía, confección textil, salud y educación en La Paz y El Alto.',
};

export default async function CategoriasPage() {
  // Conteo de empleos por categoría
  const counts = await prisma.job.groupBy({
    by: ['category'],
    where: { reviewStatus: 'APROBADA', isVigente: true },
    _count: { id: true },
  });

  const countMap: Record<string, number> = {};
  counts.forEach((c) => {
    countMap[c.category] = c._count.id;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Directorio de Categorías Laborales
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Busca empleo según tu formación técnica, oficio o rubro de preferencia en La Paz y El Alto.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {JOB_CATEGORIES.map((cat) => {
          const count = countMap[cat.name] || 0;
          return (
            <Link
              key={cat.id}
              href={`/empleos?categoria=${encodeURIComponent(cat.name)}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {count} {count === 1 ? 'oferta' : 'ofertas'}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1.5">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
                <span>Ver convocatorias</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
