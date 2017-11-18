import { LevelGraphModellerComponent } from './levelgraphmodeller/levelgraphmodeller.component';
import { LevelGraphModule } from '../../shared/modules/levelgraph/levelgraphmodule';
import { NodeTypeDetailsModule } from '../../shared/modules/types/nodetype/nodetypedetails/nodetypedetlails.module';
import { RelationshipTypeDetailsModule } from '../../shared/modules/types/relationshiptype/relationshiptypedetails/relationshipdetails.module';
import { LevelGraphToolComponent } from './levelgraphtool.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { ContextMenuModule } from 'ngx-contextmenu'


@NgModule({
  imports: [ ContextMenuModule, LevelGraphModule, NodeTypeDetailsModule, RelationshipTypeDetailsModule, FileUploadModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
  declarations: [LevelGraphToolComponent, LevelGraphModellerComponent ],
  exports: [LevelGraphToolComponent, LevelGraphModellerComponent ]
})

/*******************************************************************************************************************
 *
 * @module - LevelGraphToolModule for importing other modules and declaration/export the components
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************/
export class LevelGraphToolModule { }
