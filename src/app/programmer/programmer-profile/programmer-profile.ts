import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../core/models/models';
import { AuthService } from '../../core/services/auth';
import { FirestoreService } from '../../core/services/firestoreService';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programmer-profile.html',
  styleUrls: ['./programmer-profile.css']
})
export class ProfileComponent {
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  
  // Copia de los datos para editar sin afectar la signal directamente
  userProfile: Partial<AppUser> = {};
  isLoading = false;

  constructor() {
    // Cargar datos actuales
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.userProfile = { ...currentUser };
    }
  }

  async saveProfile() {
    const uid = this.authService.currentUser()?.uid;
    if (!uid) return;

    this.isLoading = true;
    try {
      await this.firestoreService.updateUser(uid, this.userProfile);
      alert('✅ Perfil actualizado correctamente');
      
      // Truco: Recargamos la página para que la Signal de AuthService se actualice con los nuevos datos
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert('❌ Error al guardar');
    } finally {
      this.isLoading = false;
    }
  }
}