import { TopologyModellerComponent } from './topologymodeller.component';
import { Route } from '@angular/router';

/*******************************************************************************************************************
 *
 * @route - TopologyModellerRoutes - Path to the TopologyModellerComponent
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************/
export const TopologyModellerRoutes: Route[] = [
    {
      path: 'topologymodeller',
      component: TopologyModellerComponent,
    }
];
