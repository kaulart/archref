import { LevelGraphDetailsRoutes } from '../shared/modules/levelgraph/levelgrahdetails/levelgraphdetails.routes';
import { RepositoryDetailsRoutes } from '../shared/modules/repository/repositorydetails/repositorydetails.routes';
import { NodeTypeDetailsRoutes } from '../shared/modules/types/nodetype/nodetypedetails/nodetypedetails.routes';
import { RelationshipDetailsRoutes } from '../shared/modules/types/relationshiptype/relationshiptypedetails/relationshipdetails.routes';
import { Route } from '@angular/router';
import { AdministrationRoutes } from './administration/administration.routes';
import { DashboardComponent } from './dashboard.component';
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
      ...RelationshipDetailsRoutes,
      ...LevelGraphDetailsRoutes
    ]
  }
];
