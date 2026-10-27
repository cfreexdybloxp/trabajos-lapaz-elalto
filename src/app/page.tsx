import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { JobCard } from '@/components/search/JobCard';
import { prisma } from '@/lib/prisma';
import { 
  Briefcase, Sparkles, Clock, GraduationCap, MapPin, 
  ShieldCheck, ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Obtener ofertas vigentes y aprobadas
  const recentJobs = await prisma.job.findMany({
    where: {
      reviewStatus: 'APROBADA',
      isVigente: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });

  const totalActiveJobs = await prisma.job.count({
    where: { reviewStatus: 'APROBADA', isVigente: true },
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-700 via-brand-600 to-brand-800 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ofertas laborales 100% verificadas para La Paz y El Alto</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Encuentra tu próximo empleo <br className="hidden sm:inline" />
            <span className="text-amber-300">sin engaños ni cobros</span> en Bolivia
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Plataforma con revisión editorial obligatoria. Filtra por Teleférico, zonas urbanas, oportunidades sin experiencia y convocatorias oficiales.
          </p>

          {/* Buscador Integrado */}
          <div className="pt-4">
            <SearchBar />
          </div>

          {/* Accesos rápidos de búsqueda */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-300 font-medium">Búsquedas populares:</span>
            <Link 
              href="/sin-experiencia" 
              className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-300" /> Sin experiencia
            </Link>
            <Link 
              href="/medio-tiempo" 
              className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1"
            >
              <Clock className="w-3 h-3 text-amber-300" /> Medio tiempo
            </Link>
            <Link 
              href="/pasantias" 
              className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3 text-sky-300" /> Pasantías universitarias
            </Link>
            <Link 
              href="/empleos-el-alto" 
              className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-rose-300" /> El Alto Ceja y 16 de Julio
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Sección de Oportunidades Clave (Tarjetas de Acceso Rápido) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/sin-experiencia"
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 text-base mb-1">
                Primer Empleo & Sin Experiencia
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vacantes que capacitan en el puesto, sin exigencia de años previos. Ideal para jóvenes.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 gap-1">
              Ver ofertas <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/empleos-el-alto"
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 group-hover:text-brand-700 text-base mb-1">
                Convocatorias en El Alto
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Oportunidades en La Ceja, Satélite, Río Seco, 16 de Julio y parques industriales.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-brand-700 gap-1">
              Ver ofertas en El Alto <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/empleos-la-paz"
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2Icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-700 text-base mb-1">
                Convocatorias en La Paz
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Puestos en el Centro, Sopocachi, Miraflores, Obrajes y Calacoto.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-indigo-700 gap-1">
              Ver ofertas en La Paz <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/medio-tiempo"
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 group-hover:text-amber-700 text-base mb-1">
                Medio Tiempo & Turnos Flexibles
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Horarios compatibles con estudios universitarios en UMSA, UPEA o institutos.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 gap-1">
              Ver medio tiempo <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Ofertas Recientes Verificadas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Vigencia y Procedencia Auditada
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ofertas Laborales Recientes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {totalActiveJobs} convocatorias vigentes disponibles en La Paz y El Alto
            </p>
          </div>
          <Link
            href="/empleos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 group"
          >
            Explorar todas las vacantes con filtros
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No hay ofertas publicadas en este momento</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Estamos revisando nuevas convocatorias para asegurar que cumplan con todos los requisitos de legalidad.
            </p>
          </div>
        )}
      </section>

      {/* 4. Categorías Profesionales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explora por Categoría Laboral
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Encuentra puestos según tu especialidad técnica, oficio o carrera profesional.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {JOB_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/empleos?categoria=${encodeURIComponent(cat.name)}`}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all text-center space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-600 flex items-center justify-center mx-auto transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-brand-600">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Bloque de Compromiso y Verificación (Ley 263) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              Seguridad y Verificación Editorial Estricta
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ¿Por qué nuestra plataforma es segura para el postulante?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              En Bolivia, la Ley N.º 263 castiga severamente la captación ilícita y las estafas disfrazadas de ofertas de trabajo. Nuestro equipo revisa cada vacante antes de su aprobación:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Cero cobros a postulantes:</strong> Bloqueamos cualquier aviso que pida depósitos, pago por uniformes, exámenes médicos o carpetas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Enlace directo y transparente:</strong> Te comunicas directamente con la empresa o institución oficial vía correo, WhatsApp corporativo o portal oficial.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Canal de denuncia ciudadana:</strong> Cualquier aviso sospechoso puede ser reportado y se suspende para auditoría inmediata.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-4">
            <h3 className="font-bold text-white text-base">¿Representas a una empresa o institución?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publica tus convocatorias laborales legítimas de forma gratuita y llega a miles de candidatos paceños y alteños.
            </p>
            <Link
              href="/publicar-oferta"
              className="inline-block w-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors"
            >
              Publicar Convocatoria Gratuita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
