import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Programmer } from '../models/programmer';
 
@Injectable({
  providedIn: 'root',
})
export class UsersService {

  // Datos iniciales de prueba
  private _list = new BehaviorSubject<Programmer[]>([
    {
      id: 'p1',
      name: 'Ana Perez',
      specialty: 'Frontend',
      description: 'Desarrolladora frontend',
      photoUrl: '',
      email: 'ana@example.com',
      role: 'programmer',
      github: '',
      linkedin: '',
      portfolio: '',
      createdAt: Date.now(),
    },
    {
      id: 'p2',
      name: 'Carlos Ruiz',
      specialty: 'Backend',
      description: 'APIs y bases de datos',
      photoUrl: '',
      email: 'carlos@example.com',
      role: 'programmer',
      github: '',
      linkedin: '',
      portfolio: '',
      createdAt: Date.now(),
    }
  ]);

  list$ = this._list.asObservable();

  constructor() {}

  /** Obtener todos los programadores */
  getAll(): Observable<Programmer[]> {
    return this.list$;
  }

  /** Crear un nuevo programador */
  create(p: Partial<Programmer>) {
    const arr = this._list.value;

    const newItem: Programmer = {
      id: 'p' + Date.now(),
      name: p.name ?? 'Nuevo Usuario',
      specialty: p.specialty ?? '',
      description: p.description ?? '',
      photoUrl: p.photoUrl ?? '',
      email: p.email ?? '',
      role: p.role ?? 'user',
      github: p.github,
      linkedin: p.linkedin,
      portfolio: p.portfolio,
      createdAt: Date.now(),
    };

    this._list.next([...arr, newItem]);
    return newItem;
  }

  /** Actualizar un programador */
  update(id: string, data: Partial<Programmer>) {
    const arr = this._list.value.map(x =>
      x.id === id ? { ...x, ...data } : x
    );
    this._list.next(arr);
  }

  /** Eliminar programador */
  delete(id: string) {
    this._list.next(this._list.value.filter(x => x.id !== id));
  }

  /** Obtener uno por ID */
  getById(id: string) {
    return this._list.value.find(x => x.id === id) ?? null;
  }
}
