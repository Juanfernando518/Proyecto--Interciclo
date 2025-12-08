import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc, deleteDoc, query, where, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  Project, Advisory } from '../models/models';
import {  AppUser } from '../models/models';


@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);

  // --- USUARIOS ---

  // Obtener todos los usuarios (Para el Admin Dashboard)
  getAllUsers(): Observable<AppUser[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'uid' }) as Observable<AppUser[]>;
  }
  // Obtener datos de UN usuario específico por su ID
getUser(uid: string): Observable<AppUser> {
  const userDoc = doc(this.firestore, `users/${uid}`);
  return docData(userDoc) as Observable<AppUser>;
}

  // Obtener solo los programadores (Para la Home Page)
  getProgrammers(): Observable<AppUser[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('role', '==', 'programmer'));
    return collectionData(q, { idField: 'uid' }) as Observable<AppUser[]>;
  }

  // Actualizar perfil (Cambiar rol o editar datos de programador)
  updateUser(uid: string, data: Partial<AppUser>) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return updateDoc(userDoc, data);
  }

  // --- PROYECTOS ---

  // Obtener proyectos de un programador específico
  getProjectsByProgrammer(programmerId: string): Observable<Project[]> {
    const projectsRef = collection(this.firestore, 'projects');
    const q = query(projectsRef, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
  }

  // Crear proyecto
  addProject(project: Project) {
    const projectsRef = collection(this.firestore, 'projects');
    return addDoc(projectsRef, project);
  }

  // Eliminar proyecto
  deleteProject(projectId: string) {
    const projectDoc = doc(this.firestore, `projects/${projectId}`);
    return deleteDoc(projectDoc);
  }
  // Actualizar un proyecto existente
updateProject(projectId: string, data: Partial<Project>) {
  const projectDoc = doc(this.firestore, `projects/${projectId}`);
  return updateDoc(projectDoc, data);
}

  // --- ASESORÍAS ---

  // Crear solicitud de asesoría
  requestAdvisory(advisory: Advisory) {
    const advisoryRef = collection(this.firestore, 'advisories');
    return addDoc(advisoryRef, advisory);
  }

 // Asegúrate de importar Advisory y updateDoc en la parte superior

// 1. Obtener las asesorías dirigidas a un programador específico
getAdvisoriesForProgrammer(programmerId: string): Observable<Advisory[]> {
  const advisoryRef = collection(this.firestore, 'advisories');
  // Filtramos donde 'programmerId' coincida con el usuario actual
  const q = query(advisoryRef, where('programmerId', '==', programmerId));
  // Ordenar por fecha sería ideal, pero requiere índices compuestos. Por ahora simple.
  return collectionData(q, { idField: 'id' }) as Observable<Advisory[]>;
}

// 2. Responder (Aprobar/Rechazar)
updateAdvisoryStatus(advisoryId: string, status: 'accepted' | 'rejected', adminComment: string) {
  const advisoryDoc = doc(this.firestore, `advisories/${advisoryId}`);
  return updateDoc(advisoryDoc, { 
    status, 
    adminComment 
  });
}
}