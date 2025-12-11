import { Routes } from '@angular/router';

// IMPORTS DE TUS COMPONENTES (Asegúrate que las rutas sean correctas)
import { Home } from './public/home/home';
import { Portfolios } from './public/portfolios/portfolios';
import { Projects } from './programmer/projects/projects';
import { AdviceRequests } from './programmer/advice-requests/advice-requests';
import { ProfileComponent } from './programmer/programmer-profile/programmer-profile';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { MyRequests } from './user/my-requests/my-requests';

// IMPORTS DE LOS GUARDS (SEGURIDAD)
import { adminGuard } from './core/guards/admin-guard';
import { programmerGuard } from './core/guards/programmer-guard';
import { authGuard } from './core/guards/auth-guard'; 

export const routes: Routes = [
  
  // --- 1. RUTAS PÚBLICAS (Accesibles para todos) ---
  { path: '', component: Home },
  
  // Ver el portafolio es público, pero agendar (la acción) requiere login en el componente
  { path: 'portfolio/:id', component: Portfolios },

  // Login y Registro
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },


  // --- 2. RUTAS DE CLIENTE / USUARIO (Requieren estar logueado) ---
  { 
    path: 'my-requests', 
    component: MyRequests,
    canActivate: [authGuard] // <--- IMPORTANTE: Solo usuarios registrados pueden ver sus citas
  },


  // --- 3. RUTAS DE PROGRAMADOR (Requieren rol 'programmer') ---
  { 
    path: 'projects', 
    component: Projects,
    canActivate: [programmerGuard] // Protegido
  },
  { 
    path: 'advice-requests', 
    component: AdviceRequests,
    canActivate: [programmerGuard] // <--- FALTABA ESTO: Protegido
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [programmerGuard] // Lo ideal es que sea programmerGuard si es el perfil profesional
  },


  // --- 4. RUTAS DE ADMIN (Requieren rol 'admin') ---
  { 
    path: 'admin', 
    component: DashboardComponent,
    canActivate: [adminGuard] // Protegido
  },


  // --- 5. COMODÍN (Siempre al final) ---
  { path: '**', redirectTo: '' }
];