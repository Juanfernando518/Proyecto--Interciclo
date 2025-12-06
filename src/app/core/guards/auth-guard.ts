import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class authGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}
  canActivate(): boolean {
    if(this.auth.isLogged()) return true;
    this.router.navigate(['/auth/login']);
    return false;
  }
}
