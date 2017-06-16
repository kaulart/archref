import { LevelGraphRelationComponent } from './levelgraphrelation.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [LevelGraphRelationComponent],
  exports: [LevelGraphRelationComponent]
})

export class LevelGraphRelationModule {}
