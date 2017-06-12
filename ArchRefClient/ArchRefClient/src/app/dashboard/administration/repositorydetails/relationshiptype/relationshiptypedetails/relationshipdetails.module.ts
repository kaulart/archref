import { GeneralDataComponent } from './generaldata/generaldata.component';
import { RelationshipTypeDetailsComponent } from './relationshiptypedetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { ExpectedPropertyComponent } from './expectedproperty/expectedproperty.component';
import { ProvidedPropertyComponent } from './providedproperty/providedproperty.component';


@NgModule({
    imports: [CommonModule, FileUploadModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [RelationshipTypeDetailsComponent, GeneralDataComponent, ExpectedPropertyComponent, ProvidedPropertyComponent],
    exports: [RelationshipTypeDetailsComponent, GeneralDataComponent]
})

export class RelationshipTypeDetailsModule { }
