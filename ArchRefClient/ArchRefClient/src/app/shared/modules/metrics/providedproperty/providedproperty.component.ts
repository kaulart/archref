
import { Logger } from '../../../../../logger/logger';
import { Utility } from '../../../../utility';
import { Entity } from '../../../datamodels/entity/entity';
import { ProvidedProperty } from '../../../datamodels/metrics/providedproperty';
import { ProvidedPropertyService } from '../../../dataservices/metrics/providedpropertyservice.service';
import { RelationshipTypeService } from '../../../dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-providedproperty',
  templateUrl: './providedproperty.component.html',
  styleUrls: ['./providedproperty.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component ProvidedPropertyComponent Class - The component retrieve all available ProvidedProperty of the currently selected Entity
 *                                              from the database and list them. You can create, delete or edit the ProvidedProperty.
 *
 * @field/@input - entity: Entity -  Parent of the Property
 * @field - createdProvidedProperty: ProvidedProperty - ProvidedProperty which should be created
 * @field - editProvidedProperty: ProvidedProperty - ProvidedProperty which should be edit
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class ProvidedPropertyComponent implements OnInit {

  @Input()
  entity: Entity;

  @Input()
  providedProperties: ProvidedProperty[];

  createdProvidedProperty: ProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');
  editProvidedProperty: ProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');

  public flashMessage = new FlashMessage();

  constructor(private relationshipTypeService: RelationshipTypeService,
    private providedPropertyService: ProvidedPropertyService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize ProvidedPropertyComponent', ProvidedPropertyComponent.name);
    this.flashMessage.timeoutInMS = 4000;
//    this.createdProvidedProperty.entityProvided = this.entity;
//    this.createdProvidedProperty.entityProvidedId = this.entity.id;
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - createProvidedProperty - Call the ProvidedPropertyService for creating a new ProvidedProperty in the database
   *                                    and subscribe for a callback
   *
   *******************************************************************************************************************************************************************************************************/
  createProvidedProperty() {
    Logger.info('Create ProvidedProperty', ProvidedPropertyComponent.name);
    this.providedPropertyService.createProvidedProperty(this.createdProvidedProperty).subscribe(responseProperty => {
      this.entity.providedProperties.push(responseProperty);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - updateProvidedProperty - Call the ProvidedPropertyService for updating the ProvidedProperty in the database and subscribe for a callback.
   *
   * @param - name: string - New name of the ProvidedProperty
   * @param - value: string - New name of the ProvidedProperty
   *
   *******************************************************************************************************************************************************************************************************/
  updateProvidedProperty(name: string, value: string) {
    Logger.info('Update ProvidedProperty', ProvidedPropertyComponent.name);
    this.editProvidedProperty.name = name;
    this.editProvidedProperty.value = name;
    this.providedPropertyService.updateProvidedProperty(this.editProvidedProperty).subscribe(responseProperty => {
      this.entity.providedProperties = Utility.updateElementInArry(responseProperty, this.entity.providedProperties);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - deleteProvidedProperty - Call the ProvidedPropertyService for delete a ProvidedProperty from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the ProvidedProperty witch should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  deleteProvidedProperty(id: number) {
    Logger.info('Delete ProvidedProperty', ProvidedPropertyComponent.name);
    this.providedPropertyService.deleteProvidedProperty(id).subscribe(response => {
      this.entity.providedProperties = Utility.deleteElementFromArry(id, this.entity.providedProperties);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - setProvidedProperty- Set the editable ProvidedProperty Data
   * @param - providedProperty: ProvidedProperty - The ProvidedProperty witch should be edit
   *
   *******************************************************************************************************************************************************************************************************/
  setProvidedProperty(providedProperty: ProvidedProperty) {
    this.editProvidedProperty = providedProperty;
  }

}
