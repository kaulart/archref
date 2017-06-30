import { TopologyModellerComponent } from './topologymodeller/topologymodeller.component';
import { TopologyTemplateModule } from '../../shared/modules/topologytemplate/topologytemplatemodule';
import { TopologyTemplateToolComponent } from './topologytemplatetool.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { ContextmenuModule } from 'ng2-contextmenu';

@NgModule({
    imports: [TopologyTemplateModule, ContextmenuModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [TopologyTemplateToolComponent, TopologyModellerComponent],
    exports: [TopologyTemplateToolComponent, TopologyModellerComponent]
})

/****************************************************************************************************************************************
 *
 * @module - TopologyTemplateToolModule - Lazy loaded module as wrapper for all components which should be accessible in the
 *                                        TopologyToolModule
 *
 * @author - Arthur Kaul
 *
 ***************************************************************************************************************************************/
export class TopologyTemplateToolModule { }
