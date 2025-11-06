import type { MiddlewareHandler } from 'astro';
import { getSession } from '../lib/supabase';

export const authMiddleware: MiddlewareHandler = async ({ request, redirect, cookies }, next) => {
  const url = new URL(request.url);

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/admin'];

  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route =>
    url.pathname.startsWith(route)
  );

  console.log('[MIDDLEWARE] Ruta:', url.pathname);
  console.log('[MIDDLEWARE] ¿Es ruta protegida?', isProtectedRoute);

  if (isProtectedRoute) {
    try {
      // Nota: Este middleware corre en el servidor durante SSR
      // La sesión de Supabase se almacena en localStorage del cliente
      // Por lo tanto, este check solo funciona si hay cookies de sesión

      // Verificar si hay una sesión válida
      const session = await getSession();

      console.log('[MIDDLEWARE] Sesión encontrada:', !!session);

      if (!session) {
        console.log('[MIDDLEWARE] No hay sesión, permitiendo paso (verificación client-side)');
        // Permitir el paso - la verificación real se hace client-side en admin.astro
        // Esto es necesario porque Supabase guarda la sesión en localStorage
        return next();
      }
    } catch (error) {
      console.error('[MIDDLEWARE] Error verificando sesión:', error);
      // En caso de error, permitir el paso y dejar que admin.astro maneje la verificación
      return next();
    }
  }

  return next();
};
