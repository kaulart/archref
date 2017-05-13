import { Repository } from '../../../../shared/datamodel/repository';
import { RelationshipType } from '../../../../shared/datamodel/topologymodel/relationshiptype';
import { RelationshipTypeService } from '../../../../shared/dataservices/relationshiptype.service';
import { Utility } from '../../../../utility';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'api/icon';
@Component({
  selector: 'app-relationshiptype',
  inputs: ['currentRepository'],
  templateUrl: './relationshiptype.component.html',
  styleUrls: ['./relationshiptype.component.css']
})
export class RelationshipTypeComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver:boolean = false;
  currentRepository: Repository = new Repository('');

  constructor(private relationshipTypeService: RelationshipTypeService) { }

  ngOnInit() {
  }

  private createRelationshipType(name: string) {
        alert(this.currentRepository);
    let relationshipType: RelationshipType = new RelationshipType(name, this.currentRepository);
    this.relationshipTypeService.createRelationshipType(relationshipType).subscribe(createdRelationshipType => this.currentRepository.relationshipTypeList.push(createdRelationshipType));
  }

  private deleteRelationshipType(id: number) {
    alert("DeleteRelationType");
    event.stopPropagation();
    this.relationshipTypeService.deleteRelationshipType(id).subscribe(res => this.currentRepository.relationshipTypeList = Utility.deleteElementFromArry(id, this.currentRepository.relationshipTypeList));
  }

}
