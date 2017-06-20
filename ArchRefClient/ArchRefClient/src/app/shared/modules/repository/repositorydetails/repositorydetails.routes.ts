import { RepositoryDetailsComponent } from './repositorydetails.component';
import { Route } from '@angular/router';

/**********************************************************************************************************************************************************************************************************
 *
 * @route - RepositoryDetailsRoutes - Path for the navigation to the RepositoryDetailsComponent
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export const RepositoryDetailsRoutes: Route[] = [
    {
      path: 'repository',
      component: RepositoryDetailsComponent
    }
];
