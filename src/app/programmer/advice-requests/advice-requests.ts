import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBackendService } from '../../services/api-backend';

@Component({
  selector: 'app-advice-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advice-requests.html',
  styleUrls: ['./advice-requests.css']
})
export class AdviceRequests implements OnInit {
  private api = inject(ApiBackendService);

  solicitudes: any[] = [];
  loading = true;

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    // 🔥 CORRECCIÓN: Usamos el nombre unificado 'obtenerCitasRecibidas'
    this.api.obtenerCitasRecibidas().subscribe({
      next: (data: any) => {
        this.solicitudes = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error cargando citas:', err);
        this.loading = false;
      }
    });
  }

  responder(id: number, estado: 'ACEPTADA' | 'RECHAZADA') {
    // Convertimos el texto para el mensaje (opcional, solo visual)
    const accion = estado === 'ACEPTADA' ? 'aceptar' : 'rechazar';
    
    if (!confirm(`¿Estás seguro de ${accion} esta solicitud?`)) return;

    this.api.responderCita(id, estado).subscribe({
      next: () => {
        alert(`Solicitud ${estado} correctamente.`);
        this.cargarSolicitudes(); // Recargamos la lista
      },
      error: (e) => {
        console.error(e);
        alert('Error al procesar la respuesta. Intenta de nuevo.');
      }
    });
  }

  // --- GENERADOR DE LINK DE WHATSAPP ---
  getWhatsAppLink(cita: any): string {
    if (!cita.celular) return '#';

    const nombre = cita.cliente?.nombre || 'Hola';
    const tema = cita.tema;
    let mensaje = '';

    // Lógica para pre-llenar el mensaje según el estado
    if (cita.estado === 'ACEPTADA') {
      mensaje = `Hola ${nombre}, he aceptado tu solicitud de asesoría sobre "${tema}". ¿Cuándo podemos coordinar los detalles? 🚀`;
    } else if (cita.estado === 'RECHAZADA') {
      mensaje = `Hola ${nombre}, gracias por contactarme. Lamentablemente no puedo tomar tu solicitud sobre "${tema}" en este momento. Disculpa las molestias. 🙏`;
    } else {
      // Mensaje por defecto si está pendiente
      mensaje = `Hola ${nombre}, recibí tu solicitud sobre "${tema}".`;
    }

    return `https://wa.me/${cita.celular}?text=${encodeURIComponent(mensaje)}`;
  }
}