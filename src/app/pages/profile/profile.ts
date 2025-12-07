import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../core/models/models'; 
import { FirestoreService } from '../../core/services/firestoreService';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  
  userProfile: Partial<AppUser> = {};

  constructor() {
    // Leemos el valor actual de la señal
    const user = this.authService.currentUser();
    
    // Verificamos que NO sea null antes de copiar
    if (user) {
      this.userProfile = { ...user };
    }
  }

  async saveProfile() {
    const user = this.authService.currentUser();
    
    // Verificamos user y uid antes de guardar
    if (user && user.uid) {
      try {
        await this.firestoreService.updateUser(user.uid, this.userProfile);
        alert('Perfil actualizado correctamente');
      } catch (error) {
        console.error(error);
        alert('Error al guardar');
      }
    }
  }
}