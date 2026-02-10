import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth'; // Ajusta la ruta a tu auth.ts

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. Obtenemos el usuario de la SEÑAL (Signal)
  const user = auth.currentUser();
  
  // 2. Debug en consola para que veas qué pasa
  console.log('🔍 AdminGuard revisando usuario:', user);

  if (!user) {
    console.warn('⛔ Acceso denegado: No hay usuario logueado');
    router.navigate(['/auth/login']);
    return false;
  }

  // 3. LIMPIEZA DE ROL (Crucial para que funcione)
  // Convertimos "[ROLE_ADMIN]" o "ADMIN" a simplemente "ADMIN"
  const rolLimpio = String(user.rol || '')
                      .replace('ROLE_', '')
                      .replace('[', '')
                      .replace(']', '')
                      .toUpperCase()
                      .trim();

  console.log('✅ Rol detectado:', rolLimpio);

  // 4. VERIFICACIÓN
  if (rolLimpio === 'ADMIN') {
    return true; // ¡Pase usted!
  } else {
    console.error(`⛔ Acceso denegado. Se requiere ADMIN, tienes: ${rolLimpio}`);
    router.navigate(['/']); // Te devuelve al home
    return false;
  }
};