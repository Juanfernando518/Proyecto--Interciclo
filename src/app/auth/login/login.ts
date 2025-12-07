import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // <--- AGREGAR AQUÍ
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  // Variables para el formulario
  email = '';
  password = '';
  errorMessage = '';

  loginGoogle() {
    this.authService.loginWithGoogle();
  }

  async loginEmail() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa ambos campos';
      return;
    }

    try {
      await this.authService.loginWithEmail(this.email, this.password);
    } catch (error: any) {
      // Manejo simple de errores
      if (error.code === 'auth/invalid-credential') {
        this.errorMessage = 'Correo o contraseña incorrectos';
      } else {
        this.errorMessage = 'Ocurrió un error al intentar ingresar';
      }
    }
  }
}