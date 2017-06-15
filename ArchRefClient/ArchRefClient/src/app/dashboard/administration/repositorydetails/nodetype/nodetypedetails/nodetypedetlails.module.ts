import { PropertyModule } from '../../../../../shared/property.module';
import { GeneralDataComponent } from './generaldata/generaldata.component';
import { NodeTypeDetailsComponent } from './nodetypedetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
    imports: [CommonModule, FileUploadModule, RouterModule, Ng2BootstrapModule.forRoot(), PropertyModule],
    declarations: [NodeTypeDetailsComponent, GeneralDataComponent],
    exports: [NodeTypeDetailsComponent, GeneralDataComponent]
})

export class NodeTypeDetailsModule { }
