import { Logger } from '../../../../../logger/logger';
import { RelationshipTemplate } from '../../../datamodels/topology/relationshiptemplate';
import { RelationshipTemplateService } from '../../../dataservices/topologytemplate/relationshiptemplate.service';
import { LevelGraphRelationDetailsComponent } from '../../levelgraphrelation/levelgraphrelationdetails/levelgraphrelationdetails.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-relationshiptemplatedetails',
  templateUrl: './relationshiptemplatedetails.component.html',
  styleUrls: ['./relationshiptemplatedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - RelationshipTemplateDetailsComponent - Lazy loaded component as wrapper for all other components in the RelationshipTemplateDetailsComponent
 *
 * @field - currentRelationshipTemplate: RelationshipTemplate - RelationshipTemplate which is currently displayed
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RelationshipTemplateDetailsComponent implements OnInit {

  currentRelationshipTemplate: RelationshipTemplate = new RelationshipTemplate(null, null, null, null, null);
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private relationshipTemplateService: RelationshipTemplateService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphRelationDetailsComponent', LevelGraphRelationDetailsComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentRelationshipTemplate.id = params['id'] || null;
    });

    this.retrieveRelationshipTemplate(this.currentRelationshipTemplate.id);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraphRelation - Call the LevelGraphRelationService for loading LevelGraphNode from database into the application and subscribe for a callback.
   *
   * @param - id: number - ID of the LevelGraphRelation which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveRelationshipTemplate(id: number) {
    Logger.info('Retrieve RelationshipTemplate Data', LevelGraphRelationDetailsComponent.name);
    this.relationshipTemplateService.getRelationshipTemplate(id)
      .subscribe(relationshipTemplateResponse => {
        this.currentRelationshipTemplate = relationshipTemplateResponse;
        Logger.info('RelationshipTemplate sucessfully retrieved.', LevelGraphRelationDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
