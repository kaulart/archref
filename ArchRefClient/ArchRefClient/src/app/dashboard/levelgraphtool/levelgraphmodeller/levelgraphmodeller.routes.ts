
import { LevelGraphModellerComponent } from './levelgraphmodeller.component';
import { Route } from '@angular/router';

/*******************************************************************************************************************
 *
 * @route LevelGraphModellerRoutes path for the navigation handling in the front-end
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export const LevelGraphModellerRoutes: Route[] = [
    {
      path: 'levelgraphmodeller',
      component: LevelGraphModellerComponent,
    }
];
