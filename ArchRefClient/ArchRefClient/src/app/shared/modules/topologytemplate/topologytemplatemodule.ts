import { TopologyTemplateComponent } from './topologytemplate.component';
import { TopologyTemplateDetailsModule } from './topologytemplatedetails/topologytemplatedetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TopologyTemplateDetailsModule,
     RouterModule
  ],
  declarations: [TopologyTemplateComponent],
  exports: [TopologyTemplateComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - TopologyTemplateModule - Lazy loaded module as wrapper for all application modules and components which
 *                                    should be accessible in the TopologyTemplateModule
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class TopologyTemplateModule {}
