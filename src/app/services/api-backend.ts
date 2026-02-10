import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  
  private http = inject(HttpClient);
  // Unificamos todo en una sola variable para no confundirnos
  private apiUrl = 'https://backend-portafolio-pes5.onrender.com/api';

  constructor() { }

  // ==========================================
  // 🔐 AUTENTICACIÓN
  // ==========================================
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  // ==========================================
  // 👤 USUARIOS
  // ==========================================
  obtenerExpertos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/programadores`);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/me`);
  }

  actualizarPerfil(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/me`, datos);
  }

  // ==========================================
  // 📂 PROYECTOS
  // ==========================================
  obtenerProyectosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos/programador/${usuarioId}`);
  }

  misProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos/mis-proyectos`);
  }

  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proyectos`, proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/proyectos/${id}`);
  }

  // ==========================================
  // 📅 ASESORÍAS (CITAS)
  // ==========================================
  solicitarAsesoria(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asesorias`, datos);
  }

  misCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias/mis-pedidos`);
  }

  // ESTE ES EL QUE USA EL DASHBOARD (Mantén este nombre)
  obtenerCitasRecibidas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asesorias/recibidas`);
  }

  responderCita(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/asesorias/${id}/responder?estado=${estado}`, {});
  }

  // ==========================================
  // 🛡️ ADMIN
  // ==========================================
  obtenerStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/stats`);
  }

  obtenerTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
  }
  
  cambiarRolUsuario(id: number, nuevoRol: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}/rol?nuevoRol=${nuevoRol}`, {});
  }
}