import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Procedimiento de Denuncia de Ofertas Falsas o Fraudulentas | Bolivia',
  description: 'Canal de reporte y procedimiento para denunciar convocatorias sospechosas, cobros indebidos o fraudes laborales en La Paz y El Alto.',
};

export default function DenunciarPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Procedimiento para Denunciar Ofertas Laborales
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Protocolo de protección al postulante y canales oficiales en Bolivia.
            </p>
          </div>
        </div>
      </div>

      {/* Protocolo Interno */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          ¿Cómo actuar ante una oferta sospechosa en nuestra web?
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <strong className="text-slate-900">Utiliza el botón de reporte en la oferta:</strong>
              <p>Al final de cada convocatoria individual encontrarás el enlace directo <em>"¿Piden dinero o detectaste irregularidades? Reportar aquí"</em>. Esto envía una alerta automática a nuestro panel de moderación.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <strong className="text-slate-900">Suspensión preventiva:</strong>
              <p>Nuestro equipo revisa la denuncia. Si se comprueba solicitud de cobros, falsedad de datos o indicios de estafa, la oferta es <strong>retirada inmediatamente</strong> del buscador público.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <strong className="text-slate-900">Registro de exclusión:</strong>
              <p>El empleador o número telefónico involucrado queda bloqueado para futuras publicaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Canales Oficiales del Estado Plurinacional de Bolivia */}
      <section className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-rose-900 font-extrabold text-lg">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
          <h2>Canales Oficiales del Estado para Delitos Laborales y Trata de Personas</h2>
        </div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
          Si fuiste víctima de cobros indebidos, retención de documentos o sospechas de una red ilícita, te instamos a formalizar tu denuncia ante las entidades competentes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-rose-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">FELCC - División de Trata y Tráfico de Personas</h3>
            <p className="text-slate-600">
              Encargada de investigar anuncios de captación engañosa, ofertas laborales en el exterior no autorizadas o retención de menores.
            </p>
            <div className="pt-2 text-rose-700 font-bold flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>La Paz: Calle Sucre esq. Bolívar (FELCC Central)</span>
            </div>
            <div className="text-rose-700 font-bold flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>El Alto: Av. Raúl Salmón esq. Calle 11 (La Ceja)</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Ministerio de Trabajo, Empleo y Previsión Social</h3>
            <p className="text-slate-600">
              Autoridad facultada para fiscalizar agencias privadas de empleo ilegales y velar por el cumplimiento de la Ley N.º 263.
            </p>
            <div className="pt-2 text-brand-700 font-bold flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>Línea Piloto: (591-2) 2408606</span>
            </div>
            <a
              href="https://www.mintrabajo.gob.bo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 underline font-semibold hover:text-brand-700"
            >
              Visitar sitio web oficial del MTEPS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      <div className="text-center pt-2">
        <Link
          href="/empleos"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700"
        >
          &larr; Volver a la lista de ofertas verificadas
        </Link>
      </div>
    </div>
  );
}
