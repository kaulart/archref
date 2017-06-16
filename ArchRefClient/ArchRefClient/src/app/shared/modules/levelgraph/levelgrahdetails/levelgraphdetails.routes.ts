import { LevelGraphDetailsComponent } from './levelgrahdetails.component';
import { Route } from '@angular/router';

/*******************************************************************************************************************
 *
 * @route LevelGraphDetailsRoutes - Path for the navigation to the RepositoryDetailsComponent
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export const LevelGraphDetailsRoutes: Route[] = [
  {
    path: 'levelgraph',
    component: LevelGraphDetailsComponent
  }
];
