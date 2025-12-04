import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import { Users } from './users/users';
import { UserForm } from './user-form/user-form';
import { ProgrammersSchedule } from './programmers-schedule/programmers-schedule';

export const ADMIN_ROUTES: Routes = [
    {path: '', component: Dashboard},
    {path: 'users', component: Users},
    {path: 'users/new', component: UserForm},
    {path: 'users/edit/:id', component: UserForm},
    {path: 'schedule', component: ProgrammersSchedule}
]