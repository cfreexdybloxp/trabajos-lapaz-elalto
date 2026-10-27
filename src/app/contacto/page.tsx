import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, MapPin, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto y Canales de Comunicación | Trabajos LP-EA',
  description: 'Contáctate con el equipo editorial de Trabajos La Paz y El Alto. Consultas para empresas, dudas de postulantes y sugerencias.',
};

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contacto y Asistencia
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Estamos a tu disposición para consultas institucionales, acreditación de empresas y sugerencias comunitarias.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-slate-900">Correo Electrónico Editorial</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Para empresas que deseen validar su perfil, rectificación de convocatorias o alianzas institucionales.
          </p>
          <a
            href="mailto:contacto@empleos-lapaz-elalto.bo"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 underline block"
          >
            contacto@empleos-lapaz-elalto.bo
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-slate-900">Atención Ciudadana</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Si tienes dudas sobre el uso de la plataforma o necesitas reportar una oferta de forma prioritaria.
          </p>
          <Link
            href="/denunciar"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline block"
          >
            Formulario de Denuncias y Reportes &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          Recordatorio sobre Postulaciones:
        </h3>
        <p>
          TrabajosLP-EA <strong>no recibe currículums ni realiza contrataciones directamente</strong>. Para postular a una vacante, debes comunicarte únicamente a través del correo, WhatsApp o enlace oficial especificado en la ficha de cada oferta.
        </p>
      </div>
    </div>
  );
}
