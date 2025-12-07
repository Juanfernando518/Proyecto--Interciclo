import { Injectable, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUser } from '../models/models';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // DEFINICIÓN CORRECTA DE LA SEÑAL (SIGNAL)
  currentUser = signal<AppUser | null>(null);
  loading = signal<boolean>(true);

  constructor() {
    user(this.auth).subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          this.currentUser.set(userSnapshot.data() as AppUser);
        } else {
          const newUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName!,
            photoURL: firebaseUser.photoURL || '',
            role: 'user'
          };
          await setDoc(userDocRef, newUser);
          this.currentUser.set(newUser);
        }
      } else {
        this.currentUser.set(null);
      }
      this.loading.set(false);
    });
  }

  async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.router.navigate(['/']); 
  }
  async loginWithEmail(email: string, pass: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, pass);
      // La suscripción del constructor se encargará de actualizar el currentUser
      this.router.navigate(['/']);
      return result;
    } catch (error) {
      console.error('Error en login con email:', error);
      throw error; // Lanzamos el error para mostrarlo en el componente
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/auth/login']); // Ajustado a tu ruta 'auth'
    this.currentUser.set(null);
  }
}
