import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';


import { DashboardModule } from './dashboard/dashboard.module';
import { AdministrationService } from './shared/dataservices/administration.service';
import { LevelGraphService } from './shared/dataservices/levelgraphservice';
import { NodeTypeService } from './shared/dataservices/nodetype.service';
import { RelationshipTypeService } from './shared/dataservices/relationshiptype.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    DashboardModule
  ],
  providers: [AdministrationService, NodeTypeService, RelationshipTypeService, LevelGraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
