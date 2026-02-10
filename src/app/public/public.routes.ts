import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolios } from './portfolios/portfolios';
import { PortfolioDetail } from './portfolio-detail/portfolio-detail';
import { Layout } from '../core/layout/layout';

export const PUBLIC_ROUTES: Routes = [
    {path: '', component: Layout, children: [
        {path: '', component: Home},
        {path: 'portfolios', component: Portfolios},
        {path: 'portfolio/:id', component: PortfolioDetail}
        
    ]}
]