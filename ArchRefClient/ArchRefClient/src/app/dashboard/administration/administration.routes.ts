import { AdministrationComponent } from './administration.component';

import { Route } from '@angular/router';

/*******************************************************************************************************************
 *
 * @route AdministrationRoutes - Path for the navigation to the AdministrationModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export const AdministrationRoutes: Route[] = [
  {
    path: 'administration',
    component: AdministrationComponent

  }
];
