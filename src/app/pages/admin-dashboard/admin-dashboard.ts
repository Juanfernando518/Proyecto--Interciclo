import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBackendService } from '../../services/api-backend';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiBackendService);
  private http = inject(HttpClient); // Inyectamos HttpClient

  stats: any = { totalUsuarios: 0, totalCitas: 0, totalProgramadores: 0 };
  usuarios: any[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.obtenerStats().subscribe(data => this.stats = data);
    this.api.obtenerTodosUsuarios().subscribe(data => this.usuarios = data);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar usuario definitivamente?')) {
      this.api.eliminarUsuario(id).subscribe({
        next: () => this.cargarDatos(), // Recargamos para ver cambios
        error: () => alert('Error al eliminar')
      });
    }
  }

  // --- LÓGICA DE ASCENSOS ---

  ascender(user: any) {
    let nuevoRol = '';
    
    if (user.rol === 'USUARIO') nuevoRol = 'PROGRAMADOR';
    else if (user.rol === 'PROGRAMADOR') nuevoRol = 'ADMIN';
    else return; // Ya es Admin, no sube más

    if (confirm(`¿Ascender a ${user.nombre} a rango ${nuevoRol}?`)) {
      this.actualizarRol(user, nuevoRol);
    }
  }

  descender(user: any) {
    let nuevoRol = '';

    if (user.rol === 'ADMIN') nuevoRol = 'PROGRAMADOR';
    else if (user.rol === 'PROGRAMADOR') nuevoRol = 'USUARIO';
    else return; // Ya es usuario, no baja más

    if (confirm(`¿Degradar a ${user.nombre} a rango ${nuevoRol}?`)) {
      this.actualizarRol(user, nuevoRol);
    }
  }

  private actualizarRol(user: any, rol: string) {
    this.api.cambiarRolUsuario(user.id, rol).subscribe({
      next: () => {
        user.rol = rol; // Actualizamos en pantalla
        alert(`✅ Rol cambiado a ${rol}`);
        this.cargarDatos(); // Recargar estadísticas
      },
      error: () => alert('❌ Error al cambiar rol')
    });
  
  }
  // ==========================================
  // 📄 CORRECCIÓN AQUÍ (Descargar PDF)
  // ==========================================
  descargarReporte() {
    // 🔥 CAMBIO VITAL: Usamos la URL de Render, NO localhost
    const url = 'https://backend-portafolio-pes5.onrender.com/api/admin/reportes/usuarios/pdf';

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = 'Reporte_Usuarios_DevPortfolio.pdf'; 
        
        link.click();
        
        window.URL.revokeObjectURL(urlBlob);
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
        alert('No tienes permisos o el servidor no responde.');
      }
    });
  }
}