import { Route } from '@angular/router';
import { DashboardComponent } from './index';
import { AdministrationRoutes } from './administration/administration.routes';
import { NodeTypeDetailsRoutes } from './administration/repositorydetails/nodetype/nodetypedetails/nodetypedetails.routes';
import { RelationshipDetailsRoutes } from './administration/repositorydetails/relationshiptype/relationshiptypedetails/relationshipdetails.routes';
import { RepositoryDetailsRoutes } from './administration/repositorydetails/repositorydetails.routes';
import { LevelGraphModellerRoutes } from './levelgraphtool/levelgraphmodeller/levelgraphmodeller.routes';
import { LevelGraphToolRoutes } from './levelgraphtool/levelgraphtool.routes';
import { TopologyModellerRoutes } from './topologytool/topologymodeller/topologymodeller.routes';
import { TopologyTemplateToolRoutes } from './topologytool/topologytemplatetool.routes';

/*******************************************************************************************************************
 *
 * @route DashboardRoutes - Path for the navigation handling in the front-end for all components and modules which
 *                          should be accessible from the DashboardModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...AdministrationRoutes,
      ...LevelGraphToolRoutes,
      ...TopologyTemplateToolRoutes,
      ...LevelGraphModellerRoutes,
      ...TopologyModellerRoutes,
      ...RepositoryDetailsRoutes,
      ...NodeTypeDetailsRoutes,
      ...RelationshipDetailsRoutes
    ]
  }
];
