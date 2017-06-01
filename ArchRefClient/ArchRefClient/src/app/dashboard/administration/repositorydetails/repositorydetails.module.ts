import { NodeTypeComponent } from './nodetype/nodetype.component';
import { NodeTypeDetailsModule } from './nodetype/nodetypedetails/nodetypedetlails.module';
import { RelationshipTypeComponent } from './relationshiptype/relationshiptype.component';
import { RelationshipTypeDetailsModule } from './relationshiptype/relationshiptypedetails/relationshipdetails.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [NodeTypeDetailsModule, RelationshipTypeDetailsModule, CommonModule, FileUploadModule, RouterModule, Ng2BootstrapModule.forRoot()],
    declarations: [ NodeTypeComponent, RelationshipTypeComponent],
    exports: [ NodeTypeComponent, RelationshipTypeComponent]
})

export class RepositoryDetailsModule { }
