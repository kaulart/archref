import { RelationshipTemplateComponent } from './relationshiptemplate.component';
import { RelationshipTemplateDetailsModule } from './relationshiptemplatedetails/relationshiptemplatedetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RelationshipTemplateDetailsModule
  ],
  declarations: [RelationshipTemplateComponent],
  exports: [RelationshipTemplateComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - RelationshipTemplateModule - Lazy loaded module as wrapper for all application modules and components which should be accessible in the RelationshipTemplateModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RelationshipTemplateModule {}
