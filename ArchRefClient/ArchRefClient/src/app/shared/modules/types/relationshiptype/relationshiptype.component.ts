import { Logger } from '../../../../../logger/logger';
import { Repository } from '../../../datamodels/repository/repository';
import { RelationshipType } from '../../../../shared/datamodels/types/relationshiptype';
import { RelationshipTypeService } from '../../../../shared/dataservices/types/relationshiptype.service';
import { Utility } from '../../../../utility';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

// URL for icon Upload
const URL = '/api/fileupload/relationshiptype';

@Component({
  selector: 'app-relationshiptype',
  templateUrl: './relationshiptype.component.html',
  styleUrls: ['./relationshiptype.component.css']
})

/*********************************************************************************************************************************************
 *
 * @component RelationshipTypeComponent Class - The component retrieve all available RelationshipType of the currently selected Repository
 *                                              from the database and list them. You can delete, import, export or edit the RelationshipType.
 *                                              Also you can select a RelationshipType and call the RelationshipTypeDetailComponent where you can see all
 *                                              data which are included in a RelationshipType.
 *
 * @field currentRepository: Repository -  Repository which is currently selected
 * @field createdRelationshipType: RelationshipType - RelationshipType which should be created
 * @field editRelationshipType: RelationshipType - RelationshipType which should be edit
 * @field flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 * @field uploader: FileUploader - UploaderSerivce for uploading files like icons to the file system of the server
 *
 * @author Arthur Kaul
 *
 ********************************************************************************************************************************************/
export class RelationshipTypeComponent implements OnInit {

  @Input()
  currentRepository: Repository;

  createdRelationshipType: RelationshipType = new RelationshipType();
  editRelationshipType: RelationshipType = new RelationshipType();
  flashMessage = new FlashMessage();
  uploader: FileUploader = new FileUploader({ url: URL });

  constructor(private relationshipTypeService: RelationshipTypeService, private flashMessageService: FlashMessageService) { }

  /*********************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   ********************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize RelationshipTypeComponent', RelationshipTypeComponent.name);
    this.flashMessage.timeoutInMS = 4000;
    this.createdRelationshipType.repositoryId = this.currentRepository.id;
    this.createdRelationshipType.repository = this.currentRepository;
  }

  /*********************************************************************************************************************************************
   *
   * @method createRelationshipType - Call the RelationshipTypeService for creating a new RelationshipType in the database
   *                            ´     and subscribe for a callback
   *
   ********************************************************************************************************************************************/
  createRelationshipType() {
    Logger.info('Create RelationshipType', RelationshipTypeComponent.name);
    this.relationshipTypeService.createRelationshipType(this.createdRelationshipType)
      .subscribe(relationshipTypeResponse => {
        let tempURL = URL + '/' + relationshipTypeResponse.id;
        this.uploader.setOptions({ url: tempURL });
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          relationshipTypeResponse.icon = item.url + '/' + response;
          this.relationshipTypeService.updateRelationshipType(relationshipTypeResponse).subscribe();
        };
        this.currentRepository.relationshipTypeList.push(relationshipTypeResponse);
        Logger.info('RelationshipType with name: ' + relationshipTypeResponse.name + ' was created sucessfully with id: ' + relationshipTypeResponse.id, RelationshipTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*********************************************************************************************************************************************
   *
   * @method updateRelationshipType - Call the RelationshipTypeService for updating the RelationshipType in the database and subscribe for a callback.
   *
   * @param name - New name of the RelationshipType
   *
   ********************************************************************************************************************************************/
  updateRelationshipType(name: string) {
    Logger.info('Update RelationshipType', RelationshipTypeComponent.name);
    this.editRelationshipType.name = name;
    this.relationshipTypeService.updateRelationshipType(this.editRelationshipType)
      .subscribe(relationshipTypeResponse => {
        this.currentRepository.relationshipTypeList = Utility.updateElementInArry(relationshipTypeResponse, this.currentRepository.relationshipTypeList);
        Logger.info('RelationshipType with id: ' + relationshipTypeResponse.id + ' and name:' + relationshipTypeResponse.name + ' was updated sucessfully.', RelationshipTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*********************************************************************************************************************************************
   *
   * @method deleteRelationshipType - Call the RelationshipTypeService for delete a RelationshipType from the database and subscribe for a callback.
   *
   * @param id: number - ID of the RelationshipType witch should be deleted from the database
   *
   ********************************************************************************************************************************************/
  deleteRelationshipType(id: number) {
    Logger.info('Delete RelationshipType', RelationshipTypeComponent.name);
    this.relationshipTypeService.deleteRelationshipType(id)
      .subscribe(res =>
        this.currentRepository.relationshipTypeList = Utility.deleteElementFromArry(id, this.currentRepository.relationshipTypeList)
      );
  }

  /*****************************************************************************************************************
  *
  * Set the editable RelationshipType Data
  *
  * @param nodeType - The RelationshipType witch should be edit
  *
  ****************************************************************************************************************/
  setEditRelationshipType(editRelationshipType: RelationshipType) {
    this.editRelationshipType = editRelationshipType;
  }

}
