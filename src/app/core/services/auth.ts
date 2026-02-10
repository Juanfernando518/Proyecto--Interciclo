import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // 1. SEÑALES (Signals) NECESARIAS
  // 'currentUser': Para saber quién está logueado
  // 'loading': Para que los Guards esperen si es necesario (ESTA FALTABA)
  currentUser = signal<any>(this.getUserFromStorage());
  loading = signal<boolean>(false); 

  constructor() {}

  // Recuperar usuario del localStorage al iniciar la app
  private getUserFromStorage() {
    const userStr = localStorage.getItem('usuario');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  }

  // 2. LOGIN (Actualiza la señal al instante)
  loginSuccess(token: string, usuario: any) {
    this.loading.set(true); // Activamos carga
    
    // Guardamos Token
    localStorage.setItem('token', token);
    
    // Limpieza de Rol por si acaso venga sucio del backend
    if (usuario && usuario.rol) {
       usuario.rol = String(usuario.rol)
                      .replace('ROLE_', '')
                      .replace('[', '')
                      .replace(']', '')
                      .toUpperCase()
                      .trim();
    }

    // Guardamos Usuario
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    // Actualizamos la señal
    this.currentUser.set(usuario);
    this.loading.set(false); // Desactivamos carga
  }

  // 3. LOGOUT
  logout() {
    localStorage.clear(); // Borra todo
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  // 4. Helper para obtener el rol limpio (útil para los Guards)
  getRole(): string {
    const user = this.currentUser();
    return user?.rol || '';
  }
}