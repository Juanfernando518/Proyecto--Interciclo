import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Projects } from './projects/projects';
import { ProjectForm } from './project-form/project-form';
import { AdviceRequests } from './advice-requests/advice-requests';

export const PROGRAMMER_ROUTES: Routes = [
    {path: '', component: Dashboard},
    {path: 'projects', component: Projects},
    {path: 'projects/new', component: ProjectForm},
    { path: 'projects/edit/:id', component: ProjectForm },
    {path: 'advice', component: AdviceRequests}
]