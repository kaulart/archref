import { Route } from '@angular/router';
import { DashboardComponent } from './index';
import { AdministrationRoutes } from './administration/administration.routes';
import { NodeTypeDetailsRoutes } from './administration/repository/nodetype/nodetypedetails/nodetypedetails.routes';
import { RepositoryRoutes } from './administration/repository/repository.routes';
import { LevelGraphModellerRoutes } from './levelgraphtool/levelgraphmodeller/levelgraphmodeller.routes';
import { LevelGraphToolRoutes } from './levelgraphtool/levelgraphtool.routes';
import { TopologyModellerRoutes } from './topologytool/topologymodeller/topologymodeller.routes';
import { TopologyToolRoutes } from './topologytool/topologytool.routes';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...AdministrationRoutes,
      ...RepositoryRoutes,
      ...LevelGraphToolRoutes,
      ...TopologyToolRoutes,
      ...LevelGraphModellerRoutes,
      ...TopologyModellerRoutes,
      ...NodeTypeDetailsRoutes
    ]
  }
];
