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

export class TopologyTemplateModule {}
