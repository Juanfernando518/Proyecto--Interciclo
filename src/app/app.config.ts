import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Importamos el interceptor que acabamos de revisar
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { environment } from '../enviroments/enviroment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 1. CONECTAMOS EL INTERCEPTOR (Vital para eliminar el 403)
    provideHttpClient(withInterceptors([jwtInterceptor])),

    // 2. ARREGLAMOS EL NOMBRE DE FIREBASE
    // Si environment.firebaseConfig da error, usa environment.firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    
    provideAuth(() => getAuth())
  ]
};