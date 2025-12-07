import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const programmerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectamos el servicio
  const router = inject(Router);

  // Leemos la Signal ejecutándola con paréntesis ()
  const user = authService.currentUser();

  if (user && user.role === 'programmer') {
    return true;
  }

  // Si no es programador, lo mandamos al home o login
  router.navigate(['/']);
  return false;
};