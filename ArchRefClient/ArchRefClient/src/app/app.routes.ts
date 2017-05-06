import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';

import { DashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
  ...DashboardRoutes,
  { path: '**', component: DashboardComponent }
];
