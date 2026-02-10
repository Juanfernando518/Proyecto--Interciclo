import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiBackendService } from '../../services/api-backend';

@Component({
  selector: 'app-programmer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programmer-profile.html',
  styleUrls: ['./programmer-profile.css']
})
export class ProfileComponent implements OnInit {
  private api = inject(ApiBackendService);

  usuario: any = {};
  mensaje = '';
  loading = false;

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // CORRECCIÓN: El método es obtenerPerfil
    this.api.obtenerPerfil().subscribe({
      next: (data) => this.usuario = data,
      error: (err) => console.error('Error cargando perfil:', err)
    });
  }

  guardarCambios() {
    this.loading = true;
    this.mensaje = '';

    this.api.actualizarPerfil(this.usuario).subscribe({
      next: (res) => {
        this.loading = false;
        this.mensaje = '✅ ¡Perfil actualizado correctamente!';
        this.usuario = res;
      },
      error: (err) => {
        this.loading = false;
        this.mensaje = '❌ Error al actualizar. Intenta de nuevo.';
      }
    });
  }
}