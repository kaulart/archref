import { AdministrationComponent } from './administration.component';
import { RepositoryDetailsRoutes } from './repositorydetails/repositorydetails.routes';

import { Route } from '@angular/router';


export const AdministrationRoutes: Route[] = [
  {
    path: 'administration',
    component: AdministrationComponent

  }
];
