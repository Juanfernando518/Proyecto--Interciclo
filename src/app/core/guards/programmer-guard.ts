import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const programmerGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. Obtenemos el usuario de la señal
  const user = auth.currentUser();

  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 2. LIMPIEZA DE ROL (Igual que hicimos con el Admin)
  // Convierte "[ROLE_PROGRAMADOR]" -> "PROGRAMADOR"
  const rolLimpio = String(user.rol || '')
                      .replace('ROLE_', '')
                      .replace('[', '')
                      .replace(']', '')
                      .toUpperCase()
                      .trim();

  console.log('💻 ProgrammerGuard revisando:', rolLimpio);

  // 3. VERIFICACIÓN ESTRICTA
  if (rolLimpio === 'PROGRAMADOR') {
    return true; // ¡Pase, colega!
  } else {
    console.warn(`⛔ Acceso denegado a zona Programador. Tu rol es: ${rolLimpio}`);
    // Si no es programador, lo mandamos al home o a su dashboard correspondiente
    router.navigate(['/']); 
    return false;
  }
};