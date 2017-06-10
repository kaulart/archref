import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';

import { DashboardRoutes } from './dashboard/dashboard.routes';


/*******************************************************************************************************************
 *
 * @route Routes - Path for the entry point of the application and for all components and modules which
 *                 should be accessible from the application root
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export const routes: Routes = [
  ...DashboardRoutes,
  { path: '**', component: DashboardComponent }
];
