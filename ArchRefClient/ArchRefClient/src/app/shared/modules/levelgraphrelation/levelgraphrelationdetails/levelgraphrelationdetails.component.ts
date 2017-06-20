import { Logger } from '../../../../../logger/logger';
import { LevelGraphRelation } from '../../../datamodels/levelgraph/levelgraphrelation';
import { LevelGraphRelationService } from '../../../dataservices/levelgraph/levelgraphrelation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-levelgraphrelationdetails',
  templateUrl: './levelgraphrelationdetails.component.html',
  styleUrls: ['./levelgraphrelationdetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphRelationDetailsComponent - Lazy loaded component as wrapper for all other components in the LevelGraphRelationDetailsComponent
 *
 * @field - currentLevelGraphRelation: LevelGraphRelation - LevelGraphRelation which is currently displayed
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphRelationDetailsComponent implements OnInit {

  currentLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private levelGraphRelationService: LevelGraphRelationService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphRelationDetailsComponent', LevelGraphRelationDetailsComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentLevelGraphRelation.id = params['id'] || null;
    });

    this.retrieveLevelGraphRelation(this.currentLevelGraphRelation.id);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraphRelation - Call the LevelGraphRelationService for loading LevelGraphNode from database into the application and subscribe for a callback.
   *
   * @param - id: number - ID of the LevelGraphRelation which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveLevelGraphRelation(id: number) {
    Logger.info('Retrieve LevelGraphRelation Data', LevelGraphRelationDetailsComponent.name);
    this.levelGraphRelationService.getLevelGraphRelation(id)
      .subscribe(levelGraphRelationResponse => {
        this.currentLevelGraphRelation = levelGraphRelationResponse;
        Logger.info('LevelGraphRelation sucessfully retrieved.', LevelGraphRelationDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
