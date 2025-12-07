import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../core/services/firestoreService';
import { AppUser } from '../../core/models/models';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  firestoreService = inject(FirestoreService);
  // Lista automática de usuarios (Signals o AsyncPipe)
  users$ = this.firestoreService.getAllUsers();

  // Función para ascender a alguien a Programador
  makeProgrammer(user: AppUser) {
    if(confirm(`¿Convertir a ${user.displayName} en Programador?`)) {
      this.firestoreService.updateUser(user.uid, { role: 'programmer' });
    }
  }

  // Función para quitar permisos
  removePrivileges(user: AppUser) {
    if(confirm(`¿Volver a ${user.displayName} usuario normal?`)) {
      this.firestoreService.updateUser(user.uid, { role: 'user' });
    }
  }
}