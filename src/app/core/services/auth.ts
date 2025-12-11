import { Injectable, inject, signal, NgZone } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUser } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private ngZone = inject(NgZone); // Vital para que la navegación funcione

  // Signals
  currentUser = signal<AppUser | null>(null);
  loading = signal<boolean>(true);

  constructor() {
    // Escuchador oficial de Firebase (Cero errores de contexto)
    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 1. Usuario logueado -> Buscamos datos en Firestore
        try {
          const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            // Usuario existe: cargamos datos
            const userData = userSnapshot.data() as AppUser;
            this.updateState(userData);
          } else {
            // Usuario nuevo: lo creamos
            const newUser: AppUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Usuario',
              photoURL: firebaseUser.photoURL || '',
              role: 'user'
            };
            await setDoc(userDocRef, newUser);
            this.updateState(newUser);
          }
        } catch (error) {
          console.error('Error recuperando usuario:', error);
          this.updateState(null);
        }
      } else {
        // 2. No hay usuario (Logout)
        this.updateState(null);
      }
    });
  }

  // Helper para actualizar señales dentro de la zona de Angular
  private updateState(user: AppUser | null) {
    this.ngZone.run(() => {
      this.currentUser.set(user);
      this.loading.set(false);
      console.log('✅ Auth Actualizado:', user?.role || 'Sin sesión');
    });
  }

  // --- MÉTODOS PÚBLICOS ---

  async loginWithGoogle() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }

  async loginWithEmail(email: string, pass: string) {
    await signInWithEmailAndPassword(this.auth, email, pass);
    this.router.navigate(['/']);
  }

  async registerWithEmail(email: string, pass: string, name: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    await updateProfile(credential.user, { displayName: name });
    
    // Guardamos en Firestore
    const newUser: AppUser = {
      uid: credential.user.uid,
      email: email,
      displayName: name,
      photoURL: '',
      role: 'user'
    };
    await setDoc(doc(this.firestore, `users/${credential.user.uid}`), newUser);
    this.router.navigate(['/']);
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
    this.currentUser.set(null);
  }
}