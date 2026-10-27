import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | Trabajos LP-EA Bolivia',
  description: 'Condiciones de uso de la plataforma web de empleo para La Paz y El Alto. Responsabilidades, prohibiciones y cumplimiento de la Ley 263.',
};

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-2">
          <Scale className="w-3.5 h-3.5" />
          Marco Legal y Condiciones del Servicio
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Vigentes para todos los usuarios, postulantes y empleadores en el Estado Plurinacional de Bolivia.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Naturaleza Informativa del Portal</h2>
          <p>
            TrabajosLP-EA es un portal digital de difusión y agregación informativa de convocatorias laborales en el departamento de La Paz (ciudades de La Paz y El Alto). La plataforma facilita la visualización y verificación editorial de avisos públicos, pero <strong>no interviene en la selección, entrevista ni relación contractual laboral</strong> entre el postulante y el empleador.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Gratuidad Incondicional para Postulantes (Ley N.º 263)</h2>
          <p>
            Conforme al Art. 25 de la Ley N.º 263 de Bolivia, el acceso a la información y postulación a las vacantes publicadas es <strong>100% gratuito</strong>. Queda prohibido a cualquier anunciante solicitar dinero o retener documentos. La violación de esta cláusula facultará la baja inmediata y denuncia ante la FELCC o el Ministerio de Trabajo.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Responsabilidad de los Anunciantes</h2>
          <p>
            Las empresas u organizaciones que envíen convocatorias declaran bajo juramento que los puestos son legítimos, que las condiciones ofrecidas respetan la Ley General del Trabajo de Bolivia y que los datos de contacto pertenecen efectivamente a la entidad.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Retiro y Modificación de Contenido</h2>
          <p>
            El equipo editorial se reserva el derecho de rechazar, modificar para corregir errores ortográficos, suspender o dar de baja cualquier aviso que no cumpla con los estándares de veracidad, haya caducado o reciba denuncias fundamentadas de la comunidad.
          </p>
        </section>
      </div>
    </div>
  );
}
