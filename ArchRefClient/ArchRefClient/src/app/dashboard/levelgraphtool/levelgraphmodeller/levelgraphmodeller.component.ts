import { Logger } from '../../../../logger/logger';
import { LEVELGRAPHCONSTANTS } from '../../../constants/levelgraphconstants';
import { LEVELGRAPHNODETYPE } from '../../../constants/levelgraphnodetype';
import { LEVELGRAPHRELATIONTYPE } from '../../../constants/levelgraphrelationtype';
import { FragmentNode } from '../../../shared/datamodel/levelgraphmodel/fragmentnode';
import { Level } from '../../../shared/datamodel/levelgraphmodel/level';
import { LevelGraph } from '../../../shared/datamodel/levelgraphmodel/levelgraph';
import { LevelGraphNode } from '../../../shared/datamodel/levelgraphmodel/levelgraphnode';
import { LevelGraphRelation } from '../../../shared/datamodel/levelgraphmodel/levelgraphrelation';
import { Path } from '../../../shared/datamodel/path';
import { Point } from '../../../shared/datamodel/point';
import { Repository } from '../../../shared/datamodel/repository';
import { RepositoryService } from '../../../shared/dataservices/repository.service';
import { LevelGraphNodeService } from '../../../shared/dataservices/levelgraphnode.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph.service';
import { FragmentNodeService } from '../../../shared/dataservices/fragmentnode.service';
import { LevelService } from '../../../shared/dataservices/level.service';
import { LevelGraphRelationService } from '../../../shared/dataservices/levelgraphrelation.service';
import { Utility } from '../../../utility';
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
 * LevelGraphModellerComponent Class - Tool for modelling a level graph
 *
 *****************************************************************************************************************/
export class LevelGraphModellerComponent implements OnInit {

  /***************************************************************************************************************************************
   *
   *  Field Definitions
   *
   *************************************************************************************************************************************/

  private currentDragData: any;
  typeCurrentDragData: string;

  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository('Select Reposiory');

  moveNode: LevelGraphNode = new LevelGraphNode(null, null, null, null, null, null, null, null, null);
  currentDrawRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);

  activeLevels: Level[] = [];

  private mousedownOnLevelChangeView = false;
  private mousedownOnLevelGraphNode = false;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  private drag = false;
  drawRelation = false;

  toolList = [
    { name: 'Move Node', id: 0, checked: true },
    { name: 'ConnectedTo', id: 1, checked: false },
    { name: 'HostedOn', id: 2, checked: false },
    { name: 'RefineTo', id: 3, checked: false }
  ];

  levelGraphRelationTypes = [
    { name: 'ConnectedTo', id: '1', checked: true },
    { name: 'HostedOn', id: '2', checked: true },
    { name: 'RefineTo', id: '3', checked: true }
  ];

  levelGraphNodeTypes = [
    { name: 'Fragment', id: '1', checked: true }
  ];

  currentLevelGraph: LevelGraph;
  currentLevelGraphId: number;
  currentLevelGraphName: string;
  private sub: any;

  public flashMessage = new FlashMessage();

  /***************************************************************************************************************************************
   *
   *  Constructor and ngOnInit Method
   *
   *************************************************************************************************************************************/
  constructor(private route: ActivatedRoute, private router: Router, private levelGraphService: LevelGraphService,
    private repositoryService: RepositoryService, private levelGraphNodeService: LevelGraphNodeService, private fragmentNodeService: FragmentNodeService, private levelService: LevelService, private levelGraphRelationService: LevelGraphRelationService, private flashMessageService: FlashMessageService) {
    this.currentLevelGraph = new LevelGraph('NO LEVEL GRAPH FOUND', 1);
  }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentLevelGraphName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentLevelGraphId = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = 4000;
    this.retrieveLevelGraph(this.currentLevelGraphId);
    this.retrieveRepositoryData();

  }

  /****************************************************************************************************************
   *
   * Retrieve Repository Data - Load all data from database
   *
   ****************************************************************************************************************/
  private retrieveRepositoryData() {
    Logger.info('Retrieve Repository Data', LevelGraphModellerComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        this.flashMessage.message = 'Repositories retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
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
        for (let level of this.currentLevelGraph.levels) {
          if (level.checked === true) {
            this.activeLevels.push(level);
          }
        }
        this.flashMessage.message = 'Level Graph with id: ' + levelGraphResponse.id + ' retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
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
    for (let level of this.activeLevels) {
      y = y + level.height + LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
    }

    let tempLevel: Level = new Level('Level ' + (this.currentLevelGraph.getNumberOfLevels() + 1), this.currentLevelGraph.getNumberOfLevels() + 1, true, y, LEVELGRAPHCONSTANTS.LEVELHEIGHT, this.currentLevelGraph);
    this.levelService.createLevel(tempLevel)
      .subscribe(levelResponse => {
        this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() + 1);
        this.currentLevelGraph.levels.push(levelResponse);
        this.activeLevels.push(levelResponse);
        this.updateLevelGraph();
        this.flashMessage.message = 'Level with id: ' + levelResponse.id + ' created sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
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

    if (this.currentLevelGraph.levels.length > 1) {
      this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() - 1);
      this.activeLevels = Utility.deleteElementFromArry(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id, this.activeLevels);
      this.levelService.deleteLevel(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id)
        .subscribe(response => {
          this.currentLevelGraph.levels = Utility.deleteElementFromArry(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id, this.currentLevelGraph.levels);
          // TODO
          this.updateLevelGraph();
          this.flashMessage.message = 'Level with id: ' + this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id + ' deleted sucessfully.';
          this.flashMessage.isSuccess = true;
          this.flashMessage.isError = false;
          this.flashMessageService.display(this.flashMessage);
          Logger.info('Level with id: ' + this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
        },
        (error) => {
          this.flashMessage.message = error;
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        });
    } else {
      this.flashMessage.message = 'A Level Graph can not have a Level of 0.';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
    }
  }

  onShowLevel(level: Level) {

    if (level.checked === true) {
      this.activeLevels = Utility.deleteElementFromArry(level.id, this.activeLevels);
      for (let liveLevel of this.activeLevels) {
        if (liveLevel.value > level.value) {
          liveLevel.y = liveLevel.y - level.height - LEVELGRAPHCONSTANTS.LEVELGAPOFFSET;
          for (let persistendLevel of this.currentLevelGraph.levels) {
            if (persistendLevel.id === liveLevel.id) {
              persistendLevel.y = liveLevel.y;
            }
          }
        }
      }
    } else {

      for (let liveLevel of this.activeLevels) {

        if ((liveLevel.value + 1) === level.value) {
          level.y = liveLevel.y + liveLevel.height + 40;
          for (let persistendLevel of this.currentLevelGraph.levels) {
            if (persistendLevel.id === level.id) {
              persistendLevel.y = level.y;
            }
          }
        } else if (liveLevel.value > level.value) {
          liveLevel.y = liveLevel.y + level.height + 40;
          for (let persistendLevel of this.currentLevelGraph.levels) {
            if (persistendLevel.id === liveLevel.id) {
              persistendLevel.y = liveLevel.y;
            }
          }
        }

      }

      this.activeLevels.push(level);

    }
  }


  updateLevelGraph() {
    this.levelGraphService.updateLevelGraph(this.currentLevelGraph).subscribe(levelGraph => this.currentLevelGraph = levelGraph);
  }

  createRange(number) {

    alert(number);
    let items: number[] = [];

    for (let i = 1; i <= number; i++) {
      items.push(i);
    }

    return items;

  }

  /***************************************************************************************************************************************
   *
   * Section for handling drawing of level graph relations and moving of level graph nodes
   *
   *
   **************************************************************************************************************************************/

  mouseDownOnNode(event: MouseEvent, level: Level, levelGraphNode: LevelGraphNode) {

    this.mousedownOnLevelGraphNode = true;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;

    let levelGraphRelationType: string;

    if (this.toolList[1].checked) {
      levelGraphRelationType = LEVELGRAPHRELATIONTYPE.CONNECTED_TO_RELATION;
    } else if (this.toolList[2].checked) {
      levelGraphRelationType = LEVELGRAPHRELATIONTYPE.HOSTED_ON_RELATION;
    } else if (this.toolList[3].checked) {
      levelGraphRelationType = LEVELGRAPHRELATIONTYPE.REFINE_TO_RELATION;
    } else {
      levelGraphRelationType = LEVELGRAPHRELATIONTYPE.NOTYPE;
    }

    if (this.toolList[1].checked || this.toolList[2].checked || this.toolList[3].checked) {

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
      this.currentDrawRelation = new LevelGraphRelation(level.value, level.value, levelGraphNode, levelGraphNode, this.currentLevelGraph, tempPath, levelGraphRelationType);
      this.drawRelation = true;

    } else {
      this.moveNode = levelGraphNode;
    }

  }

  drawEdge(event: MouseEvent) {

    let newMousePositionY = event.offsetY;
    let newMousePositionX = event.offsetX;
    let deltaY = (newMousePositionY - this.lastMousePositionY);
    let deltaX = (newMousePositionX - this.lastMousePositionX);

    if (this.mousedownOnLevelGraphNode === true) {

      if (this.toolList[1].checked || this.toolList[2].checked || this.toolList[3].checked) {

        this.currentDrawRelation.path.points[1].x = this.currentDrawRelation.path.points[1].x + deltaX;
        this.currentDrawRelation.path.points[1].y = this.currentDrawRelation.path.points[1].y + deltaY;
        this.currentDrawRelation.path.updatePath();

      } else if (this.toolList[0].checked) {

        if ((this.moveNode.x + deltaX) > 0) {
          this.moveNode.x = (this.moveNode.x + deltaX);
        }

        if ((this.moveNode.y + deltaY) > 0) {
          this.moveNode.y = (this.moveNode.y + deltaY);
        }


        for (let relationOutNode of this.moveNode.outLevelGraphRelation) {
          for (let relationOutGraph of this.currentLevelGraph.levelGraphRelations) {
            if (relationOutNode.id === relationOutGraph.id) {
              if ((relationOutGraph.path.points[0].x + deltaX) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2) {
                relationOutGraph.path.points[0].x = relationOutGraph.path.points[0].x + deltaX;
              }
              if ((relationOutGraph.path.points[0].y + deltaY) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2) {
                relationOutGraph.path.points[0].y = relationOutGraph.path.points[0].y + deltaY;
              }
              let tempPath = new Path(relationOutGraph.path.points);
              relationOutGraph.path = tempPath;
            }
          }
        }

        for (let relationInNode of this.moveNode.inLevelGraphRelation) {
          for (let relationInGraph of this.currentLevelGraph.levelGraphRelations) {
            if (relationInNode.id === relationInGraph.id) {
              if ((relationInGraph.path.points[1].x + deltaX) > (0 + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2))) {
                relationInGraph.path.points[1].x = relationInGraph.path.points[1].x + deltaX;
              }

              if ((relationInGraph.path.points[1].y + deltaY) > (0 + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
                relationInGraph.path.points[1].y = relationInGraph.path.points[1].y + deltaY;
              }
              let tempPath = new Path(relationInGraph.path.points);
              relationInGraph.path = tempPath;
            }
          }
        }

      }

    }

    this.lastMousePositionY = newMousePositionY;
    this.lastMousePositionX = newMousePositionX;

  }

  mouseUpOnNode(event, level: Level, levelGraphNode: LevelGraphNode) {

    if (this.isRelationDrawAllowed(levelGraphNode, this.currentDrawRelation.sourceLevelGraphNode, level) && !this.isRelationExist(levelGraphNode, this.currentDrawRelation.sourceLevelGraphNode)) {

      let sourceCenterX = this.currentDrawRelation.sourceLevelGraphNode.x + this.currentDrawRelation.sourceLevelGraphNode.width / 2;
      let sourceCenterY = this.currentDrawRelation.sourceLevelGraphNode.y + this.currentDrawRelation.sourceLevelGraphNode.height / 2;
      let targetCenterX = levelGraphNode.x + levelGraphNode.width / 2;
      let targetCenterY = levelGraphNode.y + levelGraphNode.height / 2;

      if (this.toolList[3].checked) {
        this.currentDrawRelation.path.points[0].y;
        this.currentDrawRelation.path.points[0].x;
      } else {
        this.currentDrawRelation.path.points[0].x = sourceCenterX;
        this.currentDrawRelation.path.points[0].y = sourceCenterY;
      }

      if (this.toolList[3].checked) {

      } else {
        this.currentDrawRelation.path.points[1].y = targetCenterY;
        this.currentDrawRelation.path.points[1].x = targetCenterX;
      }

      this.currentDrawRelation.path.updatePath();
      this.currentDrawRelation.targetLevelValue = level.value;
      this.currentDrawRelation.targetLevelGraphNode = levelGraphNode;

      this.levelGraphRelationService.createLevelGraphRelation(this.currentDrawRelation)
        .subscribe(levelGraphRelationResponse => {
          this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(res => this.currentLevelGraph = res);
          this.flashMessage.message = 'Level Graph Relation created sucessfully.';
          this.flashMessage.isSuccess = true;
          this.flashMessageService.display(this.flashMessage);
          Logger.info('Level Graph Relation created sucessfully.', LevelGraphModellerComponent.name);
        },
        (error) => {
          this.flashMessage.message = error;
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        });
    }
    this.mousedownOnLevelGraphNode = false;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
    this.drawRelation = false;
  }

  mouseUpOnDrawArea() {
    this.mousedownOnLevelGraphNode = false;
    this.drawRelation = false;
    this.mousedownOnLevelChangeView = false;
  }

  isRelationExist(levelGraphNode: LevelGraphNode, levelGraphNodeSource: LevelGraphNode) {

    for (let relation of levelGraphNode.inLevelGraphRelation) {
      //      if (relation.sourceLevelGraphNode.id === levelGraphNodeSource.id) {
      //        this.flashMessage.message = 'There already exist a relation between this nodes!';
      //        this.flashMessage.isSuccess = false;
      //        this.flashMessage.isError = true;
      //        this.flashMessageService.display(this.flashMessage);
      //        return true;
      //      }
    }
    return false;

  }

  isRelationDrawAllowed(levelGraphNode: LevelGraphNode, levelGraphNodeSource: LevelGraphNode, level: Level) {
    if (!this.toolList[0].checked) {
      if (levelGraphNode.id != levelGraphNodeSource.id) {

        if (this.toolList[1].checked) {
          if (this.currentDrawRelation.sourceLevelGraphNode.levelId === levelGraphNode.levelId) {
            if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

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

          if (this.currentDrawRelation.sourceLevelGraphNode.levelId === levelGraphNode.levelId) {
            if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

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
          if (this.currentDrawRelation.sourceLevelValue < level.value) {
            if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

              return true;

            } else {
              this.flashMessage.message = 'Refine To Relations can only be drawn between to Nodes of same Type or between a Node and a Fragment Node!';
              this.flashMessage.isSuccess = false;
              this.flashMessage.isError = true;
              this.flashMessageService.display(this.flashMessage);
              return false;
            }

          } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

            return true;

          } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

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

    } else {

      return false;
    }
  }

  changeTool(tool: any) {

    for (let tool of this.toolList) {
      tool.checked = false;
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

      if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.NODETYPE) {

        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPE.NODETYPE, this.currentDragData.id);

      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPE.RELATIONSHIPTYPE, this.currentDragData.id);

      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

        if (level.value > 1) {

          let fragmentNode = new FragmentNode();
          this.fragmentNodeService.createFragmentNode(fragmentNode)
            .subscribe(fragmentNodeRes => this.createLevelGraphNode('Fragment' + fragmentNodeRes.getId(), event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2, event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH, LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT, level, LEVELGRAPHNODETYPE.FRAGMENTNODE, fragmentNodeRes.getId()));

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

    let levelGraphNode = new LevelGraphNode(name, x, y, width, height, level.id, levelGraphNodeType, typeRef, this.currentLevelGraph);
    this.levelGraphNodeService.createLevelGraphNode(levelGraphNode)
      .subscribe(levelGraphNodeResponse => {
        this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
        this.flashMessage.message = 'Level Graph Node with id: ' + levelGraphNodeResponse.id + ' created sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessage.isError = false;
        this.flashMessageService.display(this.flashMessage);
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
   * startChangeLevelHeight - Start the level change height event
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************/
  startChangeLevelHeight(event: MouseEvent) {
    this.mousedownOnLevelChangeView = true;
    this.lastMousePositionY = event.offsetY;
  }

  /****************************************************************************************************
   *
   * changeLevelHeight - Change level height if the mouse is moved and the mouseDownEvent is true
   * @param event: MouseEvent - Event Object of the onMouseMove Event
   * @param level: Level - Level witch should be changed
   *
   ****************************************************************************************************/
  changeLevelHeight(event: MouseEvent, level: Level) {

    let newMousePositionY = event.offsetY;
    let delta = (newMousePositionY - this.lastMousePositionY);
    if (this.mousedownOnLevelChangeView === true && (level.height + delta) >= 0) {

      level.height = level.height + delta;

      for (let tempLevel of this.currentLevelGraph.levels) {
        if (level.id === tempLevel.id) {
          tempLevel.height = level.height;
        }
      }

      for (let relation of this.currentLevelGraph.levelGraphRelations) {

        if (relation.levelGraphRelationType === 'REFINE_TO_RELATION') {

          if (relation.sourceLevelValue > level.value) {

            relation.path.points[0].y = relation.path.points[0].y + delta;

          }

          if (relation.targetLevelValue > level.value) {
            relation.path.points[1].y = relation.path.points[1].y + delta;
          }
          let tempPath = new Path(relation.path.points);
          relation.path = tempPath;
        }

      }

      this.updateLevelPosition(level, delta);

    }

    this.lastMousePositionY = newMousePositionY;

  }

  /****************************************************************************************************
   *
   * updateLevelPosition - Update the level position of all levels higher then the currently changed level
   * @param level: Level - Level which is changed
   * @param delta: Number - Difference between the last mouse position and the current mouse position
   *
   ****************************************************************************************************/
  updateLevelPosition(level: Level, delta: number) {

    for (let activeLevel of this.activeLevels) {
      if (activeLevel.value > level.value) {
        activeLevel.y = activeLevel.y + delta;
      }
    }

  }

  /****************************************************************************************************
   *
   * stopChangeLevelHeight - Stop the level change height event and update the level graph data
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   *
   ****************************************************************************************************/
  stopChangeLevelHeight(event: MouseEvent) {
    this.updateLevelGraph();
    // TODO Bug Fix 
    this.mousedownOnLevelChangeView = false;
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
      this.flashMessage.message = 'Level Graph Node with id: ' + levelGraphNodeResponse.id + ' deleted sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessage.isError = false;
      this.flashMessageService.display(this.flashMessage);
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
        this.flashMessage.message = 'Level Graph Relation with id: ' + levelGraphRelationResponse.id + ' deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessage.isError = false;
        this.flashMessageService.display(this.flashMessage);
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
        this.flashMessage.message = 'Repository with id: ' + repositoryResponse.id + ' retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessage.isError = false;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with id: ' + repositoryResponse.id + ' was retrieved sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  viewDetails(id: number) {
    // TODO
  }

}
