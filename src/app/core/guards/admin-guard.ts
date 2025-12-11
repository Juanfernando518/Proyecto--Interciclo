import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.loading).pipe(
    // 1. Esperamos a que loading sea falso
    filter(loading => !loading),
    take(1),
    map(() => {
      const user = auth.currentUser();
      
      console.log('🛡️ AdminGuard revisando:', user); // LOG DE CONTROL

      // Validamos si existe Y si el rol es admin
      if (user && user.role === 'admin') {
        console.log('✅ Acceso concedido: Eres Admin');
        return true;
      }

      console.warn('⛔ Acceso denegado. Tu rol es:', user?.role);
      router.navigate(['/']);
      return false;
    })
  );
};