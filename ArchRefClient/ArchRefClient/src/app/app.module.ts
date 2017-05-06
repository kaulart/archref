import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';


import { DashboardModule } from './dashboard/dashboard.module';
import { AdministrationService } from './shared/dataservices/administration.service';
import { NodeTypeService } from './shared/dataservices/nodetype.service';
import { RelationTypeService } from './shared/dataservices/relationtype.service';

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
  providers: [AdministrationService, NodeTypeService, RelationTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
