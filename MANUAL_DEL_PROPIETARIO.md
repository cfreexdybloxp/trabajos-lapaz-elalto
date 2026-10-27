# MANUAL COMPLETO DEL PROPIETARIO
## Plataforma Web de Empleo para La Paz y El Alto, Bolivia

Bienvenido al manual oficial de operación, mantenimiento y publicación de tu plataforma web de empleos. Este documento está redactado de manera clara y directa, pensado para que cualquier persona —incluso con conocimientos básicos de informática— pueda administrar la plataforma con total autonomía y seguridad.

---

### ÍNDICE DE CONTENIDOS
1. [¿Qué se construyó?](#1-qué-se-construyó)
2. [Estructura del Proyecto](#2-estructura-del-proyecto)
3. [Requisitos previos del sistema](#3-requisitos-previos-del-sistema)
4. [Instalación de dependencias](#4-instalación-de-dependencias)
5. [Cómo iniciar, detener y reiniciar el servidor local](#5-cómo-iniciar-detener-y-reiniciar-el-servidor-local)
6. [Cómo probar todas las funciones paso a paso](#6-cómo-probar-todas-las-funciones-paso-a-paso)
7. [Variables de Entorno y Configuración de Seguridad](#7-variables-de-entorno-y-configuración-de-seguridad)
8. [Gestión de la Base de Datos (SQLite / Prisma)](#8-gestión-de-la-base-de-datos-sqlite--prisma)
9. [Cómo añadir, aprobar y retirar ofertas](#9-cómo-añadir-aprobar-y-retirar-ofertas)
10. [Procedimiento ante denuncias ciudadanas y fraudes (Ley 263)](#10-procedimiento-ante-denuncias-ciudadanas-y-fraudes-ley-263)
11. [SEO Técnico: Google Search Console, Sitemap y Datos Estructurados](#11-seo-técnico-google-search-console-sitemap-y-datos-estructurados)
12. [Cómo publicar la web en internet (Hosting Gratuito 0 Bs)](#12-cómo-publicar-la-web-en-internet-hosting-gratuito-0-bs)
13. [Copias de Seguridad (Backups) y Restauración](#13-copias-de-seguridad-backups-y-restauración)
14. [Solución a los Errores Más Habituales](#14-solución-a-los-errores-más-habituales)
15. [Acciones que requieren intervención manual del propietario](#15-acciones-que-requieren-intervención-manual-del-propietario)
16. [Control de Costes y Servicios Futuros](#16-control-de-costes-y-servicios-futuros)
17. [Obligaciones Legales Pendientes en Bolivia](#17-obligaciones-legales-pendientes-en-bolivia)

---

### 1. ¿Qué se construyó?

Una plataforma web integral, rápida y optimizada para dispositivos móviles (teléfonos Android, tabletas y computadoras) que conecta a quienes buscan trabajo en **La Paz** y **El Alto** con convocatorias reales, auditadas y 100% gratuitas.

#### Características Clave:
- **Buscador Inteligente con Filtros Cruzados:** Búsqueda por palabra clave, ciudad (La Paz / El Alto), zonas urbanas (Centro, Sopocachi, Miraflores, Zona Sur, El Alto Ceja, 16 de Julio, Satélite, Villa Adela, Río Seco, etc.), categoría laboral, jornada (tiempo completo, medio tiempo), modalidad (presencial, híbrida, remota) y nivel de experiencia.
- **Sección Prioritaria "Sin Experiencia" y "Pasantías":** Acceso rápido para bachilleres, estudiantes de UMSA, UPEA, EMI, UCB e institutos técnicos.
- **Sellos de Verificación Transparentes:** Distingue entre *Empresa Verificada* (con NIT y canal oficial), *Convocatoria Oficial* (instituciones públicas) y *Revisión Editorial* (contacto validado por moderación humana).
- **Protección contra Fraudes y Estafas (Ley N.º 263):** Banner preventivo permanente, advertencia de costo 0 para el trabajador y botón de denuncia inmediata en cada vacante.
- **Panel Administrativo Protegido:** Acceso seguro con contraseña encriptada (bcrypt) y cookies HTTP-Only para moderar, crear ofertas, revisar reportes y auditar acciones.
- **SEO Técnico y Google Jobs:** Datos estructurados `JobPosting` (JSON-LD) en páginas individuales, sitemap dinámico y robots.txt.

---

### 2. Estructura del Proyecto

```
webtrabajoAntigraviti/
├── .env                        # Variables locales (claves y base de datos)
├── .env.example                # Plantilla de ejemplo sin contraseñas
├── prisma/
│   ├── schema.prisma           # Estructura de las tablas de datos
│   ├── seed.ts                 # Datos iniciales verificados para La Paz y El Alto
│   └── dev.db                  # Base de datos SQLite local
├── src/
│   ├── app/                    # Páginas y rutas de la aplicación (Next.js)
│   │   ├── page.tsx            # Portada principal
│   │   ├── empleos/            # Buscador general y [id] para detalle de vacante
│   │   ├── empleos-la-paz/     # Sección especializada La Paz
│   │   ├── empleos-el-alto/    # Sección especializada El Alto
│   │   ├── sin-experiencia/    # Sección de primer empleo
│   │   ├── medio-tiempo/       # Sección de media jornada
│   │   ├── pasantias/          # Sección de prácticas universitarias
│   │   ├── categorias/         # Directorio de sectores profesionales
│   │   ├── publicar-oferta/    # Formulario público de envío de convocatorias
│   │   ├── consejos/           # Guía de CV y prevención de estafas
│   │   ├── sobre-nosotros/     # Metodología de verificación
│   │   ├── denunciar/          # Procedimiento formal de denuncia
│   │   ├── contacto/           # Canales de comunicación
│   │   ├── privacidad/         # Política de protección de datos personales
│   │   ├── terminos/           # Términos legales de uso
│   │   ├── sitemap.ts          # Generador del Sitemap XML
│   │   ├── robots.ts           # Control de rastreo para Googlebot
│   │   ├── not-found.tsx       # Página 404 personalizada
│   │   ├── admin/              # Panel administrativo privado (login, dashboard, ofertas, reportes)
│   │   └── api/                # Servicios de backend (empleos, reportes, auth, stats)
│   ├── components/             # Componentes visuales reutilizables
│   └── lib/                    # Lógica de seguridad, base de datos y SEO
```

---

### 3. Requisitos previos del sistema

Para ejecutar la plataforma en tu computadora solo requieres:
1. **Node.js**: Versión 18, 20, 22 o 24 instalada (comprobar con `node -v` en la terminal).
2. **Git**: Para control de versiones (comprobar con `git --version`).
3. **Navegador Web**: Chrome, Edge, Firefox o Brave.

---

### 4. Instalación de dependencias

Si clonas el repositorio en una nueva máquina, abre la terminal (PowerShell o CMD) en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Luego inicializa la base de datos local y su cliente:

```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

---

### 5. Cómo iniciar, detener y reiniciar el servidor local

#### A. Iniciar el servidor de desarrollo
En la terminal, dentro de la carpeta del proyecto, ejecuta:
```bash
npm run dev
```
La terminal mostrará:
```
  ▲ Next.js 14.2.15
  - Local:        http://localhost:3000
```
Abre tu navegador e ingresa a: **`http://localhost:3000`**

#### B. Cómo detener el servidor
En la ventana de la terminal donde está corriendo, presiona:
`Ctrl + C` (y confirma con `S` o `Y` si te lo solicita).

#### C. Cómo reiniciar el servidor
Detén el proceso con `Ctrl + C` y vuelve a escribir:
```bash
npm run dev
```

---

### 6. Cómo probar todas las funciones paso a paso

1. **Búsqueda General:**
   - En la portada, escribe una palabra como "Cajero" o "Operario" y pulsa **Buscar**.
   - Observa cómo se listan las ofertas coincidentes con sus badges de verificación.
2. **Combinación de Filtros:**
   - Entra a `/empleos`.
   - Selecciona "El Alto" en ciudad y filtra por experiencia "Sin experiencia".
   - Verás cómo la lista se actualiza instantáneamente.
   - Pulsa "Limpiar filtros" para restablecer la vista.
3. **Postulación a una Oferta:**
   - Haz clic en cualquier oferta (ej. *Cajero en Banco FIE* o *Operario en Industrias Venado*).
   - Revisa los requisitos, los datos de procedencia y haz clic en el botón de postulación (abrirá el cliente de correo, WhatsApp o enlace directo correspondiente).
4. **Prueba de Denuncia Ciudadana:**
   - En la ficha de detalle, pulsa *¿Piden dinero o detectaste irregularidades? Reportar aquí*.
   - Selecciona un motivo (ej: *Piden dinero*), escribe un texto breve y pulsa **Enviar Denuncia**.
5. **Acceso al Panel de Administración:**
   - Ve a `http://localhost:3000/admin/login`.
   - Ingresa:
     - **Correo:** `admin@empleos-lapaz-elalto.bo`
     - **Contraseña:** `AdminSeguro2026!LaPaz`
   - Ingresarás al **Dashboard Administrativo**, donde verás las métricas, las ofertas pendientes y la denuncia que acabas de enviar.
6. **Aprobar o Retirar una Oferta:**
   - En `/admin/ofertas`, pulsa "Aprobar" en una oferta pendiente, o "Vencida" para darla de baja. Comprueba que el cambio se refleje en la web pública.

---

### 7. Variables de Entorno y Configuración de Seguridad

El archivo `.env` almacena las configuraciones sensibles del sistema. **Nunca compartas este archivo en chats públicos ni lo subas a GitHub**.

```env
NODE_ENV="development"
PORT=3000
DATABASE_URL="file:./dev.db"

# Clave secreta para firmar sesiones administrativas (mínimo 32 caracteres)
ADMIN_JWT_SECRET="bolivia_empleos_secret_token_seguro_la_paz_el_alto_2026_super_key"

# Credenciales iniciales
INITIAL_ADMIN_EMAIL="admin@empleos-lapaz-elalto.bo"
INITIAL_ADMIN_PASSWORD="AdminSeguro2026!LaPaz"

# Dominio público para Sitemap y enlaces canonicals
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Importante para Producción:** Cuando publiques tu web en Vercel o tu hosting definitivo, cambia `ADMIN_JWT_SECRET` por una clave aleatoria y `NEXT_PUBLIC_SITE_URL` por tu dominio real (ej: `https://empleoslapazelalto.bo` o `https://tu-proyecto.vercel.app`).

---

### 8. Gestión de la Base de Datos (SQLite / Prisma)

La base de datos actual utiliza **SQLite** almacenada en el archivo `prisma/dev.db`. No requiere instalar MySQL, PostgreSQL ni configurar servidores externos mientras trabajas en local.

#### Herramienta visual de base de datos (Prisma Studio)
Puedes ver y editar toda la base de datos visualmente ejecutando:
```bash
npx prisma studio
```
Se abrirá automáticamente en tu navegador en `http://localhost:5555`, permitiéndote inspeccionar tablas, registros, usuarios y reportes como si fuera una hoja de Excel.

---

### 9. Cómo añadir, aprobar y retirar ofertas

#### Método 1: Creación directa desde el Panel Administrativo
1. Entra a `/admin/ofertas/nueva`.
2. Llena los datos de la vacante, selecciona la ciudad (La Paz o El Alto), la zona y el **Sello de Verificación** correspondiente.
3. Pulsa **Publicar Inmediatamente**. La oferta aparecerá activa en la web al instante.

#### Método 2: Revisión de propuestas ciudadanas
1. Los empleadores pueden enviar ofertas desde el formulario público `/publicar-oferta`.
2. Estas ofertas quedan en estado **PENDIENTE** (no se muestran al público).
3. Entra a `/admin/dashboard` o `/admin/ofertas`, revisa los datos de contacto y si son válidos, pulsa **Aprobar**.

#### Cómo marcar una oferta como Vencida
1. Cuando venza el plazo o la empresa informe que el puesto fue cubierto, ve a `/admin/ofertas`.
2. Pulsa el botón **Vencida**.
3. La vacante dejará de mostrarse en las búsquedas activas y en caso de que alguien acceda a su enlace directo, verá un aviso claro de que la vacante ha concluido, retirando además los datos enriquecidos de Google.

---

### 10. Procedimiento ante denuncias ciudadanas y fraudes (Ley 263)

La **Ley N.º 263 de Bolivia** prohíbe terminantemente el cobro a los postulantes.
1. Revisa diariamente la sección `/admin/reportes`.
2. Si un postulante denuncia que una vacante solicita dinero, depósitos bancarios, cobro de carpetas o citas en lugares sospechosos:
   - Haz clic en **Retirar Oferta Inmediatamente**.
   - El sistema cambiará el estado a `RETIRADA`, la eliminará de las búsquedas públicas y registrará la acción en la bitácora de auditoría.
   - Si se trata de un intento grave de estafa masiva o trata, remite los datos de contacto a la **División de Trata y Tráfico de la FELCC** (Calle Sucre esq. Bolívar en La Paz o Av. Raúl Salmón en El Alto).

---

### 11. SEO Técnico: Google Search Console, Sitemap y Datos Estructurados

La web ya tiene implementadas todas las directrices oficiales de **Google Search Central**:

#### A. Marcado Estructurado `JobPosting`
Cada página individual (`/empleos/[id]`) genera automáticamente el esquema JSON-LD requerido por Google Jobs con los campos: `title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization` y `jobLocation`.
- Puedes verificarlo copiando la URL de cualquier oferta en la herramienta oficial: [Prueba de Resultados Enriquecidos de Google](https://search.google.com/test/rich-results).

#### B. Sitemap XML Dinámico
Tu mapa del sitio se genera automáticamente en tiempo real en:
`http://localhost:3000/sitemap.xml` (o tu dominio `/sitemap.xml`).
Contiene todas las páginas principales y cada una de las ofertas vigentes.

#### C. Pasos para Google Search Console (Cuando publiques la web):
1. Ingresa a [Google Search Console](https://search.google.com/search-console).
2. Añade tu propiedad (ej: `https://tu-proyecto.vercel.app`).
3. Ve a la sección **Sitemaps** en el menú izquierdo.
4. Escribe `sitemap.xml` y haz clic en **Enviar**.
5. Google comenzará a rastrear e indexar tus vacantes automáticamente.

---

### 12. Cómo publicar la web en internet (Hosting Gratuito 0 Bs)

Recomendamos publicar en **Vercel**, el proveedor oficial de Next.js, que ofrece un plan gratuito permanente (Hobby Tier) ideal para este proyecto:

#### Pasos para Despliegue en Vercel:
1. Crea una cuenta gratuita en [Vercel.com](https://vercel.com) (puedes registrarte con tu cuenta de GitHub o correo).
2. Sube tu código a un repositorio privado de [GitHub.com](https://github.com).
3. En Vercel, haz clic en **"Add New Project"** e importa tu repositorio.
4. En la sección **Environment Variables**, añade:
   - `ADMIN_JWT_SECRET`: (Tu clave secreta larga)
   - `NEXT_PUBLIC_SITE_URL`: `https://tu-proyecto.vercel.app`
5. Si deseas mantener la base de datos en la nube sin costo (0 Bs), puedes vincular **Turso** (SQLite serverless gratuito) o **Neon / Supabase** (PostgreSQL gratuito) cambiando únicamente la variable `DATABASE_URL`.
6. Haz clic en **Deploy**. En 2 minutos tendrás tu web online con certificado SSL gratuito (HTTPS).

---

### 13. Copias de Seguridad (Backups) y Restauración

#### Copia de seguridad de la base de datos local:
Simplemente copia el archivo `prisma/dev.db` y guárdalo en una carpeta segura o disco externo:
```bash
Copy-Item prisma/dev.db prisma/dev_backup_$(Get-Date -Format 'yyyyMMdd').db
```

#### Cómo restaurar la base de datos:
Si alguna vez necesitas volver a un estado anterior:
1. Detén el servidor (`Ctrl + C`).
2. Reemplaza `prisma/dev.db` con tu archivo de respaldo.
3. Inicia el servidor nuevamente con `npm run dev`.

---

### 14. Solución a los Errores Más Habituales

| Problema | Causa probable | Solución rápida |
| :--- | :--- | :--- |
| **El puerto 3000 está ocupado** | Otra aplicación está usando el puerto 3000. | Ejecuta `npm run dev -- -p 3001` para abrirlo en el puerto 3001. |
| **Error: Prisma Client not generated** | No se ha generado el cliente de base de datos. | Ejecuta `npx prisma generate`. |
| **No puedo entrar al panel administrativo** | Contraseña incorrecta o base de datos vacía. | Ejecuta `npx tsx prisma/seed.ts` para restablecer las credenciales iniciales. |
| **Error en despliegue: NEXT_PUBLIC_SITE_URL missing** | Falta la variable de entorno en Vercel. | Añade `NEXT_PUBLIC_SITE_URL` en los ajustes del proyecto en Vercel. |

---

### 15. Acciones que requieren intervención manual del propietario

Las siguientes tareas no pueden automatizarse y deben ser ejecutadas por ti:
1. **Cambio de Contraseña:** Modificar la clave de administrador predeterminada por una contraseña personal segura.
2. **Revisión Diaria de Convocatorias:** Dedicar 10 minutos al día a revisar las ofertas enviadas por empleadores y aprobar las legítimas.
3. **Atención de Denuncias:** Dar de baja vacantes denunciadas por la comunidad.
4. **Trámite de Dominio Propio (Opcional):** Si en el futuro deseas un dominio `.bo` (ej. `empleoslapaz.bo`), debes registrarlo ante NIC Bolivia (ADSIB), lo cual tiene un costo anual establecido por dicha entidad.

---

### 16. Control de Costes y Servicios Futuros

| Servicio | Proveedor | Coste Actual | ¿Cuándo podría generar coste? | Alternativa Gratuita |
| :--- | :--- | :--- | :--- | :--- |
| **Alojamiento Web** | Vercel Hobby | **0 Bs** | Si superas 100 GB de transferencia mensual (equivalente a cientos de miles de visitas). | Render Free / Netlify Free / Cloudflare Pages |
| **Base de Datos** | SQLite / Turso | **0 Bs** | Si superas 500 MB en almacenamiento de texto plano. | Supabase Free Tier |
| **Indexación Google** | Google Search Console | **0 Bs** | Gratuito indefinidamente por Google. | Bing Webmaster Tools |

---

### 17. Obligaciones Legales Pendientes en Bolivia

Antes de comercializar servicios (por ejemplo, cobrar a empresas por destacar anuncios) o realizar intermediación laboral activa, te aconsejamos consultar formalmente con el **Ministerio de Trabajo, Empleo y Previsión Social (MTEPS)** o un asesor legal los siguientes puntos:

1. **Régimen de Difusión vs. Agencia de Empleo:** Confirmar ante la Dirección General de Empleo del MTEPS que la operación como portal de difusión informativa no requiere licencia de agencia privada de empleo, siempre que no se cobren honorarios a los candidatos ni se administren contratos.
2. **Registro de Comercio (SEPREC):** En caso de constituir una empresa formal o percibir ingresos por publicidad privada en el futuro.
3. **Régimen Tributario (SIN):** Alta en el Servicio de Impuestos Nacionales para emisión de facturas si se ofrecen servicios de publicidad empresarial.
