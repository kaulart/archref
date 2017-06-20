import { NodeTypeDetailsComponent } from './nodetypedetails.component';
import { Route } from '@angular/router';

/*******************************************************************************************************************
 *
 * @route - NodeTypeDetailsRoutes - Path to the RelationshipDetailsComponent
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************/
export const NodeTypeDetailsRoutes: Route[] = [
    {
      path: 'nodetypedetails',
      component: NodeTypeDetailsComponent
    }
];
