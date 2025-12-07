import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUser } from '../../core/models/models';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/services/firestoreService';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], // Necesario para @for, async pipe, etc.
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  private firestoreService = inject(FirestoreService);

  // Observable con la lista de TODOS los usuarios
  users$: Observable<AppUser[]> = this.firestoreService.getAllUsers();

  // Función para cambiar el rol de un usuario
  async updateRole(user: AppUser, newRole: 'admin' | 'programmer' | 'user') {
    const confirmMessage = `¿Estás seguro de cambiar el rol de ${user.displayName} a ${newRole.toUpperCase()}?`;
    
    if (confirm(confirmMessage)) {
      try {
        await this.firestoreService.updateUser(user.uid, { role: newRole });
        alert(`Rol actualizado a ${newRole}`);
      } catch (error) {
        console.error(error);
        alert('Error al actualizar el rol');
      }
    }
  }

  // Función para "Eliminar" (Borrar de la base de datos)
  // Nota: Esto borra sus datos, pero su cuenta de Google sigue activa.
  // Para borrarlo de Auth se requiere Cloud Functions (backend), 
  // pero para el proyecto esto cumple el requisito de gestión.
  /* async deleteUser(uid: string) {
    if (confirm('Esta acción borrará los datos del usuario. ¿Continuar?')) {
       // Necesitarías implementar deleteUser en el servicio si quieres usar esto
       // await this.firestoreService.deleteUser(uid);
    }
  } 
  */
}