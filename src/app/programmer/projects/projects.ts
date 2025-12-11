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

  projects$: Observable<Project[]>;
  
  // Variables para el Modal
  showForm = false;
  isEditing = false;
  
  // Objeto temporal para el formulario
  currentProject: Project = this.getEmptyProject();

  constructor() {
    const user = this.authService.currentUser();
    if (user) {
      // Cargar proyectos de este usuario
      this.projects$ = this.firestoreService.getProjectsByProgrammer(user.uid);
    } else {
      this.projects$ = of([]);
    }
  }

  // Generar proyecto vacío
  getEmptyProject(): Project {
    const user = this.authService.currentUser();
    return {
      programmerId: user?.uid || '',
      title: '',
      description: '',
      type: 'academic',
      technologies: [],
      imageUrl: '',
      repoUrl: '',
      demoUrl: ''
    };
  }

  // ABRIR MODAL PARA CREAR
  openCreate() {
    this.currentProject = this.getEmptyProject();
    this.isEditing = false;
    this.showForm = true;
  }

  // ABRIR MODAL PARA EDITAR
  openEdit(proj: Project) {
    // Clonamos el objeto para no editar la lista directamente antes de guardar
    this.currentProject = { ...proj }; 
    this.isEditing = true;
    this.showForm = true;
  }

  // GUARDAR (CREAR O ACTUALIZAR)
  async saveProject() {
    try {
      if (this.isEditing && this.currentProject.id) {
        // ACTUALIZAR
        await this.firestoreService.updateProject(this.currentProject.id, this.currentProject);
        alert('Proyecto actualizado correctamente');
      } else {
        // CREAR
        await this.firestoreService.addProject(this.currentProject);
        alert('Proyecto creado exitosamente');
      }
      this.showForm = false; // Cerrar modal
    } catch (error) {
      console.error(error);
      alert('Error al guardar el proyecto');
    }
  }

  // ELIMINAR
  async deleteProject(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto? No se puede deshacer.')) {
      try {
        await this.firestoreService.deleteProject(id);
        // No hace falta alerta, la lista se actualiza sola
      } catch (error) {
        console.error(error);
        alert('Error al eliminar');
      }
    }
  }

  // Getter/Setter para manejar el array de tecnologías como texto (comma separated)
  get techString(): string {
    return this.currentProject.technologies.join(', ');
  }
  set techString(value: string) {
    this.currentProject.technologies = value.split(',').map(t => t.trim()).filter(t => t !== '');
  }
}