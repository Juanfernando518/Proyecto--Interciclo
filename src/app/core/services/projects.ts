import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Section = 'Academicos'|'Laborales';

export interface Project {
  id:string;
  ownerId:string;
  title:string;
  description?:string;
  participation?: string;
  technologies?: string[];
  repoUrl?:string;
  demoUrl?:string;
  section: Section;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Projects {
  private _projects = new BehaviorSubject<Project[]>([
    { id:'pr1', ownerId:'p1', title:'App de Notas', description:'Proyecto academico', participation:'Frontend', technologies:['Angular'], section:'Academicos', createdAt: Date.now() }
  ]);
  list$ = this._projects.asObservable();

  getByOwner(ownerId:string){ return this._projects.value.filter(p=>p.ownerId===ownerId); }
  getAll(): Observable<Project[]>{ return this.list$; }
  create(p: Partial<Project>){ const newP: Project = { id: 'pr'+Date.now(), createdAt: Date.now(), ...p } as Project; this._projects.next([ ...this._projects.value, newP ]); return newP; }
  update(id:string, data: Partial<Project>){ this._projects.next(this._projects.value.map(x => x.id===id ? {...x,...data} : x)); }
  delete(id:string){ this._projects.next(this._projects.value.filter(x=>x.id!==id)); }
}
