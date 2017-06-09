import { Logger } from '../../../../../../../logger/logger';
import { NodeType } from '../../../../../../shared/datamodels/types/nodetype';
import { NodeTypeService } from '../../../../../../shared/dataservices/types/nodetype.service';
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
  currentNodeType: NodeType;
  submitted = false;

  public uploader: FileUploader = new FileUploader({ url: URL });
  public flashMessage = new FlashMessage();
  constructor(private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
  }

  updateNodeType() {
      this.nodeTypeService.updateNodeType(this.currentNodeType).subscribe(nodeTypeResponse => {
      this.flashMessage.message = 'NodeType with id: ' + nodeTypeResponse.id + ' and name: ' + nodeTypeResponse.name + ' was updated sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
      Logger.info('NodeType with id: ' + nodeTypeResponse.id + ' and name:' + nodeTypeResponse.name + ' was updated sucessfully.', GeneralDataComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

}
