import { GeneralDataComponent } from './generaldata/generaldata.component';
import { PropertyComponent } from './property/property.component';
import { RelationshipTypeDetailsComponent } from './relationshiptypedetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
    imports: [CommonModule, FileUploadModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [RelationshipTypeDetailsComponent, PropertyComponent, GeneralDataComponent],
    exports: [RelationshipTypeDetailsComponent, PropertyComponent, GeneralDataComponent]
})

export class RelationshipTypeDetailsModule { }
