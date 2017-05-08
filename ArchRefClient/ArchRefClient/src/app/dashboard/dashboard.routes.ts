import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';

import { DashboardComponent } from './index';
import { ModellingRoutes } from './topologyRefinementTool/modelling.routes';
import { AdministrationRoutes } from './administration/administration.routes';
import { RepositoryRoutes } from './administration/repository/repository.routes';
import { LevelGraphModellerRoutes } from './levelgraphtool/levelgraphmodeller/levelgraphmodeller.routes';
import { LevelGraphToolRoutes } from './levelgraphtool/levelgraphtool.routes';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...HomeRoutes,
        ...ModellingRoutes,
        ...AdministrationRoutes,
        ...RepositoryRoutes,
        ...LevelGraphToolRoutes,
        ...LevelGraphModellerRoutes
      ]
    }
];
