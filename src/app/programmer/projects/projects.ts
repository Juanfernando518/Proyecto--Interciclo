import { Component, inject } from '@angular/core';
// Importamos módulos necesarios para formularios y listas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../../core/models/models';
import { Observable, switchMap, of } from 'rxjs';
import { FirestoreService } from '../../core/services/firestoreService';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante para @if, @for y ngModel
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects {
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);

  // Lista de proyectos del usuario
  projects$: Observable<Project[]>;

  // Variables para el Formulario (Crear/Editar)
  showForm = false;
  isEditing = false;
  currentProject: Project = this.getEmptyProject();

  constructor() {
    // Cargamos los proyectos automáticamente al iniciar
    const user = this.authService.currentUser();
    if (user) {
      this.projects$ = this.firestoreService.getProjectsByProgrammer(user.uid);
    } else {
      this.projects$ = of([]);
    }
  }

  // Inicializa un proyecto vacío
  getEmptyProject(): Project {
    const user = this.authService.currentUser();
    return {
      programmerId: user?.uid || '',
      title: '',
      description: '',
      type: 'academic', // Valor por defecto [cite: 52]
      technologies: [],
      imageUrl: '',
      repoUrl: '',
      demoUrl: ''
    };
  }

  // Abrir formulario para CREAR
  openCreate() {
    this.currentProject = this.getEmptyProject();
    this.isEditing = false;
    this.showForm = true;
  }

  // Abrir formulario para EDITAR
  openEdit(proj: Project) {
    this.currentProject = { ...proj }; // Clonamos para no editar directo en la lista
    this.isEditing = true;
    this.showForm = true;
  }

  // Guardar (Crear o Actualizar)
  async saveProject() {
    try {
      // Convertir el string de tecnologías a array si es necesario
      // (Aquí asumimos que el input lo maneja, o lo convertimos manualmente)

      // Busca la parte del if (this.isEditing...) y cámbiala por esto:
      if (this.isEditing && this.currentProject.id) {
        // AHORA SÍ ACTUALIZA DE VERDAD
        await this.firestoreService.updateProject(this.currentProject.id, this.currentProject);
      } else {
        // CREAR NUEVO
        await this.firestoreService.addProject(this.currentProject);
      }

      
      alert('Proyecto guardado con éxito');
      this.showForm = false;
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  }

  // Eliminar Proyecto
  async deleteProject(id: string) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      await this.firestoreService.deleteProject(id);
    }
  }

  // Auxiliar para el input de Tecnologías (separado por comas)
  get techString(): string {
    return this.currentProject.technologies.join(', ');
  }
  set techString(value: string) {
    this.currentProject.technologies = value.split(',').map(t => t.trim());
  }
}