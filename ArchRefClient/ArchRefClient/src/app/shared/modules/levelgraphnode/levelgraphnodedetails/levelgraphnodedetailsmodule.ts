import { LevelGraphRelationModule } from '../../levelgraphrelation/levelgraphrelationmodule';
import { PropertyModule } from '../../metrics/property.module';
import { GeneralDataComponent } from './generaldata/generaldata.component';
import { LevelGraphNodeDetailsComponent } from './levelgraphnodedetails.component';
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
    LevelGraphRelationModule
  ],
  declarations: [LevelGraphNodeDetailsComponent, GeneralDataComponent],
  exports: [LevelGraphNodeDetailsComponent, GeneralDataComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphNodeDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                       should be accessible in the LevelGraphNodeDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphNodeDetailsModule { }
