import { Logger } from '../../../../../logger/logger';
import { Repository } from '../../../../shared/datamodels/repository';
import { RelationshipType } from '../../../../shared/datamodels/types/relationshiptype';

import { RelationshipTypeService } from '../../../../shared/dataservices/types/relationshiptype.service';
import { Utility } from '../../../../utility';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

const URL = '/api/fileupload/relationshiptype';

@Component({
  selector: 'app-relationshiptype',
  templateUrl: './relationshiptype.component.html',
  styleUrls: ['./relationshiptype.component.css']
})


/*****************************************************************************************************************
 *
 * RelationshipTypeComponent - Overview of the RelationshipTypeData
 *
 *****************************************************************************************************************/
export class RelationshipTypeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });

  @Input()
  currentRepository: Repository;

  public relationshipType: RelationshipType = new RelationshipType("Unnamed", null);
  public editRelationshipType: RelationshipType = new RelationshipType(null, null);
  public flashMessage = new FlashMessage();

  constructor(private relationshipTypeService: RelationshipTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.flashMessage.timeoutInMS = 4000;
  }

  /****************************************************************************************************************
   *
   *  Create RelationshipType
   *  @param name: string - Name of the RelationshipType
   *
   ****************************************************************************************************************/
  createRelationshipType(name: string) {
    Logger.info('Create RelationshipType', RelationshipTypeComponent.name);
    this.relationshipType.repository = this.currentRepository;
    this.relationshipTypeService.createRelationshipType( this.relationshipType)
      .subscribe(relationshipTypeResponse => {
        let tempURL = URL + '/' + relationshipTypeResponse.id;
        this.uploader.setOptions({ url: tempURL });
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          relationshipTypeResponse.icon = item.url + '/' + response;
          this.relationshipTypeService.updateRelationshipType(relationshipTypeResponse).subscribe();
        };
        this.currentRepository.relationshipTypeList.push(relationshipTypeResponse);
        this.flashMessage.message = 'Info: RelationshipType with name: ' + relationshipTypeResponse.name + ' was created sucessfully with id: ' + relationshipTypeResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('RelationshipType with name: ' + relationshipTypeResponse.name + ' was created sucessfully with id: ' + relationshipTypeResponse.id, RelationshipTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
  *
  *  Update RelationshipType
  *  @param name: string - New Name of the RelationshipType
  *
  ****************************************************************************************************************/
  updateRelationshipType(name: string) {
    Logger.info('Update RelationshipType', RelationshipTypeComponent.name);
    this.editRelationshipType.name = name;
    this.relationshipTypeService.updateRelationshipType(this.editRelationshipType)
      .subscribe(relationshipTypeResponse => {
        this.currentRepository.relationshipTypeList = Utility.updateElementInArry(relationshipTypeResponse, this.currentRepository.relationshipTypeList);
        this.flashMessage.message = 'RelationshipType with id: ' + relationshipTypeResponse.id + ' and name: ' + relationshipTypeResponse.name + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('RelationshipType with id: ' + relationshipTypeResponse.id + ' and name:' + relationshipTypeResponse.name + ' was updated sucessfully.', RelationshipTypeComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   *  Delete RelationshipType
   *  @param id: number -  ID of the RelationshipType witch should be deleted from the database
   *
   ****************************************************************************************************************/
  deleteRelationshipType(id: number) {
    Logger.info('Delete RelationshipType', RelationshipTypeComponent.name);
    this.relationshipTypeService.deleteRelationshipType(id).subscribe(res => this.currentRepository.relationshipTypeList = Utility.deleteElementFromArry(id, this.currentRepository.relationshipTypeList));
  }

  /*****************************************************************************************************************
  *
  * Set the editable RelationshipType Data
  * @param nodeType - The RelationshipType witch should be edit
  *
  ****************************************************************************************************************/
  setEditRelationshipType(editRelationshipType: RelationshipType) {
    this.editRelationshipType = editRelationshipType;
  }
}
