import { Component, inject, signal, computed } from '@angular/core'; // <--- OJO: Importamos 'computed'
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

  isSidebarOpen = signal(false);
  
  // Usamos el signal original
  currentUser = this.authService.currentUser;

  // --- SOLUCIÓN: SIGNAL COMPUTADO (Reacciona automáticamente) ---
  
  // Detecta si es Programador
  isProgrammer = computed(() => {
    const user = this.currentUser() as any; // <--- TRUCO: Lo convertimos a 'any'
    if (!user) return false;

    console.log('--- DEBUG NAVBAR ---');
    console.log('Usuario:', user);
    console.log('Rol detectado:', user.role || user.rol);
    
    // Leemos 'role' (inglés) o 'rol' (español)
    const role = user.role || user.rol;
    
    // Comparamos convirtiendo a mayúsculas para asegurar
    return role?.toString().toUpperCase() === 'PROGRAMADOR' || 
           role?.toString().toUpperCase() === 'PROGRAMMER';
  });

  // Detecta si es Admin
  isAdmin = computed(() => {
    const user = this.currentUser() as any;
    if (!user) return false;
    const role = user.role || user.rol;
    return role?.toString().toUpperCase() === 'ADMIN';
  });

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
}