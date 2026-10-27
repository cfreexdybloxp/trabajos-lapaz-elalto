'use client';

import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ReportJobModalProps {
  jobId: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportJobModal: React.FC<ReportJobModalProps> = ({
  jobId,
  jobTitle,
  isOpen,
  onClose,
}) => {
  const [reason, setReason] = useState('PIDEN_DINERO');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      setError('Por favor explica brevemente el motivo del reporte.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, reason, details }),
      });

      if (!res.ok) {
        throw new Error('No se pudo enviar el reporte.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch {
      setError('Hubo un error al procesar tu denuncia. Inténtalo nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg focus:ring-2 focus:ring-slate-400"
          aria-label="Cerrar ventana de reporte"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Denuncia recibida con éxito</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Gracias por proteger a la comunidad paceña y alteña. Nuestro equipo editorial revisará esta oferta inmediatamente para verificar su legalidad o retirarla.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="report-modal-title" className="text-base font-bold text-slate-900">
                  Denunciar o Reportar Oferta
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  Puesto: {jobTitle}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Ley N.º 263:</strong> Si te solicitaron depósitos, cobro de carpetas o sospechas de captación indebida, infórmanos con el mayor detalle posible.
              </p>
            </div>

            {error && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="report-reason" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Motivo del reporte
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              >
                <option value="PIDEN_DINERO">Piden dinero, depósitos o compra de materiales (Ilegal)</option>
                <option value="FRAUDE_PIRAMIDAL">Sospecha de estafa, pirámide o captación dudosa</option>
                <option value="OFERTA_VENCIDA">La oferta ya venció o el puesto está ocupado</option>
                <option value="DATOS_INCORRECTOS">Teléfono, correo o dirección física falsos</option>
                <option value="OTRO">Otro motivo</option>
              </select>
            </div>

            <div>
              <label htmlFor="report-details" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Explica lo sucedido (mínimo 10 caracteres)
              </label>
              <textarea
                id="report-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ejemplo: Escribí al número indicado y me pidieron 50 Bs para ingresar a una charla de capacitación..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-colors disabled:opacity-50"
              >
                {submitting ? 'Enviando denuncia...' : 'Enviar Denuncia'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
