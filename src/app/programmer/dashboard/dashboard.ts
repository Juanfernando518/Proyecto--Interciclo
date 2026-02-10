import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBackendService } from '../../services/api-backend';

@Component({
  selector: 'app-programmer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private api = inject(ApiBackendService);

  // Estadísticas
  stats = {
    total: 0,
    pendientes: 0,
    aceptadas: 0,
    ganancias: 0 // Simularemos un precio por cita
  };

  citasRecientes: any[] = [];
  loading = true;

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.obtenerCitasRecibidas().subscribe({
      next: (data) => {
        this.procesarEstadisticas(data);
        this.loading = false;
      },
      error: (e) => {
        console.error('Error cargando dashboard:', e);
        this.loading = false;
      }
    });
  }

  procesarEstadisticas(citas: any[]) {
    this.stats.total = citas.length;
    
    // Filtramos por estado
    this.stats.pendientes = citas.filter(c => c.estado === 'PENDIENTE').length;
    this.stats.aceptadas = citas.filter(c => c.estado === 'ACEPTADA' || c.estado === 'FINALIZADA').length;
    
    // Calculamos ganancia simulada ($20 por cita aceptada)
    this.stats.ganancias = this.stats.aceptadas * 20;

    // Tomamos las últimas 5 para la tabla
    this.citasRecientes = citas.slice(0, 5); 
  }
}