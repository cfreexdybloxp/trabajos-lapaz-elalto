'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, PlusCircle, AlertOctagon, 
  History, LogOut, ShieldCheck, Home 
} from 'lucide-react';

export const AdminSidebar: React.FC<{ userEmail: string; userName: string }> = ({
  userEmail,
  userName,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
    }
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Panel Principal', icon: LayoutDashboard },
    { href: '/admin/ofertas', label: 'Gestión de Ofertas', icon: Briefcase },
    { href: '/admin/ofertas/nueva', label: 'Crear Oferta Verificada', icon: PlusCircle },
    { href: '/admin/reportes', label: 'Denuncias Ciudadanas', icon: AlertOctagon },
    { href: '/admin/auditoria', label: 'Bitácora de Auditoría', icon: History },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between border-r border-slate-800">
      <div className="space-y-6">
        {/* Cabecera Sidebar */}
        <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-sm leading-tight">Panel Editorial</h2>
              <span className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">La Paz - El Alto</span>
            </div>
          </div>
        </div>

        {/* Perfil del Moderador */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-xs">
          <p className="text-slate-400">Sesión activa como:</p>
          <p className="text-white font-bold truncate">{userName}</p>
          <p className="text-slate-400 text-[11px] truncate">{userEmail}</p>
        </div>

        {/* Enlaces de Navegación */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pie Sidebar: Ir a la web pública y Cerrar Sesión */}
      <div className="pt-6 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          Ver Sitio Público
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión Segura
        </button>
      </div>
    </aside>
  );
};
