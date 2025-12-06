import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import { UserForm } from './user-form/user-form';
import { ProgrammersSchedule } from './programmers-schedule/programmers-schedule';
import { UsersService } from '../core/services/users';

export const ADMIN_ROUTES: Routes = [
    {path: '', component: Dashboard},
    {path: 'users', component: UsersService},
    {path: 'users/new', component: UserForm},
    {path: 'users/edit/:id', component: UserForm},
    {path: 'schedule', component: ProgrammersSchedule}
]