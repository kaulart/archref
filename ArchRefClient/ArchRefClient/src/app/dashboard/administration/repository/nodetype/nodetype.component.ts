import { Logger } from '../../../../../logger/logger';
import { Repository } from '../../../../shared/datamodel/repository';
import { NodeType } from '../../../../shared/datamodel/topologymodel/nodetype';
import { NodeTypeService } from '../../../../shared/dataservices/nodetype.service';
import { Utility } from '../../../../utility';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

const URL = 'api/icon';

@Component({
  selector: 'app-nodetype',
  templateUrl: './nodetype.component.html',
  styleUrls: ['./nodetype.component.css']
})

/*****************************************************************************************************************
 *
 * NodeTypeComponent - Overview of the NodeTypeData
 *
 *****************************************************************************************************************/
export class NodeTypeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });

  @Input()
  currentRepository: Repository;

  public editNodeType: NodeType = new NodeType(null, null);
  public flashMessage = new FlashMessage();

  constructor(private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.flashMessage.timeoutInMS = 4000;
  }

  /****************************************************************************************************************
   *
   *  Create NodeType
   *  @param name: string - Name of the NodeType
   *
   ****************************************************************************************************************/
  createNodeType(name: string) {
    Logger.info('Create NodeType', NodeTypeComponent.name);
    let nodeType: NodeType = new NodeType(name, this.currentRepository);
    this.nodeTypeService.createNodeType(nodeType)
      .subscribe(nodeTypeResponse => {
        this.currentRepository.nodeTypeList.push(nodeTypeResponse);
        this.flashMessage.message = 'Info: NodeType with name: ' + nodeTypeResponse.name + ' was created sucessfully with id: ' + nodeTypeResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('NodeType with name: ' + nodeTypeResponse.name + ' was created sucessfully with id: ' + nodeTypeResponse.id, NodeTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   *  Update NodeType
   *  @param name: string - New Name of the NodeType
   *
   ****************************************************************************************************************/
  updateNodeType(name: string) {
    Logger.info('Update NodeType', NodeTypeComponent.name);
    this.editNodeType.name = name;
    this.nodeTypeService.updateNodeType(this.editNodeType)
      .subscribe(nodeTypeResponse => {
        this.currentRepository.nodeTypeList = Utility.updateElementInArry(nodeTypeResponse, this.currentRepository.nodeTypeList);
        this.flashMessage.message = 'NodeType with id: ' + nodeTypeResponse.id + ' and name: ' + nodeTypeResponse.name + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('NodeType with id: ' + nodeTypeResponse.id + ' and name:' + nodeTypeResponse.name + ' was updated sucessfully.', NodeTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        });
  }

  /****************************************************************************************************************
   *
   *  Delete NodeType
   *  @param id: number -  ID of the NodeType witch should be deleted from the database
   *
   ****************************************************************************************************************/
  deleteNodeType(id: number) {
    Logger.info('Delete NodeType', NodeTypeComponent.name);
    this.nodeTypeService.deleteNodeType(id)
      .subscribe(nodeTypeResponse => {
        this.currentRepository.nodeTypeList = Utility.deleteElementFromArry(id, this.currentRepository.nodeTypeList);
        this.flashMessage.message = 'NodeType with id: ' + id + ' was deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('NodeType with id: ' + id + ' was deleted sucessfully.', NodeTypeComponent.name);
      }, (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************
   *
   * Set the editable NodeType Data
   * @param nodeType - The nodeType witch should be edit
   *
   ****************************************************************************************************************/
  setEditNodeType(nodeType: NodeType) {
    this.editNodeType = nodeType;
  }

}
