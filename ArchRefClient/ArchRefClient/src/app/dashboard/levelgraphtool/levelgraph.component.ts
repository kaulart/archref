import { Logger } from '../../../logger/logger';
import { LEVELGRAPHCONSTANTS } from '../../shared/constants/levelgraphconstants';
import { Level } from '../../shared/datamodels/levelgraph/level';
import { LevelGraph } from '../../shared/datamodels/levelgraph/levelgraph';
import { Component, OnInit } from '@angular/core';

import { FlashMessage } from 'angular2-flash-message';
import { FileUploader } from 'ng2-file-upload';
import { LevelService } from '../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../shared/dataservices/levelgraph/levelgraph.service';
import { Utility } from '../../utility';
import { FlashMessageService } from 'angular2-flash-message';

const URL = '/api/import/levelgraph';

@Component({
  selector: 'app-levelgraph',
  templateUrl: './levelgraph.component.html',
  styleUrls: ['./levelgraph.component.css']
})

/******************************************************************************************************************
 *
 * @component LevelGraphToolComponent - Entry point for the LevelGraphModellerComponent and for select,
 * create, delete, update or edit a Level Graph
 *
 * @Arthur Kaul
 *
 *****************************************************************************************************************/
export class LevelGraphComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });
  levels = 3;
  levelGraphs: LevelGraph[] = [];
  createdLevelGraph: LevelGraph = new LevelGraph();
  editedLevelGraph: LevelGraph = new LevelGraph();
  private flashMessage = new FlashMessage();

  constructor(private levelGraphService: LevelGraphService, private levelService: LevelService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.flashMessage.timeoutInMS = 4000;
    this.retrieveLevelGraphs();
  }

  /****************************************************************************************************************
   *
   *  Create Level Graph
   *  @param name: string - Name of the LevelGraph
   *  @numberOfLevels: number - Number of different levels in the LevelGraph
   *
   ****************************************************************************************************************/
  createLevelGraph(numberOfLevels: number) {

    this.levelGraphService.createLevelGraph(this.createdLevelGraph).subscribe(levelGraphResponse => {
      for (let i = 0; i < numberOfLevels; i++) {
        let tempLevel = new Level((i + 1), true, (i * LEVELGRAPHCONSTANTS.LEVELHEIGHT + i * LEVELGRAPHCONSTANTS.LEVELGAPOFFSET), LEVELGRAPHCONSTANTS.LEVELHEIGHT, levelGraphResponse.id, [], []);
        tempLevel.levelGraph = levelGraphResponse;
        this.levelService.createLevel(tempLevel)
          .subscribe(levelResponse => {
            levelGraphResponse.levels.push(levelResponse);
            Logger.info('Level was created sucessfully with id: ' + levelResponse.id, LevelGraphComponent.name);
          },
          (error) => {
            this.flashMessage.message = error;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
          });
      }
      this.levelGraphs.push(levelGraphResponse);
      Logger.info('LevelGraph with name: ' + levelGraphResponse.name + ' was created sucessfully with id: ' + levelGraphResponse.id, LevelGraphComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   *  Retrieve Level Graph
   *
   ****************************************************************************************************************/
  retrieveLevelGraphs() {
    this.levelGraphService.getLevelGraphs()
      .subscribe(levelGraphsResponse => {
        this.levelGraphs = levelGraphsResponse;
        Logger.info('Level Graphs sucessfully retrieved.', LevelGraphComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************
   *
   * Update Level Graph - Update the level graph data
   * @param name - New name of the Level Graph
   *
   *****************************************************************************************************************/
  updateLevelGraph(name: string) {
    this.editedLevelGraph.name = name;
    this.levelGraphService.updateLevelGraph(this.editedLevelGraph)
      .subscribe(levelGraphResponse => {
        this.levelGraphs = Utility.updateElementInArry(levelGraphResponse, this.levelGraphs);
        Logger.info('Level Graph with id: ' + levelGraphResponse.id + ' and name:' + levelGraphResponse.name + ' was updated sucessfully.', LevelGraphComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   * Delete Level Graph
   * @param id: number - ID of the level graph witch should be deleted from the database
   *
   ****************************************************************************************************************/
  deleteLevelGraph(id: number) {
    this.levelGraphService.deleteLevelGraph(id)
      .subscribe(response => {
        this.levelGraphs = Utility.deleteElementFromArry(id, this.levelGraphs);
        Logger.info('Level Graph with id: ' + id + ' was deleted sucessfully.', LevelGraphComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************
   *
   * Set the editable LevelGraph Data
   * @param repository - The levelGraph witch should be edit
   *
   ****************************************************************************************************************/
  setEditedLevelGraph(levelGraph: LevelGraph) {
    this.editedLevelGraph = levelGraph;
  }

  addLevel() {
    this.levels++;
  }

  removeLevel() {
    if (this.levels > 2) {
      this.levels--;
    }
  }
}
