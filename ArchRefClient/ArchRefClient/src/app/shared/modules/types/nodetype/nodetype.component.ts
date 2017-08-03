import {Logger} from '../../../../../logger/logger';
import {Repository} from '../../../datamodels/repository/repository';
import {NodeType} from '../../../../shared/datamodels/types/nodetype';
import {NodeTypeService} from '../../../../shared/dataservices/types/nodetype.service';
import {Utility} from '../../../../utility';
import {Component, OnInit, Input} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';

// URL for icon Upload
const URL = '/api/fileupload/nodetype';

@Component({
  selector: 'app-nodetype',
  templateUrl: './nodetype.component.html',
  styleUrls: ['./nodetype.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - NodeTypeComponent - The component retrieve all available NodeType of the currently selected Repository
 *                                  from the database and list them. You can create, delete or edit the NodeType.
 *                                  Also you can select a NodeType and call the NodeTypeDetailComponent where you can see all
 *                                  data which are included in a NodeType.
 *
 * @field - currentRepository: Repository -  Repository which is currently selected
 * @field - createdNodeType: NodeType - NodeType which should be created
 * @field - editNodeType: NodeType - NodeType which should be edit
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 * @field - uploader: FileUploader - UploaderSerivce for uploading files like icons to the file system of the server
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTypeComponent implements OnInit {

  @Input()
  nodeTypes: NodeType[];

  @Input()
  repository: Repository;

  public createdNodeType: NodeType = new NodeType();
  public editNodeType: NodeType = new NodeType();
  public flashMessage = new FlashMessage();

  public uploader: FileUploader = new FileUploader({url: URL});

  constructor(private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) {}

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize NodeTypeComponent', NodeTypeComponent.name);
    this.flashMessage.timeoutInMS = 4000;
    this.createdNodeType.repository = this.repository;
    this.createdNodeType.repositoryId = this.repository.id;
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - createNodeType - Call the NodeTypeService for creating a new NodeType in the database
   *                            and subscribe for a callback
   *
   *******************************************************************************************************************************************************************************************************/
  createNodeType() {
    Logger.info('Create NodeType', NodeTypeComponent.name);
    this.nodeTypeService.createNodeType(this.createdNodeType)
      .subscribe(nodeTypeResponse => {
        let tempURL = URL + '/' + nodeTypeResponse.id;
        this.uploader.setOptions({url: tempURL});
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          nodeTypeResponse.icon = item.url + '/' + response;
          this.nodeTypeService.updateNodeType(nodeTypeResponse).subscribe();
        };
        this.nodeTypes.push(nodeTypeResponse);
        Logger.info('NodeType with name: ' + nodeTypeResponse.name + ' was created sucessfully with id: ' + nodeTypeResponse.id, NodeTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - updateNodeType - Call the NodeTypeService for updating the NodeType in the database and subscribe for a callback.
   *
   * @param - name: string - New name of the NodeType
   *
   *******************************************************************************************************************************************************************************************************/
  updateNodeType(name: string) {
    Logger.info('Update NodeType', NodeTypeComponent.name);
    this.editNodeType.name = name;
    this.nodeTypeService.updateNodeType(this.editNodeType)
      .subscribe(nodeTypeResponse => {
        this.nodeTypes = Utility.updateElementInArry(nodeTypeResponse, this.nodeTypes);
        Logger.info('NodeType with id: ' + nodeTypeResponse.id + ' and name:' + nodeTypeResponse.name + ' was updated sucessfully.', NodeTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - deleteNodeType - Call the NodeTypeService for delete a NodeType from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the NodeType witch should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  deleteNodeType(id: number) {
    Logger.info('Delete NodeType', NodeTypeComponent.name);
    this.nodeTypeService.deleteNodeType(id)
      .subscribe(nodeTypeResponse => {
        this.nodeTypes = Utility.deleteElementFromArry(id, this.nodeTypes);
        Logger.info('NodeType with id: ' + id + ' was deleted sucessfully.', NodeTypeComponent.name);
      }, (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - Set the editable NodeType Data
   *
   * @param nodeType: NodeType - The nodeType witch should be edit
   *
   *******************************************************************************************************************************************************************************************************/
  setEditNodeType(nodeType: NodeType) {
    this.editNodeType = nodeType;
  }

}
