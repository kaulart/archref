import { LevelGraphNodeComponent } from './levelgraphnode.component';
import { LevelGraphNodeDetailsModule } from './levelgraphnodedetails/levelgraphnodedetailsmodule';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    LevelGraphNodeDetailsModule
  ],
  declarations: [LevelGraphNodeComponent],
  exports: [LevelGraphNodeComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphNodeModule - Lazy loaded module as wrapper for all application modules and components which should be accessible in the LevelGraphNodeModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphNodeModule {}
