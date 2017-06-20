import { PropertyModule } from '../../metrics/property.module';
import { RelationshipTemplateModule } from '../../relationshiptemplate/relationshiptemplate.module';
import { GeneralDataComponent } from './generaldata/generaldata.component';
import { NodeTemplateDetailsComponent } from './nodetemplatedetails.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PropertyModule,
    RelationshipTemplateModule
  ],
  declarations: [NodeTemplateDetailsComponent, GeneralDataComponent],
  exports: [NodeTemplateDetailsComponent, GeneralDataComponent]
})


/**********************************************************************************************************************************************************************************************************
 *
 * @module - NodeTemplateDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                       should be accessible in the NodeTemplateDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTemplateDetailsModule {}
