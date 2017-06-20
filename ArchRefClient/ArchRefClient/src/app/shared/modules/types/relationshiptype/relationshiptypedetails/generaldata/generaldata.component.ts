import { Logger } from '../../../../../../../logger/logger';
import { RelationshipType } from '../../../../../../shared/datamodels/types/relationshiptype';
import { RelationshipTypeService } from '../../../../../../shared/dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - GeneralDataComponent Class - The component displays the general data of a RelationshipType Object.
 *
 *
 * @field - currentRelationshipType: RelationshipType -  RelationshipType which is currently selected
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentRelationshipType: RelationshipType;

  public flashMessage = new FlashMessage();

  constructor(private relationshipTypeService: RelationshipTypeService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize GeneralDataComponent Component', GeneralDataComponent.name);
  }

}
