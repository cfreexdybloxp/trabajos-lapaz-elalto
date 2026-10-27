import React from 'react';
import Link from 'next/link';
import { Search, Home, MapPin, Briefcase } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100 shadow-sm">
          <Briefcase className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Error 404 &bull; Página No Encontrada
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Esta oferta o página no existe
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Es posible que la vacante haya caducado, haya sido cubierta recientemente o el enlace contenga un error de escritura.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir a la Portada
          </Link>
          <Link
            href="/empleos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold py-3 px-5 rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <Search className="w-4 h-4 text-slate-500" />
            Explorar todas las vacantes
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-200/80 text-xs text-slate-500">
          <p>Accesos directos rápidos:</p>
          <div className="flex items-center justify-center gap-4 pt-2 font-semibold">
            <Link href="/empleos-la-paz" className="hover:text-brand-600">Ofertas La Paz</Link>
            <span>&bull;</span>
            <Link href="/empleos-el-alto" className="hover:text-brand-600">Ofertas El Alto</Link>
            <span>&bull;</span>
            <Link href="/sin-experiencia" className="hover:text-brand-600">Sin Experiencia</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
