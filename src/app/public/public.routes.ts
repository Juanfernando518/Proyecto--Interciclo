import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolios } from './portfolios/portfolios';
import { PortfolioDetail } from './portfolio-detail/portfolio-detail';
import { ScheduleAdvice } from './schedule-advice/schedule-advice';

export const PUBLIC_ROUTES: Routes = [
    {path: '', component: Home},
    {path: 'portfolios', component: Portfolios},
    {path: 'portfolio/:id', component: PortfolioDetail},
    {path: 'schedule', component: ScheduleAdvice}
]