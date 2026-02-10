import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Para el usuario normal, solo nos importa que exista el usuario
  if (auth.currentUser()) {
    return true;
  }

  // Si no está logueado, al login
  router.navigate(['/auth/login']);
  return false;
};