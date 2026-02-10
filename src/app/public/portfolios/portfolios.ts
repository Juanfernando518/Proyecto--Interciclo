import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiBackendService } from '../../services/api-backend';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './portfolios.html',
  styleUrls: ['./portfolios.css']
})
export class Portfolios implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiBackendService);
  public authService = inject(AuthService);

  programmer: any = null;
  projects: any[] = [];
  activeTab: 'projects' | 'advisory' = 'projects';

  showForm = false;
  topic = '';       
  dateRequest = ''; 
  clientPhone = ''; 

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const programmerId = Number(idParam);

    if (programmerId) {
      this.cargarDatos(programmerId);
    }

    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'advisory') {
        this.activeTab = 'advisory';
      } else {
        this.activeTab = 'projects';
      }
    });
  }

  cargarDatos(id: number) {
    this.api.obtenerUsuario(id).subscribe({
      next: (data: any) => this.programmer = data,
      error: (e: any) => console.error('Error cargando perfil:', e)
    });

    this.api.obtenerProyectosPorUsuario(id).subscribe({
      next: (data: any) => this.projects = data,
      error: (e: any) => console.error('Error cargando proyectos:', e)
    });
  }

  setTab(tab: 'projects' | 'advisory') {
    this.activeTab = tab;
  }

  requestAdvisory() {
    const currentUser = this.authService.currentUser();
    
    // 1. Validaciones básicas
    if (!currentUser) { 
        alert("Debes iniciar sesión para agendar una cita."); 
        return; 
    }

    if (!this.topic || !this.dateRequest || !this.clientPhone) {
      alert("Por favor completa el tema, la fecha y tu teléfono.");
      return;
    }

    // 2. Lógica del Teléfono (Nuevo)
    // Quitamos espacios y si empieza con '0', lo quitamos.
    let numeroLimpio = this.clientPhone.toString().replace(/\s/g, ''); 
    if (numeroLimpio.startsWith('0')) {
        numeroLimpio = numeroLimpio.substring(1);
    }
    // Agregamos el prefijo de Ecuador
    const numeroFinal = '593' + numeroLimpio;

    // 3. Formateo de Fecha (Para Java)
    let fechaFormateada = this.dateRequest; 
    if (fechaFormateada.length === 16) { // Si viene como "yyyy-MM-ddThh:mm"
        fechaFormateada += ":00"; // Le agregamos los segundos
    }

    // 4. Crear el objeto para enviar
    const nuevaCita = {
      programadorId: this.programmer.id,
      tema: this.topic,
      celular: numeroFinal, // Enviamos el número con 593
      fecha: fechaFormateada
    };

    // 5. Enviar al Backend
    this.api.solicitarAsesoria(nuevaCita).subscribe({
      next: (res: any) => {
        alert('¡Solicitud enviada con éxito! El experto te contactará por WhatsApp.');
        // Limpiamos el formulario
        this.topic = '';
        this.dateRequest = '';
        this.clientPhone = '';
        this.showForm = false; // Ocultamos el formulario
      },
      error: (err: any) => {
        console.error('Error en el servidor:', err);
        alert('Error al agendar. Verifica los datos e intenta nuevamente.');
      }
    });
  }

  getProjectImage(url: any): string {
    if (url && typeof url === 'string' && url.trim().length > 5) {
      return url;
    }
    return 'https://placehold.co/600x400?text=Proyecto';
  }
}