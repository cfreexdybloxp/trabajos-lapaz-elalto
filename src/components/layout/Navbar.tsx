'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Menu, X, PlusCircle, Search, Sparkles, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Nombre */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 text-brand-700 font-extrabold text-lg sm:text-xl tracking-tight focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight text-slate-900 font-black">Trabajos<span className="text-brand-600">LP-EA</span></span>
                <span className="text-[10px] text-slate-500 font-medium tracking-normal">La Paz & El Alto, Bolivia</span>
              </div>
            </Link>
          </div>

          {/* Menú de Escritorio */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
            <Link 
              href="/empleos" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-slate-500" aria-hidden="true" />
              Explorar Ofertas
            </Link>
            <Link 
              href="/empleos-la-paz" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors"
            >
              La Paz
            </Link>
            <Link 
              href="/empleos-el-alto" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors"
            >
              El Alto
            </Link>
            <Link 
              href="/sin-experiencia" 
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 text-emerald-800 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Sin Experiencia
            </Link>
            <Link 
              href="/medio-tiempo" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors"
            >
              Medio Tiempo
            </Link>
            <Link 
              href="/pasantias" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors"
            >
              Pasantías
            </Link>
            <Link 
              href="/consejos" 
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-brand-600 transition-colors"
            >
              Guía & Consejos
            </Link>
          </nav>

          {/* Botones de acción derecha */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/publicar-oferta"
              className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-brand-500"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              Publicar Convocatoria
            </Link>
            <Link
              href="/admin/login"
              title="Panel de verificación administrativo"
              className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
            >
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Acceso Administrativo</span>
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/publicar-oferta"
              className="text-xs bg-brand-600 text-white font-bold py-1.5 px-3 rounded-lg flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Publicar
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl">
          <Link
            href="/empleos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            🔍 Explorar Todas las Ofertas
          </Link>
          <Link
            href="/empleos-la-paz"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            📍 Ofertas en La Paz
          </Link>
          <Link
            href="/empleos-el-alto"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            🚠 Ofertas en El Alto
          </Link>
          <Link
            href="/sin-experiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
          >
            ✨ Trabajos Sin Experiencia
          </Link>
          <Link
            href="/medio-tiempo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            ⏱️ Trabajos de Medio Tiempo
          </Link>
          <Link
            href="/pasantias"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            🎓 Pasantías y Prácticas
          </Link>
          <Link
            href="/categorias"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            📁 Categorías de Empleo
          </Link>
          <Link
            href="/consejos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            💡 Consejos para CV y Entrevistas
          </Link>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/denunciar"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-amber-800 bg-amber-50 rounded-lg text-center"
            >
              ⚠️ Reportar Oferta Falsa o Sospechosa
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-600 text-center"
            >
              🔒 Acceso Panel Administrativo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
