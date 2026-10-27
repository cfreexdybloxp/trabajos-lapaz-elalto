import React from 'react';
import Link from 'next/link';
import { Briefcase, ShieldCheck, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Marca y Misión */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <span>Trabajos<span className="text-brand-400">LP-EA</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma comunitaria independiente y gratuita para conectar oportunidades laborales reales, verificadas y sin estafas en el área metropolitana de La Paz y El Alto, Bolivia.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Alineada a la Ley Boliviana N.º 263</span>
            </div>
          </div>

          {/* Columna 2: Por Ubicación */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-400" />
              Zonas de Empleo
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/empleos-la-paz" className="hover:text-white transition-colors">La Paz (Centro, Sopocachi, Miraflores)</Link></li>
              <li><Link href="/empleos?ciudad=La+Paz&zona=Zona+Sur+(Calacoto+/+San+Miguel)" className="hover:text-white transition-colors">Zona Sur (Calacoto, Obrajes, San Miguel)</Link></li>
              <li><Link href="/empleos-el-alto" className="hover:text-white transition-colors">El Alto (La Ceja, 16 de Julio, Villa Adela)</Link></li>
              <li><Link href="/empleos?ciudad=El+Alto&zona=Ciudad+Satélite" className="hover:text-white transition-colors">El Alto (Ciudad Satélite, Río Seco)</Link></li>
              <li><Link href="/empleos?modalidad=Remoto" className="hover:text-white transition-colors">Teletrabajo / Empleos Remotos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Especialidades */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Oportunidades Destacadas</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/sin-experiencia" className="hover:text-white transition-colors text-emerald-400 font-medium">✨ Trabajos Sin Experiencia Previa</Link></li>
              <li><Link href="/pasantias" className="hover:text-white transition-colors">🎓 Pasantías para Estudiantes Universitarios</Link></li>
              <li><Link href="/medio-tiempo" className="hover:text-white transition-colors">⏱️ Empleos de Medio Tiempo</Link></li>
              <li><Link href="/categorias" className="hover:text-white transition-colors">📁 Directorio por Categorías</Link></li>
              <li><Link href="/consejos" className="hover:text-white transition-colors">💡 Consejos para Elaborar tu Currículum</Link></li>
            </ul>
          </div>

          {/* Columna 4: Transparencia y Legal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Transparencia y Contacto</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">Método de Verificación Editorial</Link></li>
              <li><Link href="/denunciar" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">⚠️ Procedimiento para Denunciar Ofertas</Link></li>
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Canales de Contacto</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} TrabajosLP-EA. Servicio comunitario de difusión de convocatorias de empleo para La Paz y El Alto.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para el talento paceño y alteño.
          </p>
        </div>
      </div>
    </footer>
  );
};
