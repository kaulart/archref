import { Logger } from '../../../../../logger/logger';
import { Utility } from '../../../../utility';
import { Entity } from '../../../datamodels/entity/entity';
import { ExpectedProperty } from '../../../datamodels/metrics/expectedproperty';
import { ExpectedPropertyService } from '../../../dataservices/metrics/expectedproperty.service';
import { RelationshipTypeService } from '../../../dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-expectedproperty',
  templateUrl: './expectedproperty.component.html',
  styleUrls: ['./expectedproperty.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - ExpectedPropertyComponent - The component retrieve all available ExpectedProperty of the currently selected Entity
 *                                          from the database and list them. You can create, delete or edit the ExpectedProperty.
 *
 * @field/@input - entity: Entity -  Parent of the ExpectedProperty
 * @field - createdExpectedProperty: ExpectedProperty - ExpectedProperty which should be created
 * @field - editExpectedProperty: ExpectedProperty - ProvidedProperty which should be edit
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class ExpectedPropertyComponent implements OnInit {

  @Input()
  entity: Entity;

  createdExpectedProperty: ExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');
  editExpectedProperty: ExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');

  public flashMessage = new FlashMessage();

  constructor(private relationshipTypeService: RelationshipTypeService,
    private expectedPropertyService: ExpectedPropertyService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize ExpectedPropertyComponent', ExpectedPropertyComponent.name);
    this.flashMessage.timeoutInMS = 4000;
    this.createdExpectedProperty.entityExpected = this.entity;
    this.createdExpectedProperty.entityExpectedId = this.entity.id;
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - createExpectedProperty - Call the ExpectedPropertyService for creating a new ExpectedProperty in the database
   *                                    and subscribe for a callback
   *
   *******************************************************************************************************************************************************************************************************/
  createExpectedProperty() {
    Logger.info('Create ExpectedProperty', ExpectedPropertyComponent.name);
    this.expectedPropertyService.createExpectedProperty(this.createdExpectedProperty).subscribe(responseExpectedProperty => {
      this.entity.expectedProperties.push(responseExpectedProperty);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - updateExpectedProperty - Call the ExpectedPropertyService for updating the ExpectedProperty in the database and subscribe for a callback.
   *
   * @param - name: string - New name of the ExpectedProperty
   *
   *******************************************************************************************************************************************************************************************************/
  updateExpectedProperty(name: string, value: string) {
    this.editExpectedProperty.name = name;
    this.editExpectedProperty.value = value;
    Logger.info('Update ExpectedProperty', ExpectedPropertyComponent.name);
    this.expectedPropertyService.updateExpectedProperty(this.editExpectedProperty).subscribe(responseExpectedProperty => {
      this.entity.expectedProperties = Utility.updateElementInArry(responseExpectedProperty, this.entity.expectedProperties);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - deleteExpectedProperty - Call the ExpectedPropertyService for delete a ExpectedProperty from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the ExpectedProperty witch should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  deleteExpectedProperty(id: number) {
    Logger.info('Delete ExpectedProperty', ExpectedPropertyComponent.name);
    this.expectedPropertyService.deleteExpectedProperty(id).subscribe(response => {
      this.entity.expectedProperties = Utility.updateElementInArry(id, this.entity.expectedProperties);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - setExpectedProperty - Set the editable ExpectedProperty Data
   * @param - expectedProperty: ExpectedProperty - The ExpectedProperty witch should be edit
   *
   *******************************************************************************************************************************************************************************************************/
  setExpectedProperty(expectedProperty: ExpectedProperty) {
    this.editExpectedProperty = expectedProperty;
  }
}
