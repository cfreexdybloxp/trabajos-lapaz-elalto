'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, MapPin, Briefcase, Clock, Sparkles } from 'lucide-react';
import { BOLIVIA_ZONES, CITIES, WORK_SCHEDULES, MODALITIES, EXPERIENCE_LEVELS } from '@/lib/data/bolivia-zones';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    // Si cambia de ciudad, resetear zona
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
    <aside aria-label="Filtros de búsqueda" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" aria-hidden="true" />
          Filtros de Empleo
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 focus:ring-2 focus:ring-rose-500 rounded p-1"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* 1. Ciudad */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          Ciudad
        </label>
        <div className="space-y-1.5 text-sm">
          <button
            type="button"
            onClick={() => updateFilter('ciudad', '')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !currentCity ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Todas (La Paz y El Alto)
          </button>
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => updateFilter('ciudad', c)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentCity === c ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Zona específica */}
      <div>
        <label htmlFor="filter-zone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Zona o Barrio
        </label>
        <select
          id="filter-zone"
          value={currentZone}
          onChange={(e) => updateFilter('zona', e.target.value)}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Todas las zonas</option>
          {filteredZones.map((z) => (
            <option key={z.id} value={z.name}>
              {z.name} {z.telefericoNear ? `(${z.telefericoNear})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Nivel de Experiencia */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Experiencia Requerida
        </label>
        <div className="space-y-1.5 text-xs">
          <button
            type="button"
            onClick={() => updateFilter('experiencia', '')}
            className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors ${
              !currentExp ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Cualquier nivel
          </button>
          {EXPERIENCE_LEVELS.map((exp) => (
            <button
              key={exp}
              type="button"
              onClick={() => updateFilter('experiencia', exp)}
              className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                currentExp === exp 
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{exp}</span>
              {exp === 'Sin experiencia' && (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Top</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Categoría Laboral */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-500" />
          Categoría
        </label>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('categoria', e.target.value)}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Todas las categorías</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* 5. Tipo de Jornada */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Jornada
        </label>
        <div className="space-y-1 text-xs">
          {WORK_SCHEDULES.map((sch) => (
            <button
              key={sch}
              type="button"
              onClick={() => updateFilter('jornada', currentSchedule === sch ? '' : sch)}
              className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors ${
                currentSchedule === sch ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sch}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Modalidad */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Modalidad
        </label>
        <div className="flex flex-wrap gap-1.5">
          {MODALITIES.map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => updateFilter('modalidad', currentModality === mod ? '' : mod)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                currentModality === mod
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
