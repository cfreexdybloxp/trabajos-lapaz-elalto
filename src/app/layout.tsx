import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4ed8',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Trabajos en La Paz y El Alto | Ofertas Laborales Verificadas Bolivia',
    template: '%s | Trabajos La Paz y El Alto',
  },
  description: 'Encuentra ofertas de empleo reales en La Paz y El Alto, Bolivia. Filtra por zona, teleférico, trabajos sin experiencia, medio tiempo y pasantías. 100% gratuito y seguro.',
  keywords: [
    'empleos la paz bolivia',
    'trabajos el alto bolivia',
    'trabajo sin experiencia la paz',
    'pasantias la paz el alto',
    'trabajos medio tiempo la paz',
    'bolsa de trabajo bolivia',
    'convocatorias la paz 2026'
  ],
  authors: [{ name: 'TrabajosLP-EA Bolivia' }],
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: '/',
    siteName: 'Trabajos La Paz y El Alto',
    title: 'Empleos Reales y Verificados en La Paz y El Alto, Bolivia',
    description: 'Bolsa de trabajo verificada en el área metropolitana de La Paz y El Alto. Encuentra oportunidades sin experiencia, medio tiempo y convocatorias transparentes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <DisclaimerBanner />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
