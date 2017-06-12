import { Logger } from '../../../../logger/logger';
import { LEVELGRAPHCONSTANTS } from '../../../shared/constants/levelgraphconstants';
import { LEVELGRAPHNODETYPES } from '../../../shared/constants/levelgraphnodetype';
import { LEVELGRAPHRELATIONTYPE } from '../../../shared/constants/levelgraphrelationtype';
import { Level } from '../../../shared/datamodels/levelgraph/level';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { LevelGraphNode } from '../../../shared/datamodels/levelgraph/levelgraphnode';
import { LevelGraphRelation } from '../../../shared/datamodels/levelgraph/levelgraphrelation';
import { Path } from '../../../shared/datamodels/utility/path';
import { Point } from '../../../shared/datamodels/utility/point';
import { Repository } from '../../../shared/datamodels/repository';
import { FragmentType } from '../../../shared/datamodels/types/fragmenttype';
import { RepositoryService } from '../../../shared/dataservices/repository.service';
import { FragmentNodeService } from '../../../shared/dataservices/types/fragmenttype.service';
import { LevelService } from '../../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph/levelgraph.service';
import { LevelGraphNodeService } from '../../../shared/dataservices/levelgraph/levelgraphnode.service';
import { LevelGraphRelationService } from '../../../shared/dataservices/levelgraph/levelgraphrelation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-levelgraphmodeller',
  templateUrl: './levelgraphmodeller.component.html',
  styleUrls: ['./levelgraphmodeller.component.css']
})


/*****************************************************************************************************************
 *
 * @component - LevelGraphModellerComponent for model a LevelGraph for the refinement of topologies
 *
 *****************************************************************************************************************/
export class LevelGraphModellerComponent implements OnInit {

  // TODO split
  private currentDragData: any;
  typeCurrentDragData: LEVELGRAPHNODETYPES;

  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository();

  currentMoveNode: LevelGraphNode = new LevelGraphNode(null, null, null, null, null, null, null, null, null);
  currentDrawRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);
  currentLevelGraph: LevelGraph;

  public flashMessage = new FlashMessage();

  level: Level;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  // flags
  drag = false;
  drawRelation = false;
  moveNode = false;
  changeLevelHeight = false;

  toolList = [
    { name: 'Move Node', checked: true },
    { name: 'ConnectedTo', checked: false },
    { name: 'HostedOn', checked: false },
    { name: 'RefineTo', checked: false }
  ];

  levelGraphRelationTypes = [
    { name: 'ConnectedTo', checked: true },
    { name: 'HostedOn', checked: true },
    { name: 'RefineTo', checked: true }
  ];

  /***************************************************************************************************************************************
   *
   *  Constructor and ngOnInit Method
   *
   *************************************************************************************************************************************/
  constructor(private route: ActivatedRoute, private router: Router, private levelGraphService: LevelGraphService,
    private repositoryService: RepositoryService, private levelGraphNodeService: LevelGraphNodeService, private fragmentNodeService: FragmentNodeService, private levelService: LevelService, private levelGraphRelationService: LevelGraphRelationService, private flashMessageService: FlashMessageService) {
    this.currentLevelGraph = new LevelGraph();
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.currentLevelGraph.name = params['name'] || 'Unnamed';
    });

    this.route.queryParams.subscribe(params => {
      this.currentLevelGraph.id = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = 4000;
    this.selectedRepository.name = 'Select Repository';
    this.retrieveLevelGraph(this.currentLevelGraph.id);
    this.retrieveRepository();

  }

  /****************************************************************************************************************
   *
   * Retrieve Repository Data - Load all data from database
   *
   ****************************************************************************************************************/
  retrieveRepository() {
    Logger.info('Retrieve Repository Data', LevelGraphModellerComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        Logger.info('Repositories sucessfully retrieved.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /***************************************************************************************************************************************
   *
   * Retrieve Level Graph Data
   * @param id: number - Id of the level graph which should be retrieved
   *
   *************************************************************************************************************************************/
  retrieveLevelGraph(id: number) {
    this.levelGraphService.getLevelGraph(id)
      .subscribe(levelGraphResponse => {
        this.currentLevelGraph = levelGraphResponse;
        Logger.info('Level Graph with id: ' + levelGraphResponse.id + ' was retrieved sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /***************************************************************************************************************************************
   *
   * addLevel - Add a new Level to the level graph
   *
   *************************************************************************************************************************************/
  addLevel() {

    let y = 0;
    for (let level of this.currentLevelGraph.levels) {
      if (level.visible) {
        y = y + level.height + LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
      }
    }

    let tempLevel: Level = new Level(this.currentLevelGraph.getNumberOfLevels() + 1, true, y, LEVELGRAPHCONSTANTS.LEVELHEIGHT, this.currentLevelGraph.id, [], []);
    tempLevel.levelGraph = this.currentLevelGraph;
    this.levelService.createLevel(tempLevel)
      .subscribe(levelResponse => {
        this.currentLevelGraph.addLevel(levelResponse);
        Logger.info('Level with id: ' + levelResponse.id + ' was created sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /***************************************************************************************************************************************
   *
   * removeLevel - Remove a level from the level graph
   *
   *************************************************************************************************************************************/
  removeLevel() {

    if (this.currentLevelGraph.getNumberOfLevels() > 2) {
      this.levelService.deleteLevel(this.currentLevelGraph.levels[this.currentLevelGraph.getNumberOfLevels() - 1].id)
        .subscribe(response => {
          this.currentLevelGraph.removeLevel(this.currentLevelGraph.levels[this.currentLevelGraph.getNumberOfLevels() - 1].id);
          Logger.info('Level with id: ' + this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
        },
        (error) => {
          this.flashMessage.message = error;
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        });
    } else {
      this.flashMessage.message = 'A Level Graph can`t have a Level lower then 2.';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
    }
  }

  /***************************************************************************************************************************************
   *
   * onShowLevel - Show a Level if it is currently invisible or hide a Level if it is currently visible
   *
   *************************************************************************************************************************************/
  onShowLevel(level: Level) {

    if (level.visible) {
      level.visible = false;
      for (let i = 0; i < this.currentLevelGraph.getVisibleLevels().length; i++) {
        if (this.currentLevelGraph.getVisibleLevels()[i].depth > level.depth) {
          this.currentLevelGraph.getVisibleLevels()[i].y = this.currentLevelGraph.getVisibleLevels()[i].y - level.height - LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
        }
      }
    } else {
      level.visible = true;
      for (let i = 0; i < this.currentLevelGraph.getVisibleLevels().length; i++) {
        if ((this.currentLevelGraph.getVisibleLevels()[i].depth + 1) === level.depth) {
          level.y = this.currentLevelGraph.getVisibleLevels()[i].y + this.currentLevelGraph.getVisibleLevels()[i].height + LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
        } else if (this.currentLevelGraph.getVisibleLevels()[i].depth > level.depth) {
          this.currentLevelGraph.getVisibleLevels()[i].y = this.currentLevelGraph.getVisibleLevels()[i].y + level.height + LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
        }
      }
    }
  }

  /***************************************************************************************************************************************
   *
   * updateLevelGraph - Call the LevelGraphService Update Method for storing the data in the database
   *
   *************************************************************************************************************************************/
  updateLevelGraph() {
    this.levelGraphService.updateLevelGraph(this.currentLevelGraph).subscribe(levelGraph => this.currentLevelGraph = levelGraph);
  }

  /***************************************************************************************************************************************
   *
   * startMoveNode - Start moving a node in his level area if the moving tool is selected
   *
   *************************************************************************************************************************************/
  startMoveNode(event: MouseEvent, levelGraphNode) {
    if (!this.moveNode) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.currentMoveNode = levelGraphNode;
      this.moveNode = true;
    }
  }

  /***************************************************************************************************************************************
   *
   * onMoveNode - Move a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   *************************************************************************************************************************************/
  onMoveNode(event: MouseEvent, level: Level) {

    if (this.moveNode) {

      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      if (((this.currentMoveNode.x + deltaX) > 0)) {
        this.currentMoveNode.x = (this.currentMoveNode.x + deltaX);
      }

      if ((this.currentMoveNode.y + deltaY) > 0 && ((this.currentMoveNode.y + deltaY + this.currentMoveNode.height) < (level.height))) {
        this.currentMoveNode.y = (this.currentMoveNode.y + deltaY);
      }

      for (let levelGraphRelation of this.currentLevelGraph.levelGraphRelations) {
        if (this.currentMoveNode.id === levelGraphRelation.targetNodeId) {
          if (levelGraphRelation.levelGraphRelationType === 'REFINE_TO') {
            if ((levelGraphRelation.path.points[1].x + deltaX) > (0 + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2))) {
              levelGraphRelation.path.points[1].x = levelGraphRelation.path.points[1].x + deltaX;
            }
            if ((levelGraphRelation.path.points[1].y + deltaY) > level.y + 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2 && ((levelGraphRelation.path.points[1].y + deltaY) < (level.y + level.height - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
              levelGraphRelation.path.points[1].y = levelGraphRelation.path.points[1].y + deltaY;
            }
          } else {
            if ((levelGraphRelation.path.points[1].x + deltaX) > (0 + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2))) {
              levelGraphRelation.path.points[1].x = levelGraphRelation.path.points[1].x + deltaX;
            }
            if ((levelGraphRelation.path.points[1].y + deltaY) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2 && ((levelGraphRelation.path.points[1].y + deltaY) < (level.height - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
              levelGraphRelation.path.points[1].y = levelGraphRelation.path.points[1].y + deltaY;
            }
          }
        }
        if (this.currentMoveNode.id === levelGraphRelation.sourceNodeId) {
          if (levelGraphRelation.levelGraphRelationType === 'REFINE_TO') {
            if ((levelGraphRelation.path.points[0].x + deltaX) > 0 + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2) {
              levelGraphRelation.path.points[0].x = levelGraphRelation.path.points[0].x + deltaX;
            }
            if ((levelGraphRelation.path.points[0].y + deltaY) > level.y + 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2 && ((levelGraphRelation.path.points[0].y + deltaY) < (level.y + level.height - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
              levelGraphRelation.path.points[0].y = levelGraphRelation.path.points[0].y + deltaY;
            }
          } else {
            if ((levelGraphRelation.path.points[0].x + deltaX) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2) {
              levelGraphRelation.path.points[0].x = levelGraphRelation.path.points[0].x + deltaX;
            }
            if ((levelGraphRelation.path.points[0].y + deltaY) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2 && ((levelGraphRelation.path.points[0].y + deltaY) < (level.height - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
              levelGraphRelation.path.points[0].y = levelGraphRelation.path.points[0].y + deltaY;
            }
          }
        }

        let tempPath = new Path(levelGraphRelation.path.points);
        levelGraphRelation.path = tempPath;
      }

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
    }
  }

  /***************************************************************************************************************************************
   *
   * stopMoveNode - Stop the moving event a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   *************************************************************************************************************************************/
  stopMoveNode(event: MouseEvent) {
    if (this.moveNode) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.moveNode = false;
    }
  }

  /***************************************************************************************************************************************
   *
   * startDrawRelation - Start the draw relation event if one of the draw relation tool is selected
   *
   *************************************************************************************************************************************/
  startDrawRelation(event, level, levelGraphNode) {

    if (this.toolList[1].checked || this.toolList[2].checked || this.toolList[3].checked) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.level = level;
      let levelGraphRelationType: string;

      if (this.toolList[1].checked) {
        levelGraphRelationType = LEVELGRAPHRELATIONTYPE.CONNECTED_TO;
      } else if (this.toolList[2].checked) {
        levelGraphRelationType = LEVELGRAPHRELATIONTYPE.HOSTED_ON;
      } else if (this.toolList[3].checked) {
        levelGraphRelationType = LEVELGRAPHRELATIONTYPE.REFINE_TO;
      }

      let startPoint: Point;
      let endPoint: Point;

      if (this.toolList[3].checked) {
        startPoint = new Point(this.lastMousePositionX, this.lastMousePositionY);
        endPoint = new Point(this.lastMousePositionX - 5, this.lastMousePositionY - 5);
      } else {
        startPoint = new Point(this.lastMousePositionX - 50, this.lastMousePositionY - level.y);
        endPoint = new Point(this.lastMousePositionX - 50 - 5, this.lastMousePositionY - level.y - 5);
      }

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentDrawRelation = new LevelGraphRelation(this.level.depth, this.level.depth, levelGraphNode.id, levelGraphNode.id, this.currentLevelGraph.id, tempPath, levelGraphRelationType);
      this.currentDrawRelation.levelGraph = this.currentLevelGraph;
      this.currentDrawRelation.levelGraphNodes.push(levelGraphNode);
      this.drawRelation = true;
    }
  }

  /***************************************************************************************************************************************
   *
   * onDrawRelation - Update the end point position of the path of a relation
   *
   *************************************************************************************************************************************/
  onDrawRelation(event: MouseEvent) {

    if (this.drawRelation) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);



      if (this.toolList[1].checked || this.toolList[2].checked || this.toolList[3].checked) {
        this.currentDrawRelation.path.points[1].x = this.currentDrawRelation.path.points[1].x + deltaX;
        this.currentDrawRelation.path.points[1].y = this.currentDrawRelation.path.points[1].y + deltaY;
        this.currentDrawRelation.path.updatePath();
      }

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }

  }

  /***************************************************************************************************************************************
   *
   * stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   *************************************************************************************************************************************/
  stopDrawRelation(event, levelGraphNode, level) {

    if (this.drawRelation) {

      let sourceNode = this.currentDrawRelation.levelGraphNodes[0];

      if (!this.isRelationExist(levelGraphNode, sourceNode)) {

        if (this.isRelationDrawAllowed(levelGraphNode, sourceNode, level)) {

          let sourceCenterX = sourceNode.x + sourceNode.width / 2;
          let sourceCenterY = sourceNode.y + sourceNode.height / 2;
          let targetCenterX = levelGraphNode.x + levelGraphNode.width / 2;
          let targetCenterY = levelGraphNode.y + levelGraphNode.height / 2;

          if (this.toolList[3].checked) {
            this.currentDrawRelation.path.points[0].x = sourceCenterX + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL;
          } else {
            this.currentDrawRelation.path.points[0].x = sourceCenterX;
            this.currentDrawRelation.path.points[0].y = sourceCenterY;
          }
          if (this.toolList[3].checked) {
            this.currentDrawRelation.path.points[1].y = targetCenterY + level.y;
            this.currentDrawRelation.path.points[1].x = targetCenterX + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL;
          } else {
            this.currentDrawRelation.path.points[1].y = targetCenterY;
            this.currentDrawRelation.path.points[1].x = targetCenterX;
          }
          this.currentDrawRelation.path.updatePath();
          this.currentDrawRelation.targetLevelDepth = level.depth;
          this.currentDrawRelation.targetNodeId = levelGraphNode.id;
          this.currentDrawRelation.levelGraphNodes.push(levelGraphNode);
          this.createLevelGraphRelation(this.currentDrawRelation);

        }
      }

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.drawRelation = false;
    }
  }

  /*****************************************************************************************************************************************
   *
   * isRelationExist is called to check if already a relation between the to nodes exist
   *
   ****************************************************************************************************************************************/
  isRelationExist(targetSource: LevelGraphNode, nodeSource: LevelGraphNode) {

    for (let targetRelation of targetSource.levelGraphRelations) {
      for (let sourceRelation of nodeSource.levelGraphRelations) {
        if (targetRelation.id === sourceRelation.id) {
          this.flashMessage.message = 'There already exist a relation between this nodes!';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
          return true;
        }
      }

    }
    return false;

  }

  /*****************************************************************************************************************************************
   *
   * isRelationDrawAllowed is called to check if it is allow to draw the level graph relation of the currently selected type
   *
   ****************************************************************************************************************************************/
  isRelationDrawAllowed(targetNode: LevelGraphNode, nodeSource: LevelGraphNode, level: Level) {
    if (!this.toolList[0].checked) {
      if (targetNode.id !== nodeSource.id) {
        if (this.toolList[1].checked) {
          if (nodeSource.levelId === targetNode.levelId) {
            if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
              return true;
            } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
              return true;
            } else {
              this.flashMessage.message = 'A Connected To Relation can only be draw between a Relationship Type Level Graph Node and a Node Type Level Graph Node!';
              this.flashMessage.isSuccess = false;
              this.flashMessage.isError = true;
              this.flashMessageService.display(this.flashMessage);
              return false;
            }
          } else {
            this.flashMessage.message = 'Connected To Relations can be only drawn between two Nodes in the same Level!';
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
            return false;
          }
        } else if (this.toolList[2].checked) {
          if (nodeSource.levelId === targetNode.levelId) {
            if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
              return true;
            } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
              return true;
            } else {
              this.flashMessage.message = 'Hosted On Relations can be only drawn between two Nodes of the same Type!';
              this.flashMessage.isSuccess = false;
              this.flashMessage.isError = true;
              this.flashMessageService.display(this.flashMessage);
              return false;
            }
          } else {
            this.flashMessage.message = 'Hosted On Relations can be only drawn between two Nodes in the same Level!';
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
            return false;
          }
        } else if (this.toolList[3].checked) {
          if (this.currentDrawRelation.sourceLevelDepth < level.depth) {
            if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
              return true;
            } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
              return true;
            } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.FRAGMENTTYPE) {
              return true;
            } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.FRAGMENTTYPE) {
              return true;
            } else {
              this.flashMessage.message = 'Refine To Relations can only be drawn between to Nodes of same Type or between a Node and a Fragment Node!';
              this.flashMessage.isSuccess = false;
              this.flashMessage.isError = true;
              this.flashMessageService.display(this.flashMessage);
              return false;
            }
          } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.FRAGMENTTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
            return true;
          } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.FRAGMENTTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
            return true;
          } else {
            this.flashMessage.message = 'Refine To Relations can only be drawn between to Nodes of different Level and only from a lower lever to a higher level!';
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
            return false;
          }
        }
      } else {
        this.flashMessage.message = 'Self-Loops are not allowed in a Level Graph';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        return false;
      }
    }
    return false;
  }

  /*****************************************************************************************************************************************
   *
  * changeTool change the selected tool for modelling a level graph
   *
   ****************************************************************************************************************************************/
  changeTool(tool: any) {

    for (let t of this.toolList) {
      t.checked = false;
    }
    tool.checked = true;
  }

  /*****************************************************************************************************************************************
   *
   * onDrag is called to start drag and drop of level graph nodes from toolbox to the draw area
   *
   ****************************************************************************************************************************************/
  onDrag(event, dragData: any, typeDragData: string) {
    this.currentDragData = dragData;
    this.typeCurrentDragData = typeDragData;
    this.drag = true;
  }

  /*****************************************************************************************************************************************
   *
   * onDragOver is called to allow a drag over between different div containers
   *
   ****************************************************************************************************************************************/
  onDragOver(event) {
    event.preventDefault();
  }

  /*****************************************************************************************************************************************
   *
   * onDrop is called to create a node in the drawArea
   *
   ****************************************************************************************************************************************/
  onDrop(event, level: Level) {
    if (this.drag === true) {
      if (this.typeCurrentDragData === LEVELGRAPHNODETYPES.NODETYPE) {
        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPES.NODETYPE, this.currentDragData.id);
      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPES.RELATIONSHIPTYPE, this.currentDragData.id);
      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPES.FRAGMENTTYPE) {
        if (level.depth > 1) {
          let fragmentNode = new FragmentType('FragmentType');
          this.fragmentNodeService.createFragmentNode(fragmentNode)
            .subscribe(fragmentNodeRes => this.createLevelGraphNode('Fragment' + fragmentNodeRes.id, event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPES.FRAGMENTTYPE, fragmentNodeRes.id));
        } else {
          this.flashMessage.message = 'Fragment Nodes cannot be added to level 1 of a level graph!';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        }
      } else {
        this.flashMessage.message = 'No type for this Level Graph Node defined!';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      }
      this.drag = false;
    }
  }

  /****************************************************************************************************
   *
   * createLevelGraphNode - Create level graph node and update the level graph
   *
   ****************************************************************************************************/
  createLevelGraphNode(name: string, x: number, y: number, width: number, height: number, level: Level, levelGraphNodeType: string, typeRef: number) {

    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    let levelGraphNode = new LevelGraphNode(name, x, y, width, height, level.id, levelGraphNodeType, typeRef, this.currentLevelGraph.id);
    levelGraphNode.level = level;
    levelGraphNode.levelGraph = this.currentLevelGraph;
    this.levelGraphNodeService.createLevelGraphNode(levelGraphNode)
      .subscribe(levelGraphNodeResponse => {
        this.currentLevelGraph.addLevelGraphNode(levelGraphNodeResponse);
        Logger.info('Level Graph Node with id: ' + levelGraphNodeResponse.id + ' was created sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************
   *
   * createLevelGraphRelation - Create level graph relation and update the level graph
   *
   ****************************************************************************************************/
  createLevelGraphRelation(levelGraphRelation: LevelGraphRelation) {

    this.levelGraphRelationService.createLevelGraphRelation(levelGraphRelation)
      .subscribe(levelGraphRelationResponse => {
        this.currentLevelGraph.addLevelGraphRelation(levelGraphRelationResponse);
        Logger.info("Test" + JSON.stringify(levelGraphRelationResponse), '');
        levelGraphRelation.levelGraphNodes[0].levelGraphRelations.push(levelGraphRelationResponse);
        levelGraphRelation.levelGraphNodes[1].levelGraphRelations.push(levelGraphRelationResponse);
        Logger.info('Level Graph Relation created sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

  /****************************************************************************************************
   *
   * startChangeLevelHeight - Start the level change height event
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************/
  startChangeLevelHeight(event: MouseEvent) {
    this.changeLevelHeight = true;
    this.lastMousePositionY = event.offsetY;
  }

  /****************************************************************************************************
   *
   * changeLevelHeight - Change level height if the mouse is moved and the mouseDownEvent is true
   * @param event: MouseEvent - Event Object of the onMouseMove Event
   * @param level: Level - Level witch should be changed
   *
   ****************************************************************************************************/
  onChangeLevelHeight(event: MouseEvent, level: Level) {

    let newMousePositionY = event.offsetY;
    let delta = (newMousePositionY - this.lastMousePositionY);
    if (this.changeLevelHeight && (level.height + delta) >= 0) {

      level.height = (level.height + delta);

      for (let tempLevel of this.currentLevelGraph.levels) {
        if (level.id === tempLevel.id) {
          tempLevel.height = (level.height);
        }
      }

      for (let relation of this.currentLevelGraph.levelGraphRelations) {

        if (relation.levelGraphRelationType === 'REFINE_TO') {
          if (relation.sourceLevelDepth > level.depth) {
            relation.path.points[0].y = relation.path.points[0].y + delta;
          }
          if (relation.targetLevelDepth > level.depth) {
            relation.path.points[1].y = relation.path.points[1].y + delta;
          }
          let tempPath = new Path(relation.path.points);
          relation.path = tempPath;
        }
      }

      for (let tempLevel of this.currentLevelGraph.getVisibleLevels()) {
        if (tempLevel.visible && tempLevel.depth > level.depth) {
          tempLevel.y = tempLevel.y + delta;
        }
      }
    }
    this.lastMousePositionY = newMousePositionY;
  }

  /****************************************************************************************************
   *
   * stopChangeLevelHeight - Stop the level change height event and update the level graph data
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   *
   ****************************************************************************************************/
  stopChangeLevelHeight(event: MouseEvent) {
    this.updateLevelGraph();
    this.changeLevelHeight = false;
    this.lastMousePositionY = event.offsetY;
  }

  /****************************************************************************************************
   *
   * deleteLevelGraphNode - Delete level graph node and update the level graph
   * @param levelGraphNode: LevelGraphNode - Level Graph Relation witch should be deleted
   *
   ****************************************************************************************************/
  deleteLevelGraphNode(levelGraphNode: LevelGraphNode) {
    this.levelGraphNodeService.deleteLevelGraphNode(levelGraphNode.id).subscribe(levelGraphNodeResponse => {
      this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
      Logger.info('Level Graph Node with id: ' + levelGraphNodeResponse.id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************
   *
   * delelteLevelGraphRelation - Delete level graph relation and update the level graph
   * @param levelGraphRelation: LevelGraphRelation - Level Graph Relation witch should be deleted
   *
   ****************************************************************************************************/
  deleteLevelGraphRelation(levelGraphRelation: LevelGraphRelation) {

    this.levelGraphRelationService.deleteLevelGraphRelation(levelGraphRelation.id)
      .subscribe(levelGraphRelationResponse => {
        this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
        Logger.info('Level Graph Relation with id: ' + levelGraphRelationResponse.id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************
   *
   * onSelectedRepository - Set the data of the currently selected repository
   * @param id - Id of the selected repository
   *
   ****************************************************************************************************/
  onSelectRepository(id: number) {

    this.repositoryService.getRepository(id)
      .subscribe(repositoryResponse => {
        this.selectedRepository = repositoryResponse;
        Logger.info('Repository with id: ' + repositoryResponse.id + ' was retrieved sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************************************
  *
  * stopAllEvents is called onMouseUpEvent on the draw area to set all flags to false for safety reasons
  *
  ****************************************************************************************************************************************/
  stopAllEvents() {
    this.drawRelation = false;
    this.changeLevelHeight = false;
    this.moveNode = false;
  }

  showRefineToRelation(levelGraphRelation: LevelGraphRelation) {

    for (let level of this.currentLevelGraph.levels) {
      if (!level.visible) {
        if (levelGraphRelation.sourceLevelDepth === level.depth || levelGraphRelation.targetLevelDepth === level.depth) {
          return false;
        }
      } else {
        if (levelGraphRelation.sourceLevelDepth < level.depth) {
          if (levelGraphRelation.path.points[0].y + LEVELGRAPHCONSTANTS.LEVELGAPOFFSET * (level.depth - 1) >= level.y) {
            return false;
          }
        }
        if (levelGraphRelation.targetLevelDepth < level.depth) {
          if (levelGraphRelation.path.points[1].y >= level.y) {
            return false;
          }
        }
      }
    }

    return true;

  }

  viewDetails(id: number) {
    // TODO
  }

  addExpectedProperties() {
    // TODO
  }

  addProvidedProperties() {
    // TODO
  }
}
