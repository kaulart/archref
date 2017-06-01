import { LevelGraphModellerComponent } from './levelgraphmodeller/levelgraphmodeller.component';
import { LevelGraphComponent } from './levelgraph.component';
import { LevelGraphToolComponent } from './levelgraphtool.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { ContextmenuModule } from 'ng2-contextmenu';


@NgModule({
    imports: [ContextmenuModule, CommonModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [LevelGraphToolComponent, LevelGraphComponent, LevelGraphModellerComponent],
    exports: [LevelGraphToolComponent, LevelGraphComponent,  LevelGraphModellerComponent]
})

export class LevelGraphToolModule { }
