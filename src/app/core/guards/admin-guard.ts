import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // CORRECCIÓN: Agregamos () para leer el valor de la señal
    const u = this.auth.currentUser(); 
    
    // Ahora 'u' ya es el objeto AppUser y TypeScript reconoce 'role'
    if (u?.role === 'admin') {
      return true;
    }
    
    this.router.navigate(['/']);
    return false;
  }
}