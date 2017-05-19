import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdministrationService } from './shared/dataservices/administration.service';
import { FragmentNodeService } from './shared/dataservices/fragmentnode.service';
import { LevelService } from './shared/dataservices/level.service';
import { LevelGraphNodeService } from './shared/dataservices/levelgraphnode.service';
import { LevelGraphService } from './shared/dataservices/levelgraph.service';
import { NodeTypeService } from './shared/dataservices/nodetype.service';
import { RelationshipTypeService } from './shared/dataservices/relationshiptype.service';
import { TopologyTemplateService } from './shared/dataservices/topologytemplate.service';
import { LevelGraphRelationService } from './shared/dataservices/levelgraphrelation.service';
import { ContextmenuModule } from 'ng2-contextmenu';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
   
    ContextmenuModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    DashboardModule
  ],
  providers: [AdministrationService, LevelGraphRelationService, NodeTypeService, RelationshipTypeService, LevelGraphService, LevelService, LevelGraphNodeService, TopologyTemplateService, FragmentNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
