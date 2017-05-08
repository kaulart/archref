import { ModellingComponent } from './modelling.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
    imports: [Ng2BootstrapModule.forRoot(), Ng2DragDropModule, CommonModule, FormsModule],
    declarations: [ModellingComponent],
    exports: [ModellingComponent]
})

export class ModellingModule {}