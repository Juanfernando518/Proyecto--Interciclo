import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para el *ngFor y AsyncPipe
import { RouterLink } from '@angular/router';   // Para navegar al detalle
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/services/firestoreService';
import { AppUser } from '../../core/models/models';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private firestoreService = inject(FirestoreService);

  programmers$: Observable<AppUser[]> = this.firestoreService.getProgrammers();
}