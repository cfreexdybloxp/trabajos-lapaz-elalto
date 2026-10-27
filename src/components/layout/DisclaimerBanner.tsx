import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside 
      aria-label="Aviso preventivo contra fraudes y cobros indebidos" 
      className="bg-amber-500 text-slate-950 text-xs sm:text-sm font-medium py-2 px-4 shadow-inner"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 flex-shrink-0" aria-hidden="true" />
          <span>
            <strong>Aviso de Seguridad (Ley N.º 263):</strong> Postular a un empleo es <strong>100% gratuito</strong>. Nunca pagues por entrevistas, materiales, trámites ni cursos.
          </span>
        </div>
        <a 
          href="/denunciar" 
          className="inline-flex items-center gap-1 underline font-bold hover:text-slate-800 focus:ring-2 focus:ring-slate-900 rounded px-1"
        >
          <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
          ¿Detectaste una oferta falsa? Denúnciala aquí
        </a>
      </div>
    </aside>
  );
};
