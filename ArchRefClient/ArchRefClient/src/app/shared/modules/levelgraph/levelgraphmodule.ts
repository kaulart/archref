import { LevelGraphDetailsModule } from './levelgrahdetails/levelgraphdetails.module';
import { LevelGraphComponent } from './levelgraph.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LevelGraphDetailsModule,
    RouterModule
  ],
  declarations: [LevelGraphComponent],
  exports: [LevelGraphComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphModule - Lazy loaded module as wrapper for all application modules and components which
 *                            should be accessible in the LevelGraphModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphModule {}
