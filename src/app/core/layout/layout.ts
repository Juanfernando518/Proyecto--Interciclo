import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule,Footer],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true
})
export class Layout {
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
