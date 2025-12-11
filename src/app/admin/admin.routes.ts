import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';


export const ADMIN_ROUTES: Routes = [
  { path: '', component: DashboardComponent } 
  // Aquí el path es vacío '' porque ya estás dentro de /admin
];