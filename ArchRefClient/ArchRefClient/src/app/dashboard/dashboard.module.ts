import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';


import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import { ModellingModule } from './architectureRefinementTool/modelling.module';
import { LevelgraphmodellingComponent } from './levelGraphModellingTool/levelgraphmodelling.component';
import { AdministrationComponent } from './administration/administration.component';
import { RepositoryComponent } from './administration/repository/repository.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      HomeModule,
      ModellingModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, LevelgraphmodellingComponent, AdministrationComponent, RepositoryComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
