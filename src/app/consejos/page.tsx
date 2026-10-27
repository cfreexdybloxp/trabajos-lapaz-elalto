import React from 'react';
import Link from 'next/link';
import { 
  FileText, ShieldAlert, CheckCircle2, AlertTriangle, 
  UserCheck, Briefcase, Sparkles, PhoneCall 
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consejos para Buscar Trabajo y Preparar tu CV en Bolivia',
  description: 'Guía práctica para postulantes en La Paz y El Alto. Cómo armar un currículum sin experiencia, preparar entrevistas y reconocer ofertas fraudulentas.',
};

export default function ConsejosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          Orientación para el Postulante Paceño y Alteño
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Guía para Encontrar Empleo y Evitar Fraudes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Recomendaciones prácticas preparadas por especialistas para ayudarte a destacar en tus postulaciones y proteger tu seguridad.
        </p>
      </div>

      {/* Bloque 1: Alerta contra estafas y Ley 263 */}
      <section className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900 font-extrabold text-lg">
          <ShieldAlert className="w-6 h-6 text-amber-700" />
          <h2>Cómo Reconocer y Evitar Falsas Ofertas de Empleo (Ley N.º 263)</h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          En La Paz y El Alto, los avisos en postes, paredes y grupos de redes sociales suelen esconder esquemas piramidales o riesgos de trata de personas. Desconfía de inmediato si detectas alguno de estos patrones:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-amber-950 pt-2">
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <strong className="text-rose-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Ganancias irreales sin requisitos
            </strong>
            <p>Anuncios como "Gane 3.500 Bs contestando llamadas 4 horas al día" o "Medio tiempo para estudiantes sin experiencia ganando sueldo alto".</p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <strong className="text-rose-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Cobro de dinero anticipado
            </strong>
            <p>Pedir 30 Bs, 50 Bs o 100 Bs para "carpetas", "material de trabajo", "derecho a charla de capacitación" o "exámenes médicos en laboratorio privado".</p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <strong className="text-rose-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Retención de documentos personales
            </strong>
            <p>La Ley 263 prohíbe retener cédulas de identidad, títulos originales o pasaportes. Solo debes exhibir fotocopias simples.</p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <strong className="text-rose-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Citas en lugares aislados o informales
            </strong>
            <p>Entrevistas en habitaciones sin identificación corporativa, domicilios particulares o solicitudes de viaje inmediato a otra ciudad o frontera.</p>
          </div>
        </div>
      </section>

      {/* Bloque 2: Cómo estructurar un currículum */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
          <FileText className="w-6 h-6 text-brand-600" />
          <h2>Cómo Elaborar una Hoja de Vida (CV) Efectiva en Bolivia</h2>
        </div>
        
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Los reclutadores paceños revisan decenas de hojas de vida al día. Tu CV debe ser <strong>conciso (máximo 1 o 2 páginas)</strong> y estar siempre en formato <strong>PDF</strong> para que no se desconfigure al abrirlo en un celular.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">1. Datos de Contacto Directos:</strong>
                <p className="text-slate-600">Nombre completo, ciudad de residencia (ej: La Paz, Sopocachi o El Alto, Satélite), número de WhatsApp activo y correo electrónico profesional.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">2. Si no tienes experiencia formal:</strong>
                <p className="text-slate-600">Destaca proyectos de grado, talleres técnicos, ayudantías universitarias, voluntariados o trabajos en negocios familiares. Resalta habilidades como atención al cliente, manejo de Word/Excel y puntualidad.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">3. Si tienes experiencia previa:</strong>
                <p className="text-slate-600">Ordena tus empleos cronológicamente desde el más reciente. Menciona el cargo, nombre de la empresa, fechas de inicio/fin y 2 o 3 logros concretos.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">4. Referencias Laborales Verificables:</strong>
                <p className="text-slate-600">Incluye nombres y números telefónicos de supervisores directos o profesores que puedan dar fe de tu responsabilidad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 3: Consejos para la entrevista */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg">
          <UserCheck className="w-6 h-6 text-brand-600" />
          <h2>Claves para la Entrevista Laboral</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 text-sm block">Puntualidad Paceña</strong>
            <p>Llega 10 o 15 minutos antes. Prevé tráficos comunes en la Ceja de El Alto o tramos del Centro paceño.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 text-sm block">Conoce a la Empresa</strong>
            <p>Investiga a qué se dedica la empresa, qué productos vende y dónde quedan sus sucursales principales.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <strong className="text-slate-900 text-sm block">Pregunta sobre el Puesto</strong>
            <p>Al final de la entrevista, pregunta cordialmente sobre los horarios exactos, funciones y el proceso de selección.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <div className="text-center pt-4">
        <Link
          href="/empleos"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          Ver todas las ofertas verificadas hoy
        </Link>
      </div>
    </div>
  );
}
