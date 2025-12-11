import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  authService = inject(AuthService);
  private router = inject(Router);

  // Controla si el menú lateral está abierto en móvil
  isSidebarOpen = signal(false);

  // Obtener usuario actual (Signal)
  currentUser = this.authService.currentUser;

  toggleSidebar() {
    this.isSidebarOpen.update(val => !val);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  async logout() {
    if (confirm('¿Cerrar sesión?')) {
      await this.authService.logout();
      this.closeSidebar();
    }
  }

  // Obtener inicial del correo para el avatar
  get initial(): string {
    return this.currentUser()?.email?.charAt(0).toUpperCase() || '?';
  }
}