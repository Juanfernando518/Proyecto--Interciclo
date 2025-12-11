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
  name = '';
  errorMessage = '';
  isRegistering = false;


  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = ''; // Limpiar errores
  }
  async submit() {
    this.errorMessage = '';

    // Validaciones básicas
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa los campos.';
      return;
    }

    if (this.isRegistering && !this.name) {
      this.errorMessage = 'El nombre es obligatorio para registrarse.';
      return;
    }

    try {
      if (this.isRegistering) {
        // MODO REGISTRO
        await this.authService.registerWithEmail(this.email, this.password, this.name);
      } else {
        // MODO LOGIN
        await this.authService.loginWithEmail(this.email, this.password);
      }
    } catch (error: any) {
      // Manejo de errores comunes de Firebase
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Este correo ya está registrado.';
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else {
        this.errorMessage = 'Ocurrió un error. Intenta de nuevo.';
        console.error(error);
      }
    }
  }


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
