import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, FileSearch, Building2, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros y Método de Verificación Editorial | Trabajos LP-EA',
  description: 'Conoce cómo funciona nuestra plataforma de empleo para La Paz y El Alto, nuestro método de verificación editorial y apego a la Ley Boliviana N.º 263.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          Transparencia y Seguridad Comunitaria
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Quiénes Somos y Cómo Verificamos las Ofertas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Nacimos con un objetivo concreto: ofrecer un espacio limpio, rápido y seguro para encontrar empleo real en el área metropolitana de La Paz y El Alto.
        </p>
      </div>

      {/* Declaración de Principios */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Nuestra Misión
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          En Bolivia, encontrar empleo suele ser un proceso desgastante. En las redes sociales abundan ofertas engañosas, negocios piramidales o convocatorias que exigen pagos indebidos a personas vulnerables. 
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>TrabajosLP-EA</strong> no cobra comisiones a los trabajadores, no vende cursos obligatorios ni retiene hojas de vida. Operamos como un <strong>directorio informativo y verificador editorial de convocatorias públicas</strong>, enlazando directamente al candidato con el empleador legítimo.
        </p>
      </section>

      {/* Los 3 Niveles de Verificación */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Nuestro Sistema de Verificación Editorial
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Cada oferta publicada en la plataforma cuenta con un sello transparente que indica cómo fue validada:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-blue-900">1. Empresa Verificada</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organizaciones con personería jurídica, NIT, local comercial establecido o canales corporativos de reclutamiento oficial comprobados.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-emerald-900">2. Convocatoria Oficial</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Convocatorias públicas emitidas por ministerios, municipios (como el GAMLP - SMILE), universidades estatales o entidades descentralizadas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-purple-900">3. Revisión Editorial</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ofertas de microempresas y talleres inspeccionadas individualmente por nuestro equipo para confirmar existencia de dirección, teléfono y gratuidad.
            </p>
          </div>
        </div>
      </section>

      {/* Compromiso con la Ley 263 */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Apego a la Ley Boliviana N.º 263
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          La <strong>Ley N.º 263 (Ley Integral contra la Trata y Tráfico de Personas)</strong> y sus normas reglamentarias prohíben estrictamente el cobro de comisiones a los trabajadores y la retención de documentos. Mantenemos una política de tolerancia cero frente al fraude laboral y cooperamos remitiendo alertas de captación indebida a las autoridades pertinentes.
        </p>
        <div className="pt-2">
          <Link
            href="/denunciar"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
          >
            Conoce cómo denunciar una oferta sospechosa o irregular &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
