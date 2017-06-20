import { NodeTypeModule } from '../../types/nodetype/nodetypemodule';
import { RelationshipTypeModule } from '../../types/relationshiptype/relationshiptypemodule';
import { RepositoryDetailsComponent } from './repositorydetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [NodeTypeModule,
    CommonModule,
    RelationshipTypeModule,
    RouterModule,
    Ng2BootstrapModule.forRoot()],
  declarations: [RepositoryDetailsComponent],
  exports: [RepositoryDetailsComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - RepositoryDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                     should be accessible in the RepositoryDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RepositoryDetailsModule { }
