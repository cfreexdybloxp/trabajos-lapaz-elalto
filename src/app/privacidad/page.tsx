import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Tratamiento de Datos | Bolivia',
  description: 'Conoce cómo protegemos tu privacidad. En Trabajos LP-EA no almacenamos CVs, cédulas de identidad ni datos bancarios.',
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Minimización Estricta de Datos Personales
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Última actualización: Octubre de 2026 &bull; Vigente en el Estado Plurinacional de Bolivia
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Principio Fundamental: No Recopilación de Datos Sensibles</h2>
          <p>
            <strong>TrabajosLP-EA</strong> opera bajo el principio de minimización de datos. En nuestra versión pública <strong>no solicitamos, no procesamos ni almacenamos currículums vítae, cédulas de identidad, certificados de antecedentes ni datos bancarios de los postulantes</strong>.
          </p>
          <p>
            Cuando un postulante decide postularse a una vacante, lo hace directamente mediante los canales oficiales provistos por el empleador (su correo electrónico, su enlace corporativo o su WhatsApp oficial), sin intermediación de nuestra base de datos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Datos Recopilados en Publicaciones y Reportes</h2>
          <p>
            Únicamente recopilamos la información estrictamente necesaria para la prestación del servicio:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Formulario de publicación de convocatorias:</strong> Título del puesto, datos públicos de la empresa, dirección o zona de trabajo, y datos de contacto de postulación que el propio empleador autoriza a difundir.</li>
            <li><strong>Formulario de denuncias y reportes:</strong> El motivo y la explicación de la irregularidad reportada. Para evitar abusos y spam, se genera una huella criptográfica anónima (hash irreversible) de la conexión, sin registrar identidades personales.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cookies y Almacenamiento Local</h2>
          <p>
            La plataforma utiliza cookies técnicas estrictamente necesarias para la autenticación segura del panel administrativo (cookies <code>HTTP-Only</code> y <code>SameSite</code>). No utilizamos cookies de rastreo publicitario invasivo de terceros ni vendemos información a corredores de datos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Contacto sobre Privacidad</h2>
          <p>
            Para consultas sobre el tratamiento de datos o solicitar la rectificación de convocatorias públicas de tu empresa, puedes escribir a: <a href="mailto:privacidad@empleos-lapaz-elalto.bo" className="text-brand-600 underline font-semibold">privacidad@empleos-lapaz-elalto.bo</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
