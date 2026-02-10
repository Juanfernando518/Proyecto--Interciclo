import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { ApiBackendService } from '../../services/api-backend';
import { Footer } from "../../components/footer/footer";
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private api = inject(ApiBackendService);
  public authService = inject(AuthService);

  programadores: any[] = [];
  loading = true;
  // 3. VARIABLES PARA CONTROLAR LA VISTA
  isLoggedIn = false;
  userRole: string | null = null;

  ngOnInit() {
    this.cargarExpertos();
    this.verificarSesion();
  }
// 4. NUEVA FUNCIÓN PARA CHECKEAR EL ESTADO
  verificarSesion() {
    const user = this.authService.currentUser(); // Asumo que tienes este método signal/getter
    if (user) {
      this.isLoggedIn = true;
      this.userRole = user.rol; // Asumo que tu usuario tiene la propiedad 'rol'
    } else {
      this.isLoggedIn = false;
      this.userRole = null;
    }
  }
  cargarExpertos() {
    // CORRECCIÓN: El método es obtenerExpertos
    this.api.obtenerExpertos().subscribe({
      next: (data: any) => {
        this.programadores = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error cargando expertos:', err);
        this.loading = false;
      }
    });
  }
  // En home.ts
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}