import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardComponent } from './dashboard.component';
import { TopNavComponent } from '../shared/index';
import { FlashMessageModule } from 'angular2-flash-message';
import { AdministrationModule } from './administration/administration.module';
import { LevelGraphToolModule } from './levelgraphtool/levelgraphtool.module';
import { TopologyTemplateToolModule } from './topologytool/topologytemplatetool.module';
import { ContextmenuModule } from 'ng2-contextmenu';

@NgModule({
  imports: [
    TopologyTemplateToolModule,
    FlashMessageModule,
    ContextmenuModule,
    LevelGraphToolModule,
    CommonModule,
    RouterModule,
    AdministrationModule,
    Ng2BootstrapModule.forRoot()
  ],
  declarations: [DashboardComponent, TopNavComponent],
  exports: [DashboardComponent, TopNavComponent]
})

export class DashboardModule { }
