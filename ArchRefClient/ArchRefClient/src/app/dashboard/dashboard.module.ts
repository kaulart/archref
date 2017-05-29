import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardComponent } from './dashboard.component';
import { TopNavComponent } from '../shared/index';
import { FlashMessageModule } from 'angular2-flash-message';
import { AdministrationComponent } from './administration/administration.component';
import { RepositoryComponent } from './administration/repository/repository.component';
import { LevelGraphModellerComponent } from './levelgraphtool/levelgraphmodeller/levelgraphmodeller.component';
import { LevelGraphToolComponent } from './levelgraphtool/levelgraphtool.component';
import { NodeTypeComponent } from './administration/repository/nodetype/nodetype.component';
import { GeneralDataComponent } from './administration/repository/nodetype/nodetypedetails/generaldata/generaldata.component';
import { RelationshipTypeComponent } from './administration/repository/relationshiptype/relationshiptype.component';
import { TopologyToolComponent } from './topologytool/topologytool.component';
import { TopologyModellerComponent } from './topologytool/topologymodeller/topologymodeller.component';
import { ContextmenuModule } from 'ng2-contextmenu';
import { MdSliderModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NodeTypeDetailsComponent } from './administration/repository/nodetype/nodetypedetails/nodetypedetails.component';
import { PropertyComponent } from './administration/repository/nodetype/nodetypedetails/property/property.component';



@NgModule({
  imports: [
BrowserAnimationsModule,
    MdSliderModule,
    FlashMessageModule,
    ContextmenuModule,
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    FileUploadModule
  ],
  declarations: [GeneralDataComponent, NodeTypeDetailsComponent, DashboardComponent, TopNavComponent, LevelGraphToolComponent, AdministrationComponent, RepositoryComponent, LevelGraphModellerComponent, NodeTypeComponent, RelationshipTypeComponent, TopologyToolComponent, TopologyModellerComponent, PropertyComponent],
  exports: [DashboardComponent, TopNavComponent]
})

export class DashboardModule { }
