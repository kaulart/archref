import { LevelGraphModule } from '../../shared/modules/levelgraph/levelgraphmodule';
import { PropertyModule } from '../../shared/modules/metrics/property.module';
import { AdministrationComponent } from './administration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RepositoryModule } from '../../shared/modules/repository/repositorymodule';
import { TopologyTemplateModule } from '../../shared/modules/topologytemplate/topologytemplatemodule';
import { NodeTypeModule } from '../../shared/modules/types/nodetype/nodetypemodule';
import { RelationshipTypeModule } from '../../shared/modules/types/relationshiptype/relationshiptypemodule';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [FileUploadModule, LevelGraphModule, RepositoryModule, TopologyTemplateModule, NodeTypeModule, RelationshipTypeModule, PropertyModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
  declarations: [AdministrationComponent],
  exports: [AdministrationComponent]
})

/*******************************************************************************************************************
 *
 * @module - AdministrationModule - Lazy loaded module as wrapper for all application modules and components which
 *                                  should be accessible in the AdministrationModule
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************/
export class AdministrationModule { }
