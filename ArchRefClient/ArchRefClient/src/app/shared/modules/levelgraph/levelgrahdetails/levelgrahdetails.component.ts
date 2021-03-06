
import { Logger } from '../../../../../logger/logger';
import { LevelGraph } from '../../../datamodels/levelgraph/levelgraph';
import { LevelGraphService } from '../../../dataservices/levelgraph/levelgraph.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-levelgrahdetails',
  templateUrl: './levelgrahdetails.component.html',
  styleUrls: ['./levelgrahdetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphDetailsComponent - Lazy loaded component as wrapper for all other components in the LevelGraphDetailsComponent
 *
 * @field - currentLevelGraph: LevelGraph - LevelGraph which is currently displayed
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may
 *                                     cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphDetailsComponent implements OnInit {

  currentLevelGraph: LevelGraph = new LevelGraph();
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private levelGraphService: LevelGraphService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphDetailsComponent', LevelGraphDetailsComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentLevelGraph.id = params['id'] || null;
    });

    this.retrieveLevelGraph(this.currentLevelGraph.id);

  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraph - Call the LevelGraphService for loading repository from database into the application and subscribe for a callback.
   *
   * @param - id: number - ID of the LevelGraph which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveLevelGraph(id: number) {
    Logger.info('Retrieve LevelGraph Data', LevelGraphDetailsComponent.name);
    this.levelGraphService.getLevelGraph(id)
      .subscribe(levelGraphResponse => {
        this.currentLevelGraph = levelGraphResponse;
        Logger.info('LevelGraph sucessfully retrieved.', LevelGraphDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
