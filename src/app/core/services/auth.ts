import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Role = 'admin'|'programmer'|'user';

export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _user$ = new BehaviorSubject<AppUser | null>(null);
  public user$ = this._user$.asObservable();

  constructor() {
    
  }
  loginMock(email: string, role: Role = 'user') {
    const u: AppUser = {
      uid: Math.random().toString(36).slice(2),
      email,
      displayName: email.split('@')[0],
      role
    };
    this._user$.next(u);
    return of(u);
  }
  logout() {
    this._user$.next(null);
    return of(true);
  }
  get currentUser(): AppUser | null {
    return this._user$.value;
  }
  isLogged(): boolean {
    return !!this._user$.value;
  }
  loginAsAdmin() { this.loginMock('admin@demo.com','admin'); }
  loginAsProgrammer(){ this.loginMock('dev@demo.com','programmer'); }
  loginAsUser(){ this.loginMock('user@demo.com','user'); }
}