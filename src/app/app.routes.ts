import { Routes } from '@angular/router';
import { Home } from './public/home/home';
import { Portfolios } from './public/portfolios/portfolios';
import { Projects } from './programmer/projects/projects';
import { adminGuard } from './core/guards/admin-guard';
import { programmerGuard } from './core/guards/programmer-guard';
import { AdviceRequests } from './programmer/advice-requests/advice-requests';
import { ProfileComponent } from './programmer/programmer-profile/programmer-profile';
import { DashboardComponent } from './admin/dashboard/dashboard';


export const routes: Routes = [
  
 { path: '', component: Home },
 {
  path: 'admin-dashboard', 
    component: DashboardComponent
    //canActivate: [adminGuard] // ¡Muy importante!
  },
 
  { path: 'portfolio/:id', component: Portfolios },

  // Rutas de autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Aquí irían tus otros módulos (Admin, Programmer)
  
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  
 { 
    path: 'projects', 
    component: Projects,
    canActivate: [programmerGuard]
  },
  { 
    path: 'advice-requests', 
    component: AdviceRequests
    
  },
  { 
    path: 'profile', 
    component: ProfileComponent 
    // Opcional: Si quieres protegerlo para que solo logueados entren:
    // canActivate: [authGuard] 
  },
  
  { path: '**', redirectTo: '' }
];