/**
 * New typescript file
 */
import { RepositoryDetailsComponent } from './repositorydetails.component';
import { Route } from '@angular/router';


export const RepositoryDetailsRoutes: Route[] = [
    {
      path: 'repository',
      component: RepositoryDetailsComponent
    }
];
