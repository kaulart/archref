import { RelationshipTypeComponent } from './relationshiptype.component';
import { RelationshipTypeDetailsModule } from './relationshiptypedetails/relationshipdetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    RelationshipTypeDetailsModule
  ],
  declarations: [RelationshipTypeComponent],
  exports: [RelationshipTypeComponent]
})

/*******************************************************************************************************************
 *
 * @module RelationshipTypeModule - Lazy loaded module as wrapper for all application modules and components which
 *                                  should be accessible in the RelationshipTypeModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export class RelationshipTypeModule { }
