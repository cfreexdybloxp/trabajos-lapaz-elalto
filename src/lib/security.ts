import crypto from 'crypto';

/**
 * Limpia y sanitiza strings para evitar inyecciones XSS y caracteres de control
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Elimina etiquetas HTML potencialmente peligrosas
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Genera un hash irreversible de una IP para control de spam sin vulnerar la privacidad
 */
export function hashIp(ip: string): string {
  const salt = process.env.ADMIN_JWT_SECRET || 'salt_seguro_bolivia';
  return crypto.createHash('sha256').update(`${ip}-${salt}`).digest('hex').substring(0, 16);
}

/**
 * Valida formato de correo electrónico
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valida formato de URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
