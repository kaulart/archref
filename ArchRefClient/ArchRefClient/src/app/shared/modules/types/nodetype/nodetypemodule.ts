import { NodeTypeComponent } from './nodetype.component';
import { NodeTypeDetailsModule } from './nodetypedetails/nodetypedetlails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    FileUploadModule,
    FormsModule,
    CommonModule,
    NodeTypeDetailsModule,
    RouterModule
  ],
  declarations: [NodeTypeComponent],
  exports: [NodeTypeComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - NodeTypeModule - Lazy loaded module as wrapper for all application modules and components which
 *                            should be accessible in the NodeTypeModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTypeModule { }
