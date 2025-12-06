import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../core/services/users';
import { Programmer } from '../../core/models/programmer';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  lista: Programmer[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll().subscribe((programadores) => {
      this.lista = programadores ?? []; // previene undefined
    });
  }
}
