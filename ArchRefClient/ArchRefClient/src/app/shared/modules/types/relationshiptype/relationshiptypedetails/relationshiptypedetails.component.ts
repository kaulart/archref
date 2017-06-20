import { Logger } from '../../../../../../logger/logger';
import { RelationshipType } from '../../../../../shared/datamodels/types/relationshiptype';
import { RelationshipTypeService } from '../../../../../shared/dataservices/types/relationshiptype.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-relationshiptypedetails',
  templateUrl: './relationshiptypedetails.component.html',
  styleUrls: ['./relationshiptypedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - RelationshipTypeDetailsComponent Class - The component displays the detaisl of a RelationshipType Object.
 *
 *
 * @field - currentRelationshipType: RelationshipType -  RelationshipType which is currently selected
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RelationshipTypeDetailsComponent implements OnInit {

  currentRelationshipType: RelationshipType = new RelationshipType();

  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private relationshipTypeService: RelationshipTypeService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize RelationshipTypeDetails Component', RelationshipTypeDetailsComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentRelationshipType.id = params['id'] || null;
    });

    this.retrieveRelationshipType(this.currentRelationshipType.id);

  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveRelationshipType - Load RelationshipType with id from the database
   *
   * @param - id: number - ID of the RelationshipType witch should be loaded
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveRelationshipType(id: number) {
     Logger.info('Retrieve RelationshipType Data', RelationshipTypeDetailsComponent.name);
    this.relationshipTypeService.getRelationshipType(id)
      .subscribe(relationshipTypeResponse => {
        this.currentRelationshipType = relationshipTypeResponse;
        Logger.info('Relationship Type sucessfully retrieved.', RelationshipTypeDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }
}
