import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, AlertTriangle, XCircle, FileSearch } from 'lucide-react';

interface StatusBadgeProps {
  type: 'verification' | 'review';
  value: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, value }) => {
  if (type === 'verification') {
    switch (value) {
      case 'EMPRESA_VERIFICADA':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2 py-0.5 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Empresa Verificada
          </span>
        );
      case 'CONVOCATORIA_OFICIAL':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Convocatoria Oficial
          </span>
        );
      case 'REVISION_EDITORIAL':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold px-2 py-0.5 rounded-md">
            <FileSearch className="w-3.5 h-3.5 text-purple-600" />
            Revisión Editorial
          </span>
        );
    }
  }

  // type === 'review'
  switch (value) {
    case 'APROBADA':
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          Aprobada / Vigente
        </span>
      );
    case 'PENDIENTE':
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
          <Clock className="w-3 h-3 text-amber-600" />
          Pendiente de Revisión
        </span>
      );
    case 'CORRECCION':
      return (
        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
          <AlertTriangle className="w-3 h-3 text-orange-600" />
          Requiere Corrección
        </span>
      );
    case 'VENCIDA':
      return (
        <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          <Clock className="w-3 h-3 text-slate-500" />
          Oferta Vencida
        </span>
      );
    case 'RECHAZADA':
    case 'RETIRADA':
      return (
        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
          <XCircle className="w-3 h-3 text-rose-600" />
          Retirada / Rechazada
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {value}
        </span>
      );
  }
};
