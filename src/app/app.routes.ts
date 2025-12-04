import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./public/public-module').then(m => m.PublicModule)
    },
    {
      path: 'auth', loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
    },
    {
     path: 'programmer', loadChildren: () => import('./programmer/programmer-module').then(m => m.ProgrammerModule)
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
    }
];
