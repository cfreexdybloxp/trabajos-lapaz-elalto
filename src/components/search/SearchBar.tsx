'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';
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
      className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-slate-200/80 max-w-4xl mx-auto"
      role="search"
      aria-label="Buscador de empleos en La Paz y El Alto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
        {/* Input de palabra clave */}
        <div className="md:col-span-5 relative">
          <label htmlFor="search-keyword" className="sr-only">Palabra clave o puesto</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="search-keyword"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Puesto, empresa o profesión (ej. Cajero, Diseñador, Chofer)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          />
        </div>

        {/* Selector de Ciudad */}
        <div className="md:col-span-3 relative">
          <label htmlFor="search-city" className="sr-only">Ciudad</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4 text-brand-500" aria-hidden="true" />
          </div>
          <select
            id="search-city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setZone(''); // Limpia la zona si cambia de ciudad
            }}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            <option value="">Todas las ciudades</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Selector de Zona */}
        <div className="md:col-span-2 relative">
          <label htmlFor="search-zone" className="sr-only">Zona</label>
          <select
            id="search-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors truncate"
          >
            <option value="">Cualquier zona</option>
            {filteredZones.map((z) => (
              <option key={z.id} value={z.name}>{z.name}</option>
            ))}
          </select>
        </div>

        {/* Botón de Enviar */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-brand-500 text-sm"
          >
            Buscar
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
};
