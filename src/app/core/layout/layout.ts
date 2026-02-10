import { Component, inject, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  rol: string = '';

  constructor() {
    // Escuchamos cambios en el usuario al instante
    effect(() => {
      const user = this.authService.currentUser();
      
      if (user && user.rol) {
        // Limpiamos el rol igual que en el Guard
        this.rol = String(user.rol)
                    .replace('ROLE_', '')
                    .replace('[', '')
                    .replace(']', '')
                    .toUpperCase()
                    .trim();
        console.log('Layout actualizó rol a:', this.rol);
      } else {
        this.rol = '';
      }
    });
  }

 logout() {
    this.authService.logout();
    this.rol = ''; // <--- CORRECCIÓN: String vacío en vez de null
    this.router.navigate(['/']); 
  }
}