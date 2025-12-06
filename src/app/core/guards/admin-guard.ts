import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root',
})  

export class adminGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}
  canActivate(): boolean {
    const u = this.auth.currentUser;
    if(u?.role==='admin') return true;
    this.router.navigate(['/']);
    return false;
  }
}
