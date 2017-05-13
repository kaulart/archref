import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeModule } from './home/home.module';
import { DashboardComponent } from './dashboard.component';
import { TopNavComponent} from '../shared/index';
import { SidebarComponent} from '../shared/index';
import { ModellingModule } from './topologyRefinementTool/modelling.module';
import { AdministrationComponent } from './administration/administration.component';
import { RepositoryComponent } from './administration/repository/repository.component';
import { LevelGraphModellerComponent } from './levelgraphtool/levelgraphmodeller/levelgraphmodeller.component';
import { LevelGraphToolComponent } from './levelgraphtool/levelgraphtool.component';
import { NodeTypeComponent } from './administration/repository/nodetype/nodetype.component';
import { RelationshipTypeComponent } from './administration/repository/relationshiptype/relationshiptype.component';
import { PolicyTypeComponent } from './administration/repository/policytype/policytype.component';
import { ArtifactTypeComponent } from './administration/repository/artifacttype/artifacttype.component';
import { RequirementTypeComponent } from './administration/repository/requirementtype/requirementtype.component';
import { CapabilityTypeComponent } from './administration/repository/capabilitytype/capabilitytype.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      HomeModule,
      ModellingModule,
      FileUploadModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, LevelGraphToolComponent, AdministrationComponent, RepositoryComponent, LevelGraphModellerComponent, NodeTypeComponent, RelationshipTypeComponent, PolicyTypeComponent, ArtifactTypeComponent, RequirementTypeComponent, CapabilityTypeComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
