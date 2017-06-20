import { PropertyModule } from '../../metrics/property.module';
import { GeneralDataComponent } from './generaldata/generaldata.component';
import { LevelGraphRelationDetailsComponent } from './levelgraphrelationdetails.component';
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
  declarations: [LevelGraphRelationDetailsComponent, GeneralDataComponent],
  exports: [LevelGraphRelationDetailsComponent, GeneralDataComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphRelationDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                             should be accessible in the LevelGraphRelationDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphRelationDetailsModule {}
