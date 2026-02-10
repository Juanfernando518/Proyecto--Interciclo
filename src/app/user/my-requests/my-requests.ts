import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Agregado por si usas el link en el HTML
// CORRECCIÓN 1: Quitamos el ".service" del import
import { ApiBackendService } from '../../services/api-backend';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
// CORRECCIÓN 2: Aseguramos que la clase se llame MyRequestsComponent
export class MyRequestsComponent implements OnInit {
  private api = inject(ApiBackendService);

  // CORRECCIÓN 3: La variable se debe llamar 'solicitudes' para coincidir con tu HTML
  solicitudes: any[] = [];
  loading = true;

  ngOnInit() {
    this.cargarMisSolicitudes();
  }

  cargarMisSolicitudes() {
    // CORRECCIÓN 4: Agregamos ': any' para evitar el error TS7006
    this.api.misCitas().subscribe({
      next: (data: any) => {
        console.log('Mis solicitudes:', data);
        this.solicitudes = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }
}