import { NodeTemplateModule } from '../../nodetemplate/nodetemplate.module';
import { RelationshipTemplateModule } from '../../relationshiptemplate/relationshiptemplate.module';
import { TopologyTemplateDetailsComponent } from './topologytemplatedetails.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
  imports: [NodeTemplateModule, RelationshipTemplateModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
  declarations: [TopologyTemplateDetailsComponent],
  exports: [TopologyTemplateDetailsComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - TopologyTemplateDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                           should be accessible in the TopologyTemplateDetailsModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class TopologyTemplateDetailsModule {

}
