import { LevelGraphToolModule } from '../levelgraphtool/levelgraphtool.module';
import { TopologyTemplateToolModule } from '../topologytool/topologytemplatetool.module';
import { AdministrationComponent } from './administration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RepositoryComponent } from './repository.component';
import { RouterModule } from '@angular/router';
import { RepositoryDetailsComponent } from './repositorydetails/repositorydetails.component';
import { RepositoryDetailsModule } from './repositorydetails/repositorydetails.module';


@NgModule({
    imports: [RepositoryDetailsModule, TopologyTemplateToolModule, LevelGraphToolModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [ AdministrationComponent, RepositoryComponent, RepositoryDetailsComponent],
    exports: [ AdministrationComponent, RepositoryComponent]
})

export class AdministrationModule { }
