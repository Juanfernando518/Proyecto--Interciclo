import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppUser, Project, Advisory } from '../../core/models/models'; // Tu ruta correcta
import { FirestoreService } from '../../core/services/firestoreService';
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
  private firestoreService = inject(FirestoreService);
  public authService = inject(AuthService);

  programmer$: Observable<AppUser | undefined>;
  projects$: Observable<Project[]>;

  // ESTA ES LA CLAVE: Controla qué se muestra. Por defecto 'projects'
  activeTab: 'projects' | 'advisory' = 'projects';

 
  showForm = false; // Controla si se ve el formulario
  topic = '';       // Para el input del motivo
  dateRequest = ''; // Para el input de fecha
  clientPhone = ''; //telefono
  // ----------------------------------------

  constructor() {
    const programmerId = this.route.snapshot.paramMap.get('id');
    if (programmerId) {
      this.programmer$ = this.firestoreService.getUser(programmerId);
      this.projects$ = this.firestoreService.getProjectsByProgrammer(programmerId);
    } else {
      this.programmer$ = of(undefined);
      this.projects$ = of([]);
    }
  }

  ngOnInit() {
    // Escuchamos la URL para saber qué botón aplastaron en el Home
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'advisory') {
        this.activeTab = 'advisory';
      } else {
        this.activeTab = 'projects';
      }
    });
  }

  // Función para cambiar de pestaña manualmente (click en los botones de arriba)
  setTab(tab: 'projects' | 'advisory') {
    this.activeTab = tab;
  }

  async requestAdvisory(programmerId: string) {
    // ... (Tu código de guardar cita sigue igual) ...
    const currentUser = this.authService.currentUser();
    if (!currentUser) { 
        alert("Inicia sesión primero"); 
        return; 
    }

    const newAdvisory: Advisory = {
      programmerId: programmerId,
      clientId: currentUser.uid,
      clientName: currentUser.displayName,
      clientEmail: currentUser.email,
      clientPhone: this.clientPhone,
      topic: this.topic,
      dateRequest: new Date(this.dateRequest).toISOString(),
      status: 'pending'
    };

    try {
      await this.firestoreService.requestAdvisory(newAdvisory);
      alert('Solicitud enviada');
      this.topic = '';
    } catch (error) {
      console.error(error);
    }
  }
}