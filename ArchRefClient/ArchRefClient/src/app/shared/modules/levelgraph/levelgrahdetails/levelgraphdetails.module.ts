import { LevelGraphNodeModule } from '../../levelgraphnode/levelgraphnodemodule';
import { LevelGraphRelationModule } from '../../levelgraphrelation/levelgraphrelationmodule';
import { LevelGraphDetailsComponent } from './levelgrahdetails.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
  imports: [LevelGraphNodeModule, LevelGraphRelationModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
  declarations: [LevelGraphDetailsComponent],
  exports: [LevelGraphDetailsComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - LevelGraphDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                     should be accessible in the LevelGraphDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphDetailsModule {

}
