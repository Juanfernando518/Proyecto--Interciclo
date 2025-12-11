import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para @for, @if, date, async
import { Advisory } from '../../core/models/models';
import { Observable, of } from 'rxjs';
import { FirestoreService } from '../../core/services/firestoreService';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequests {
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);

  requests$: Observable<Advisory[]>;

  constructor() {
    const user = this.authService.currentUser();
    
    if (user) {
      // Traemos las solicitudes de este cliente
      this.requests$ = this.firestoreService.getAdvisoriesForClient(user.uid);
    } else {
      this.requests$ = of([]);
    }
  }
}