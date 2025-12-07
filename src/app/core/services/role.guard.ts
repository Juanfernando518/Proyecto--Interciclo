import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';



export const RoleGuard = (requiredRole: 'admin' | 'programmer'): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const user = auth.currentUser();
    const loading = auth.loading();

    if (loading) return false;

    if (!user) {
      router.navigate(['/auth/login']);
      return false;
    }

    // Admin puede entrar a todo
    if (user.role === 'admin') return true;

    // Un usuario normal no puede ir a zonas restringidas
    if (user.role !== requiredRole) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
};
