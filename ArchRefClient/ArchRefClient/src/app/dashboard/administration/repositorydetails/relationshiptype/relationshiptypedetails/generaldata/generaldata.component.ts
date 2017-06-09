import { Logger } from '../../../../../../../logger/logger';
import { RelationshipType } from '../../../../../../shared/datamodels/types/relationshiptype';
import { RelationshipTypeService } from '../../../../../../shared/dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

const URL = 'api/icon';


@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})
export class GeneralDataComponent implements OnInit {

  @Input()
  currentRelationshipType: RelationshipType;
  submitted = false;

  public uploader: FileUploader = new FileUploader({ url: URL });
  public flashMessage = new FlashMessage();
  constructor(private relationshipTypeService: RelationshipTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
  }

  updateRelationshipType() {
      this.relationshipTypeService.updateRelationshipType(this.currentRelationshipType).subscribe(relationshipTypeResponse => {
      this.flashMessage.message = 'NodeType with id: ' + relationshipTypeResponse.id + ' and name: ' + relationshipTypeResponse.name + ' was updated sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
      Logger.info('NodeType with id: ' + relationshipTypeResponse.id + ' and name:' + relationshipTypeResponse.name + ' was updated sucessfully.', GeneralDataComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

}
