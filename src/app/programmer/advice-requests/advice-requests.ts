import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Advisory } from '../../core/models/models';
import { Observable, map, of } from 'rxjs';
import { FirestoreService } from '../../core/services/firestoreService';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-advisories',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante
  templateUrl: './advice-requests.html',
  styleUrls: ['./advice-requests.css']
})
export class AdviceRequests {
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);

  // Dos listas: Pendientes y Revisadas
  pending$: Observable<Advisory[]>;
  history$: Observable<Advisory[]>;

  // Para el modal de respuesta
  selectedAdvisory: Advisory | null = null;
  responseMessage = ''; // Comentario obligatorio al rechazar/aceptar

  constructor() {
    const user = this.authService.currentUser();
    
    if (user) {
      // Obtenemos TODAS las asesorías
      const all$ = this.firestoreService.getAdvisoriesForProgrammer(user.uid);

      // Filtramos las 'pending'
      this.pending$ = all$.pipe(
        map(list => list.filter(a => a.status === 'pending'))
      );

      // Filtramos las que ya NO son 'pending' (accepted/rejected)
      this.history$ = all$.pipe(
        map(list => list.filter(a => a.status !== 'pending'))
      );
    } else {
      this.pending$ = of([]);
      this.history$ = of([]);
    }
  }

  // Abrir modal para responder
  openResponse(advisory: Advisory) {
    this.selectedAdvisory = advisory;
    this.responseMessage = ''; // Limpiar mensaje
  }

  // Enviar la decisión
  async submitResponse(status: 'accepted' | 'rejected') {
    if (!this.selectedAdvisory?.id) return;
    
    if (!this.responseMessage.trim()) {
      alert('Por favor escribe un mensaje para el cliente.');
      return;
    }

    try {
      await this.firestoreService.updateAdvisoryStatus(
        this.selectedAdvisory.id,
        status,
        this.responseMessage
      );
      
      // Simulación de notificación [cite: 78-82]
      alert(`Solicitud ${status === 'accepted' ? 'APROBADA' : 'RECHAZADA'} correctamente.`);
      
      this.selectedAdvisory = null; // Cerrar modal
    } catch (error) {
      console.error(error);
      alert('Error al actualizar');
    }
  }
  getWhatsAppLink(advisory: Advisory): string {
    if (!advisory.clientPhone) return '#'; // Si no dio teléfono, no hace nada
    
    const text = `Hola ${advisory.clientName}, soy el programador. He ACEPTADO tu solicitud de asesoría sobre "${advisory.topic}". Nos vemos el ${new Date(advisory.dateRequest).toLocaleString()}.`;
    
    // Formato universal para WhatsApp Web/App
    return `https://wa.me/${advisory.clientPhone}?text=${encodeURIComponent(text)}`;
  }
  // GENERAR LINK DE CORREO (MAILTO)
  getMailLink(advisory: Advisory): string {
    const subject = `Confirmación de Asesoría: ${advisory.topic}`;
    const body = `Hola ${advisory.clientName},\n\nHe aceptado tu solicitud de asesoría para la fecha: ${new Date(advisory.dateRequest).toLocaleString()}.\n\nSaludos cordiales.`;
    
    return `mailto:${advisory.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
