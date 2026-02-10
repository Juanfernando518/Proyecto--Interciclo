import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiBackendService } from '../../services/api-backend';

@Component({
  selector: 'app-projects', // Asegúrate que este selector coincida
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit { // Nombre corregido: ProjectsComponent
  private api = inject(ApiBackendService);

  proyectos: any[] = [];
  mostrarFormulario = false;

  // Objeto para crear nuevo proyecto
  nuevoProyecto = {
    nombre: '', // OJO: En el HTML usa este nombre
    descripcion: '',
    imagenUrl: '',
    repoUrl: '',
    deployUrl: ''
  };

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    // Llamamos al endpoint PRIVADO
    this.api.misProyectos().subscribe({
      next: (data: any) => {
        console.log('Mis Proyectos cargados:', data);
        this.proyectos = data;
      },
      error: (err: any) => {
        console.error('Error cargando proyectos (Revisa si tienes token):', err);
      }
    });
  }

  guardarProyecto() {
    if (!this.nuevoProyecto.nombre) {
      alert('El título es obligatorio');
      return;
    }

    this.api.crearProyecto(this.nuevoProyecto).subscribe({
      next: (res: any) => {
        alert('¡Proyecto creado con éxito!');
        this.proyectos.push(res); // Lo agregamos a la lista visualmente
        this.mostrarFormulario = false;
        this.limpiarFormulario();
      },
      error: (err: any) => {
        alert('Error al guardar. ¿Estás logueado?');
        console.error(err);
      }
    });
  }

  eliminar(id: number) {
    if(confirm('¿Seguro que quieres borrar este proyecto?')) {
      this.api.borrarProyecto(id).subscribe({
        next: () => {
          this.proyectos = this.proyectos.filter(p => p.id !== id);
        },
        error: (err: any) => alert('Error al eliminar')
      });
    }
  }

  limpiarFormulario() {
    this.nuevoProyecto = { nombre: '', descripcion: '', imagenUrl: '', repoUrl: '', deployUrl: '' };
  }
}