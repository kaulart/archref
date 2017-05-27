import { Logger } from '../../../logger/logger';
import { Level } from '../../shared/datamodel/levelgraphmodel/level';
import { LevelGraph } from '../../shared/datamodel/levelgraphmodel/levelgraph';
import { LevelService } from '../../shared/dataservices/level.service';
import { LevelGraphService } from '../../shared/dataservices/levelgraph.service';
import { LEVELGRAPHCONSTANTS } from '../../constants/levelgraphconstants';
import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';


@Component({
  selector: 'app-levelgraphtool',
  templateUrl: './levelgraphtool.component.html',
  styleUrls: ['./levelgraphtool.component.css']
})

/*****************************************************************************************************************
 *
 * LevelGraphToolComponent Class - Entry point for the Level Graph Modeller and for select, create, delete, update
 * or edit a Level Graph
 *
 *****************************************************************************************************************/
export class LevelGraphToolComponent implements OnInit {

  levels = 3;
  levelGraphs: LevelGraph[] = [];
  createdLevelGraph: LevelGraph;
  editedLevelGraph: LevelGraph = new LevelGraph('', 0);
  importedLevelGraph: LevelGraph;

  public flashMessage = new FlashMessage();

  constructor(private levelGraphService: LevelGraphService, private levelService: LevelService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.flashMessage.timeoutInMS = 4000;
    this.retrieveLevelGraphs();
  }

  /****************************************************************************************************************
   *
   *  Create Level Graph
   *  @param name: string - Name of the LevelGraph
   *  @numberOfLevels: number - Number of levels in the LevelGraph
   *
   ****************************************************************************************************************/
  createLevelGraph(name: string, numberOfLevels: number) {
    Logger.info('Create LevelGraph', LevelGraphToolComponent.name);
    let levelGraph: LevelGraph = new LevelGraph(name, numberOfLevels);
    this.levelGraphService.createLevelGraph(levelGraph)
      .subscribe(levelGraphResponse => {

        for (let i = 0; i < levelGraphResponse.numberOfLevels; i++) {
          let tempLevel = new Level('Level ' + (i + 1), (i + 1), true, (i * LEVELGRAPHCONSTANTS.LEVELHEIGHT + i * LEVELGRAPHCONSTANTS.LEVELGAPOFFSET), LEVELGRAPHCONSTANTS.LEVELHEIGHT, levelGraphResponse);
          this.levelService.createLevel(tempLevel)
            .subscribe(levelResponse => {
              levelGraphResponse.levels.push(levelResponse);
              this.flashMessage.message = 'Info: Level with name: ' + levelResponse.name + ' was created sucessfully with id: ' + levelResponse.id;
              this.flashMessage.isSuccess = true;
              this.flashMessageService.display(this.flashMessage);
              Logger.info('Level with name: ' + levelResponse.name + ' was created sucessfully with id: ' + levelResponse.id, LevelGraphToolComponent.name);
            },
            (error) => {
              this.flashMessage.message = error;
              this.flashMessage.isError = true;
              this.flashMessageService.display(this.flashMessage);
            });
        }
        this.levelGraphs.push(levelGraphResponse);
        this.flashMessage.message = 'Info: LevelGraph with name: ' + levelGraphResponse.name + ' was created sucessfully with id: ' + levelGraphResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('LevelGraph with name: ' + levelGraphResponse.name + ' was created sucessfully with id: ' + levelGraphResponse.id, LevelGraphToolComponent.name);
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
        this.flashMessage.message = 'Level Graphs retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Level Graphs sucessfully retrieved.', LevelGraphToolComponent.name);
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
        this.levelGraphs = Utility.updateElementInArry(levelGraphResponse.id, this.levelGraphs);
        this.flashMessage.message = 'Level Graph with id: ' + levelGraphResponse.id + ' and name: ' + levelGraphResponse.name + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Level Graph with id: ' + levelGraphResponse.id + ' and name:' + levelGraphResponse.name + ' was updated sucessfully.', LevelGraphToolComponent.name);
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
        this.flashMessage.message = 'Level Graph with id: ' + id + ' was deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Level Graph with id: ' + id + ' was deleted sucessfully.', LevelGraphToolComponent.name);
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
    if (this.levels > 1) {
      this.levels--;
    }
  }
}
