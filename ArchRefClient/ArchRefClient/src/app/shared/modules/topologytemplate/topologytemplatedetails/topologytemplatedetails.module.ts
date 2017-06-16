import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { NodeTemplateComponent } from '../nodetemplate/nodetemplate.component';
import { RelationshipTemplateComponent } from '../relationshiptemplate/relationshiptemplate.component';
import { NodetemplatedetailsComponent } from '../nodetemplate/nodetemplatedetails/nodetemplatedetails.component';
import { GeneraldataComponent } from '../nodetemplate/nodetemplatedetails/generaldata/generaldata.component';
import { RelationshiptemplatedetailsComponent } from '../relationshiptemplate/relationshiptemplatedetails/relationshiptemplatedetails.component';

@NgModule({
  imports: [CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
  declarations: [ NodeTemplateComponent, RelationshipTemplateComponent, NodetemplatedetailsComponent, GeneraldataComponent, RelationshiptemplatedetailsComponent],
  exports: []
})

/*******************************************************************************************************************
 *
 * @module TopologyTemplateDetailsModule - Lazy loaded module as wrapper for all application modules and components which
 *                                         should be accessible in the TopologyTemplateDetailsModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export class TopologyTemplateDetailsModule {

}
