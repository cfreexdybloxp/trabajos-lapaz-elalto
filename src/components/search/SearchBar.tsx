'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { BOLIVIA_ZONES, CITIES } from '@/lib/data/bolivia-zones';

interface SearchBarProps {
  initialQuery?: string;
  initialCity?: string;
  initialZone?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  initialCity = '',
  initialZone = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [zone, setZone] = useState(initialZone);

  const filteredZones = BOLIVIA_ZONES.filter(z => !city || z.city === city);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (city) params.set('ciudad', city);
    if (zone) params.set('zona', zone);
    router.push(`/empleos?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="bg-white p-2.5 sm:p-3.5 rounded-3xl shadow-xl border border-slate-200/90 max-w-5xl mx-auto backdrop-blur-sm"
      role="search"
      aria-label="Buscador de empleos en La Paz y El Alto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-center">
        {/* Input de palabra clave */}
        <div className="sm:col-span-2 lg:col-span-4 relative">
          <label htmlFor="search-keyword" className="sr-only">Palabra clave o puesto</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" aria-hidden="true" />
          </div>
          <input
            id="search-keyword"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Puesto o profesión (ej. Cajero, Chofer, Diseñador)..."
            className="w-full pl-10 pr-3.5 py-3 bg-slate-50/90 hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
          />
        </div>

        {/* Selector de Ciudad */}
        <div className="sm:col-span-1 lg:col-span-3 relative">
          <label htmlFor="search-city" className="sr-only">Ciudad</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4 text-brand-500" aria-hidden="true" />
          </div>
          <select
            id="search-city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setZone('');
            }}
            className="w-full pl-10 pr-8 py-3 bg-slate-50/90 hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">Todas las ciudades</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Selector de Zona */}
        <div className="sm:col-span-1 lg:col-span-3 relative">
          <label htmlFor="search-zone" className="sr-only">Zona</label>
          <select
            id="search-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full pl-3.5 pr-8 py-3 bg-slate-50/90 hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none cursor-pointer truncate"
          >
            <option value="">Cualquier zona o barrio</option>
            {filteredZones.map((z) => (
              <option key={z.id} value={z.name}>{z.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Botón de Búsqueda */}
        <div className="sm:col-span-2 lg:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm group"
          >
            <span>Buscar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
};
