'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, MapPin, Briefcase, Clock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { BOLIVIA_ZONES, CITIES, WORK_SCHEDULES, MODALITIES, EXPERIENCE_LEVELS } from '@/lib/data/bolivia-zones';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const currentCity = searchParams.get('ciudad') || '';
  const currentZone = searchParams.get('zona') || '';
  const currentCategory = searchParams.get('categoria') || '';
  const currentExp = searchParams.get('experiencia') || '';
  const currentSchedule = searchParams.get('jornada') || '';
  const currentModality = searchParams.get('modalidad') || '';
  const currentQuery = searchParams.get('q') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === 'ciudad') {
      params.delete('zona');
    }
    router.push(`/empleos?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (currentQuery) params.set('q', currentQuery);
    router.push(`/empleos${currentQuery ? `?q=${encodeURIComponent(currentQuery)}` : ''}`);
  };

  const hasActiveFilters = Boolean(
    currentCity || currentZone || currentCategory || currentExp || currentSchedule || currentModality
  );

  const filteredZones = BOLIVIA_ZONES.filter(z => !currentCity || z.city === currentCity);

  return (
    <aside aria-label="Filtros de búsqueda" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Cabecera del Panel de Filtros */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <Filter className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
              Filtros
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              {hasActiveFilters ? 'Filtros aplicados' : 'Refina tus resultados'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          )}

          {/* Botón para colapsar en Móvil */}
          <button
            type="button"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
            aria-label={mobileExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}
          >
            {mobileExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Contenido de Filtros: visible siempre en Desktop (lg), toggleable en Móvil */}
      <div className={`p-4 sm:p-5 space-y-6 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* 1. Ciudad */}
        <div className="space-y-2">
          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            Ciudad
          </label>
          <div className="grid grid-cols-1 gap-1">
            <button
              type="button"
              onClick={() => updateFilter('ciudad', '')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                !currentCity 
                  ? 'bg-brand-50 text-brand-700 font-bold shadow-xs border border-brand-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Todas (La Paz y El Alto)
            </button>
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updateFilter('ciudad', c)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  currentCity === c 
                    ? 'bg-brand-50 text-brand-700 font-bold shadow-xs border border-brand-200' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Zona específica */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label htmlFor="filter-zone" className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">
            Zona o Barrio
          </label>
          <div className="relative">
            <select
              id="filter-zone"
              value={currentZone}
              onChange={(e) => updateFilter('zona', e.target.value)}
              className="w-full p-2.5 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
            >
              <option value="">Todas las zonas</option>
              {filteredZones.map((z) => (
                <option key={z.id} value={z.name}>
                  {z.name} {z.telefericoNear ? `(${z.telefericoNear})` : ''}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 3. Nivel de Experiencia */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Experiencia Requerida
          </label>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => updateFilter('experiencia', '')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                !currentExp ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Cualquier nivel
            </button>
            {EXPERIENCE_LEVELS.map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => updateFilter('experiencia', exp)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  currentExp === exp 
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-300' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{exp}</span>
                {exp === 'Sin experiencia' && (
                  <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Top</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Categoría Laboral */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            Categoría
          </label>
          <div className="relative">
            <select
              value={currentCategory}
              onChange={(e) => updateFilter('categoria', e.target.value)}
              className="w-full p-2.5 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
            >
              <option value="">Todas las categorías</option>
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 5. Tipo de Jornada */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Jornada
          </label>
          <div className="space-y-1">
            {WORK_SCHEDULES.map((sch) => (
              <button
                key={sch}
                type="button"
                onClick={() => updateFilter('jornada', currentSchedule === sch ? '' : sch)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  currentSchedule === sch 
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sch}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Modalidad */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">
            Modalidad
          </label>
          <div className="flex flex-wrap gap-1.5">
            {MODALITIES.map((mod) => (
              <button
                key={mod}
                type="button"
                onClick={() => updateFilter('modalidad', currentModality === mod ? '' : mod)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  currentModality === mod
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
