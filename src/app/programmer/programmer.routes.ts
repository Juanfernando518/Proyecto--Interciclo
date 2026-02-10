import { Routes } from '@angular/router';

// CORRECCIÓN 1: Importamos 'ProjectsComponent' (el nombre nuevo) en vez de 'Projects'
import { ProjectsComponent } from './projects/projects';
import { AdviceRequests } from './advice-requests/advice-requests';
import { ProfileComponent } from './programmer-profile/programmer-profile';

export const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent // CORRECCIÓN 2: Usamos la clase correcta aquí
  },
  {
    path: 'advice-requests',
    component: AdviceRequests
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  }
];