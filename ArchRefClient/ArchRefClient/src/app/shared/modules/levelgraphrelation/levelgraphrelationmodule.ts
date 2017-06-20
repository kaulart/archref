import { LevelGraphRelationComponent } from './levelgraphrelation.component';
import { LevelGraphRelationDetailsModule } from './levelgraphrelationdetails/levelgraphrelationdetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    LevelGraphRelationDetailsModule
  ],
  declarations: [LevelGraphRelationComponent],
  exports: [LevelGraphRelationComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphModule - Lazy loaded module as wrapper for all application modules and components which should be accessible in the LevelGraphModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphRelationModule { }
