
import { Logger } from '../../../../../logger/logger';
import { LevelGraphNode } from '../../../datamodels/levelgraph/levelgraphnode';
import { LevelGraphNodeService } from '../../../dataservices/levelgraph/levelgraphnode.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-levelgraphnodedetails',
  templateUrl: './levelgraphnodedetails.component.html',
  styleUrls: ['./levelgraphnodedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphNodeDetailsComponent - Lazy loaded component as wrapper for all other components in the LevelGraphNodeDetailsComponent
 *
 * @field - currentLevelGraphNode: LevelGraphNode - LevelGraphNode which is currently displayed
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 *
 * @author Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphNodeDetailsComponent implements OnInit {

  currentLevelGraphNode: LevelGraphNode = new LevelGraphNode();
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private levelGraphNodeService: LevelGraphNodeService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphNodeDetailsComponent', LevelGraphNodeDetailsComponent.name);
    this.route.queryParams.subscribe(params => {
      this.currentLevelGraphNode.id = params['id'] || null;
    });

    this.retrieveLevelGraphNode(this.currentLevelGraphNode.id);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraphNode - Call the LevelGraphNodeService for loading LevelGraphNode from database into the application and subscribe for a callback.
   *
   * @param - id: number - ID of the LevelGraphNode which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveLevelGraphNode(id: number) {
    Logger.info('Retrieve LevelGraphNode Data', LevelGraphNodeDetailsComponent.name);
    this.levelGraphNodeService.getLevelGraphNode(id)
      .subscribe(levelGraphNodeResponse => {
        this.currentLevelGraphNode = levelGraphNodeResponse;
        Logger.info('LevelGraphNode sucessfully retrieved.', LevelGraphNodeDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
