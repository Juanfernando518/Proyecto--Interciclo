import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // CORRECCIÓN: Leemos la Signal 'currentUser()'
    // Si currentUser() devuelve un usuario (objeto), es true. Si es null, es false.
    if (this.auth.currentUser()) {
      return true;
    }
    
    // Si no está logueado, lo mandamos al login
    this.router.navigate(['/auth/login']);
    return false;
  }
}