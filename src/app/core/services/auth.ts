import { Injectable, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUser } from '../models/models';
import { switchMap, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Signal del usuario
  currentUser = signal<AppUser | null>(null);
  loading = signal<boolean>(true);

  constructor() {
    // ESTA ES LA FORMA CORRECTA PARA EVITAR EL ERROR DE INYECCIÓN
    // Usamos switchMap para encadenar el usuario de Auth con sus datos de Firestore
    user(this.auth).pipe(
      switchMap(firebaseUser => {
        if (!firebaseUser) return of(null);

        const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
        
        // docData devuelve un Observable en tiempo real (más rápido y sin errores de contexto)
        return docData(userDocRef).pipe(
          switchMap(async (dbUser) => {
            if (dbUser) {
              return dbUser as AppUser;
            } else {
              // Si no existe en base de datos, lo creamos
              const newUser: AppUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email!,
                displayName: firebaseUser.displayName || 'Usuario',
                photoURL: firebaseUser.photoURL || '',
                role: 'user'
              };
              await setDoc(userDocRef, newUser);
              return newUser;
            }
          })
        );
      })
    ).subscribe((finalUser) => {
      // Aquí actualizamos la señal de forma segura
      this.currentUser.set(finalUser as AppUser | null);
      this.loading.set(false);
    });
  }

  async loginWithGoogle() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/']); 
    } catch (error) {
      console.error('Error login Google:', error);
    }
  }

  async loginWithEmail(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error login Email:', error);
      throw error;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/auth/login']);
    this.currentUser.set(null);
  }
}