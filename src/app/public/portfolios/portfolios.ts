import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../core/services/users';
import { Programmer } from '../../core/models/programmer';
@Component({
  selector: 'app-portfolios',
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolios.html',
  styleUrls: ['./portfolios.css'],
  standalone: true
})
export class Portfolios {
 list: Programmer[] = [];
  constructor(private usersService: UsersService){
    this.usersService.getAll().subscribe(x => this.list = x);
  }
}
