import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { ApiBackendService } from '../../services/api-backend';
import { AuthService } from '../../core/services/auth'; // Importamos el Auth arreglado

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private api = inject(ApiBackendService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);

  // --- VARIABLES QUE FALTABAN ---
  email = '';
  password = '';
  name = ''; 
  errorMessage = '';
  isRegistering = false; 

  // --- MÉTODOS VISUALES ---
  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }

  submit() {
    this.errorMessage = '';
    if (this.isRegistering) {
      this.registrarManual();
    } else {
      this.ingresarManual();
    }
  }

  // --- LÓGICA MANUAL ---
  ingresarManual() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => this.manejarExito(res),
      error: () => this.errorMessage = 'Credenciales incorrectas.'
    });
  }

  registrarManual() {
    const datos = { nombre: this.name, email: this.email, password: this.password, rol: 'USUARIO' };
    this.api.register(datos).subscribe({
      next: (res) => this.manejarExito(res),
      error: () => this.errorMessage = 'El correo ya está registrado.'
    });
  }

  // --- LÓGICA GOOGLE (La que faltaba) ---
  async loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const credencial = await signInWithPopup(this.auth, provider);
      const user = credencial.user;
      const passwordGoogle = 'google-auth-secret'; 
      
      const datosRegistro = {
        nombre: user.displayName || 'Usuario Google',
        email: user.email,
        password: passwordGoogle,
        rol: 'USUARIO'
      };

      // Intentamos registrar, si falla intentamos loguear
      this.api.register(datosRegistro).subscribe({
        next: (res) => this.manejarExito(res),
        error: () => {
          this.api.login({ email: user.email, password: passwordGoogle }).subscribe({
            next: (res) => this.manejarExito(res),
            error: () => this.errorMessage = 'Error al sincronizar con el servidor.'
          });
        }
      });
    } catch (error) {
      console.error('Error Google:', error);
    }
  }

  // --- MANEJO DE ÉXITO CON AUTH SERVICE ---
  private manejarExito(res: any) {
    if (res && res.token) {
      // 1. Preparamos el usuario
      let usuarioData = res.usuario || {};
      
      // Intentamos sacar el rol del token si no viene
      if (!usuarioData.rol) {
          try {
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            usuarioData.rol = payload.rol; 
            usuarioData.email = payload.sub;
          } catch(e) { 
             usuarioData.rol = 'USUARIO'; 
          }
      }

      // 2. Usamos el AuthService para actualizar la señal (Adiós F5)
      this.authService.loginSuccess(res.token, usuarioData);
      
      this.router.navigate(['/']);
    } else {
      this.errorMessage = "Error: El servidor no envió el token.";
    }
  }
}