import { Routes } from '@angular/router';

// COMPONENTES (Asegúrate de que los nombres de las clases sean correctos)
import { Home } from './public/home/home';
import { Portfolios } from './public/portfolios/portfolios';
import { Login } from './auth/login/login';
import { MyRequestsComponent } from './user/my-requests/my-requests'; // Verifica si la clase se llama así o 'MyRequests'

// COMPONENTES DE PROGRAMADOR
import { ProjectsComponent } from './programmer/projects/projects'; // Verifica nombre de clase
import { ProfileComponent } from './programmer/programmer-profile/programmer-profile';
import { AdviceRequests } from './programmer/advice-requests/advice-requests';

// COMPONENTE ADMIN
import { DashboardComponent } from './pages/admin-dashboard/admin-dashboard'; 

// GUARDS (Seguridad)

import { adminGuard } from './core/guards/admin-guard';    // Ojo: revisa si es 'admin-guard' o 'admin.guard'
import { authGuard } from './core/guards/auth-guard';
import { programmerGuard } from './core/guards/programmer-guard';
import { Dashboard } from './programmer/dashboard/dashboard'; // Importa la clase que acabamos de crear
export const routes: Routes = [
  // --- PÚBLICO ---
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },
  { path: 'auth/login', component: Login },
  
  // Ruta para VER la lista de expertos (Botón "Buscar Expertos" / "Ver Expertos")
  { path: 'portfolios', component: Portfolios }, 
  
  // Ruta para ver el DETALLE de un experto (con ID)
  { path: 'portfolio/:id', component: Portfolios },

  // --- CLIENTE / USUARIO ---
  // CORRECCIÓN: Agregamos 'user/' antes para que coincida con el menú
  { 
    path: 'user/my-requests', 
    component: MyRequestsComponent, 
    canActivate: [authGuard] 
  },

  // --- PROGRAMADOR ---
  // CORRECCIÓN: Agregamos 'programmer/' antes para que coincida con el menú
  { 
    path: 'programmer/projects', 
    component: ProjectsComponent, 
    canActivate: [programmerGuard] 
  },
  { 
    path: 'programmer/profile', 
    component: ProfileComponent, 
    canActivate: [programmerGuard] 
  },
  { 
    path: 'programmer/advice-requests', 
    component: AdviceRequests, 
    canActivate: [programmerGuard] 
  },
  { 
  path: 'programmer/dashboard', 
  component: Dashboard, 
  canActivate: [programmerGuard] 
},

  // --- ADMIN ---
  { 
    path: 'admin', 
    component: DashboardComponent, 
    canActivate: [adminGuard] 
  },

  
  // COMODÍN (Cualquier ruta desconocida va al inicio)
  { path: '**', redirectTo: '' }
];