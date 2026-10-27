# Trabajos La Paz & El Alto (Bolivia)
Plataforma web de empleo rápida, verificada y comunitaria para el área metropolitana de La Paz y El Alto.

## Características
- **Buscador con multifiltros**: Búsqueda por palabra clave, ciudad (La Paz / El Alto), zonas urbanas, categoría, jornada, modalidad y experiencia.
- **Foco en Primer Empleo**: Secciones destacadas para puestos sin experiencia y pasantías universitarias (UMSA, UPEA, institutos).
- **Alineada a la Ley N.º 263**: 100% gratuita para postulantes, prevención activa contra fraudes laborales y botón de denuncia inmediata.
- **SEO Técnico Completo**: Datos estructurados Google `JobPosting` (JSON-LD), Sitemap XML dinámico y Robots.txt.
- **Panel Administrativo Protegido**: Gestión de ofertas, empresas, control de vigencia, atención de reportes y bitácora de auditoría.
- **Coste 0 Bs**: Construido con Next.js 14, Tailwind CSS, Prisma ORM y SQLite (listo para desplegar gratis en Vercel).

## Ejecución Rápida en Desarrollo
```bash
# 1. Instalar dependencias
npm install

# 2. Generar cliente y base de datos
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# 3. Iniciar servidor local
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) en tu navegador.
Para ingresar al panel administrativo: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Para consultar todos los detalles de operación, consulta el documento [MANUAL_DEL_PROPIETARIO.md](./MANUAL_DEL_PROPIETARIO.md).
