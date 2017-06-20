import { PropertyModule } from '../../metrics/property.module';
import { GeneralDataComponent } from './generaldata/generaldata.component';
import { RelationshipTemplateDetailsComponent } from './relationshiptemplatedetails.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PropertyModule
  ],
  declarations: [RelationshipTemplateDetailsComponent, GeneralDataComponent],
  exports: [RelationshipTemplateDetailsComponent, GeneralDataComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - RelationshipTemplateDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                               should be accessible in the RelationshipTemplateDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RelationshipTemplateDetailsModule {}
