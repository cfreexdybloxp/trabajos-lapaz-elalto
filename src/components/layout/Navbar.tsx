'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, Menu, X, PlusCircle, Search, Sparkles, 
  ShieldCheck, MapPin, Clock, GraduationCap, BookOpen, 
  FolderTree, AlertTriangle, ChevronRight 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Marca */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="group flex items-center gap-2.5 text-brand-700 font-extrabold text-lg sm:text-xl tracking-tight focus:ring-2 focus:ring-brand-500 rounded-xl p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight text-slate-900 font-black tracking-tight">
                  Trabajos<span className="text-brand-500">LP-EA</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-normal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  La Paz & El Alto, Bolivia
                </span>
              </div>
            </Link>
          </div>

          {/* Menú de Escritorio */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 text-xs xl:text-sm font-semibold text-slate-700">
            <Link 
              href="/empleos" 
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/empleos') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Explorar Ofertas
            </Link>
            <Link 
              href="/empleos-la-paz" 
              className={`px-3 py-2 rounded-xl transition-all ${
                isActive('/empleos-la-paz') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              La Paz
            </Link>
            <Link 
              href="/empleos-el-alto" 
              className={`px-3 py-2 rounded-xl transition-all ${
                isActive('/empleos-el-alto') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              El Alto
            </Link>
            <Link 
              href="/sin-experiencia" 
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                isActive('/sin-experiencia') 
                  ? 'bg-emerald-100/80 text-emerald-900 font-bold border border-emerald-300' 
                  : 'hover:bg-emerald-50 text-emerald-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              Sin Experiencia
            </Link>
            <Link 
              href="/medio-tiempo" 
              className={`px-3 py-2 rounded-xl transition-all ${
                isActive('/medio-tiempo') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Medio Tiempo
            </Link>
            <Link 
              href="/pasantias" 
              className={`px-3 py-2 rounded-xl transition-all ${
                isActive('/pasantias') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Pasantías
            </Link>
            <Link 
              href="/consejos" 
              className={`px-3 py-2 rounded-xl transition-all ${
                isActive('/consejos') 
                  ? 'bg-brand-50 text-brand-700 font-bold' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Consejos CV
            </Link>
          </nav>

          {/* Botones de acción derecha */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/publicar-oferta"
              className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-brand-500"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              Publicar Convocatoria
            </Link>
            <Link
              href="/admin/login"
              title="Panel de verificación editorial"
              className="text-slate-400 hover:text-slate-700 p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Acceso Administrativo</span>
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/publicar-oferta"
              className="text-xs bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-3 rounded-xl flex items-center gap-1 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Publicar
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable Móvil mejorado */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/empleos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-brand-500" />
              Explorar Todas las Ofertas
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/empleos-la-paz"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              Ofertas en La Paz
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/empleos-el-alto"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              Ofertas en El Alto
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/sin-experiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Trabajos Sin Experiencia
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Top</span>
          </Link>
          <Link
            href="/medio-tiempo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-slate-500" />
              Trabajos de Medio Tiempo
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/pasantias"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-sky-500" />
              Pasantías y Prácticas
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/categorias"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <FolderTree className="w-4 h-4 text-slate-500" />
              Categorías de Empleo
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/consejos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              Consejos para CV y Entrevistas
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
            <Link
              href="/denunciar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              Reportar Oferta Falsa o Sospechosa
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              Acceso Panel Administrativo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
