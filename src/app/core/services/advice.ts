import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AdviceState = 'Pendiente' | 'Aprobada' | 'Rechazada';

export interface Advice {
  id: string;
  programadorId: string;
  solicitanteName?: string;
  solicitanteEmail?: string;
  fechaHora?: string;
  comentario?: string;
  estado: AdviceState;
  respuesta?: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdviceService {

  private _list = new BehaviorSubject<Advice[]>([]);
  list$ = this._list.asObservable();

  /**
   * Crea una solicitud. Aquí EXIGIMOS programadorId para evitar errores.
   * Todo lo demás es opcional.
   */
  create(a: Omit<Advice, 'id' | 'estado' | 'createdAt'>) {
    const newA: Advice = {
      id: 'a' + Date.now(),
      estado: 'Pendiente',
      createdAt: Date.now(),
      ...a
    };

    this._list.next([...this._list.value, newA]);
    return newA;
  }

  update(id: string, data: Partial<Advice>) {
    this._list.next(
      this._list.value.map(x => 
        x.id === id ? { ...x, ...data } : x
      )
    );
  }

  getByProgrammer(programmerId: string) {
    return this._list.value.filter(x => x.programadorId === programmerId);
  }
}
