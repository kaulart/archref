import { NodeTemplateComponent } from './nodetemplate.component';
import { NodeTemplateDetailsModule } from './nodetemplatedetails/nodetemplatedetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NodeTemplateDetailsModule
  ],
  declarations: [NodeTemplateComponent],
  exports: [NodeTemplateComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - NodeTemplateModule - Lazy loaded module as wrapper for all application modules and components which should be accessible in the NodeTemplateModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTemplateModule {}
