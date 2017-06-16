import { NodeTypeComponent } from '../../types/nodetype/nodetype.component';
import { NodeTypeDetailsModule } from '../../types/nodetype/nodetypedetails/nodetypedetlails.module';
import { RelationshipTypeModule } from '../../types/relationshiptype/relationshiptypemodule';
import { RepositoryDetailsComponent } from './repositorydetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [NodeTypeDetailsModule,
    CommonModule,
    FileUploadModule,
    RelationshipTypeModule,
    RouterModule,
    Ng2BootstrapModule.forRoot()],
  declarations: [NodeTypeComponent, RepositoryDetailsComponent],
  exports: [NodeTypeComponent, RepositoryDetailsComponent]
})

/*******************************************************************************************************************
 *
 * @module RepositoryDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                   should be accessible in the RepositoryDetailsModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export class RepositoryDetailsModule { }
