import { Logger } from '../../../../logger/logger';
import { LEVELGRAPHCONSTANTS } from '../../../shared/constants/levelgraphconstants';
import { LEVELGRAPHNODETYPES } from '../../../shared/constants/levelgraphnodetype';
import { LEVELGRAPHRELATIONTYPE } from '../../../shared/constants/levelgraphrelationtype';
import { Entity } from '../../../shared/datamodels/entity/entity';
import { Level } from '../../../shared/datamodels/levelgraph/level';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { LevelGraphNode } from '../../../shared/datamodels/levelgraph/levelgraphnode';
import { LevelGraphRelation } from '../../../shared/datamodels/levelgraph/levelgraphrelation';
import { ProvidedProperty } from '../../../shared/datamodels/metrics/providedproperty';
import { Path } from '../../../shared/datamodels/utility/path';
import { Point } from '../../../shared/datamodels/utility/point';
import { Repository } from '../../../shared/datamodels/repository/repository';
import { RepositoryService } from '../../../shared/dataservices/repository/repository.service';
import { LevelService } from '../../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph/levelgraph.service';
import { LevelGraphNodeService } from '../../../shared/dataservices/levelgraph/levelgraphnode.service';
import { LevelGraphRelationService } from '../../../shared/dataservices/levelgraph/levelgraphrelation.service';
import { ProvidedPropertyService } from '../../../shared/dataservices/metrics/providedpropertyservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-levelgraphmodeller',
  templateUrl: './levelgraphmodeller.component.html',
  styleUrls: ['./levelgraphmodeller.component.css']
})

/*******************************************************************************************************************************************
 *
 * @component - LevelGraphModellerComponent for model a LevelGraph for the refinement of topologies
 *
 ******************************************************************************************************************************************/
export class LevelGraphModellerComponent implements OnInit {

  private currentDragData: any;
  typeCurrentDragData: string;
  saved = true;

  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository();

  entity: Entity = new Entity();
  createProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');

  currentLevelGraph: LevelGraph = new LevelGraph();
  currentLevelGraphNode: LevelGraphNode = new LevelGraphNode(null, null, null, null, null, null, null, null);
  currentLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);

  level: Level;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  // Flags for the different events in the LevelGraphModellerComponent
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

  public flashMessage = new FlashMessage();

  /*****************************************************************************************************************************************
   *
   *   @constructor Constructor and ngOnInit Method
   *
   ****************************************************************************************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private levelGraphService: LevelGraphService,
    private repositoryService: RepositoryService,
    private levelGraphNodeService: LevelGraphNodeService,
    private levelService: LevelService,
    private levelGraphRelationService: LevelGraphRelationService,
    private flashMessageService: FlashMessageService,
    private providedPropertyService: ProvidedPropertyService) {
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
    this.retrieveRepositories();

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Retrieve Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method Retrieve Repository Data - Load all repositories from database
   *
   ****************************************************************************************************************************************/
  retrieveRepositories() {
    Logger.info('Retrieve Repositories Data', LevelGraphModellerComponent.name);
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

  /*****************************************************************************************************************************************
   *
   * @method Retrieve Level Graph Data
   * @param id: number - Id of the level graph which should be retrieved
   *
   ****************************************************************************************************************************************/
  retrieveLevelGraph(id: number) {
    this.levelGraphService.getLevelGraph(id)
      .subscribe(levelGraphResponse => {
        this.currentLevelGraph = levelGraphResponse;
        this.currentLevelGraphRelation.levelGraph = levelGraphResponse;
        this.currentLevelGraphRelation.levelGraphId = levelGraphResponse.id;
        this.currentLevelGraphNode.levelGraph = levelGraphResponse;
        this.currentLevelGraphNode.levelGraphId = levelGraphResponse.id;
        Logger.info('Level Graph with id: ' + levelGraphResponse.id + ' was retrieved sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Update Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method updateLevelGraph - Call the LevelGraphService Update Method for storing the data in the database
   *
   ****************************************************************************************************************************************/
  updateLevelGraph() {
    this.levelGraphService.updateLevelGraph(this.currentLevelGraph).subscribe(levelGraph => this.currentLevelGraph = levelGraph);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Create Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method createLevelGraphNode - Create level graph node and update the level graph
   *
   ****************************************************************************************************************************************/
  createLevelGraphNode() {

    this.levelGraphNodeService.createLevelGraphNode(this.currentLevelGraphNode)
      .subscribe(levelGraphNodeResponse => {
        this.currentLevelGraph.levelGraphNodes.push(levelGraphNodeResponse);
        Logger.info('Level Graph Node with id: ' + levelGraphNodeResponse.id + ' was created sucessfully.', LevelGraphModellerComponent.name);
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
   * @method createLevelGraphRelation - Create level graph relation and update the level graph
   *
   ****************************************************************************************************************************************/
  createLevelGraphRelation() {

    this.levelGraphRelationService.createLevelGraphRelation(this.currentLevelGraphRelation)
      .subscribe(levelGraphRelationResponse => {
        //TODO Push node to source and target Node
        this.currentLevelGraph.levelGraphRelations.push(levelGraphRelationResponse);

        Logger.info('Level Graph Relation created sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Delete Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method deleteLevelGraphNode - Delete level graph node and update the level graph
   *
   * @param id: number - ID of Level Graph Relation witch should be deleted
   *
   ****************************************************************************************************************************************/
  deleteLevelGraphNode(id: number) {
    this.levelGraphNodeService.deleteLevelGraphNode(id).subscribe(levelGraphNodeResponse => {
      this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
      Logger.info('Level Graph Node with id: ' + id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
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
   * @method delelteLevelGraphRelation - Delete level graph relation and update the level graph
   *
   * @param id: number - ID of Level Graph Relation witch should be deleted
   *
   ****************************************************************************************************************************************/
  deleteLevelGraphRelation(id: number) {

    this.levelGraphRelationService.deleteLevelGraphRelation(id)
      .subscribe(levelGraphRelationResponse => {
        this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
        Logger.info('Level Graph Relation with id: ' + id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Draw Relation Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method startMoveNode - Start moving a node in his level area if the moving tool is selected
   *
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************************************************/
  startMoveNode(event: MouseEvent, levelGraphNode) {
    if (!this.moveNode && this.toolList[0].checked) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.currentLevelGraphNode = levelGraphNode;
      this.moveNode = true;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method onMoveNode - Move a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   * @param event: MouseEvent - Event Object of the onMouseMove Event
   *
   ****************************************************************************************************************************************/
  onMoveNode(event: MouseEvent, level: Level) {

    if (this.moveNode) {

      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      // TODO Check again right
      if (((this.currentLevelGraphNode.x + deltaX) > 0)) {
        this.currentLevelGraphNode.x = (this.currentLevelGraphNode.x + deltaX);
      }

      if ((this.currentLevelGraphNode.y + deltaY) > 0 && ((this.currentLevelGraphNode.y + deltaY + this.currentLevelGraphNode.height) < (level.height))) {
        this.currentLevelGraphNode.y = (this.currentLevelGraphNode.y + deltaY);
      }

      // TODO reduce number of Nodes?
      for (let levelGraphRelation of this.currentLevelGraph.levelGraphRelations) {
        if (this.currentLevelGraphNode.id === levelGraphRelation.targetNodeId) {
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
        if (this.currentLevelGraphNode.id === levelGraphRelation.sourceNodeId) {
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

  /*****************************************************************************************************************************************
   *
   * @method stopMoveNode - Stop the moving event a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   *
   ****************************************************************************************************************************************/
  stopMoveNode(event: MouseEvent) {
    if (this.moveNode) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.updateLevelGraph();
      this.moveNode = false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Draw Relation Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method startDrawRelation - Start the draw relation event if one of the draw relation tool is selected
   *
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************************************************/
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
      this.currentLevelGraphRelation = new LevelGraphRelation(this.level.depth, this.level.depth, levelGraphNode.id, levelGraphNode.id, this.currentLevelGraph.id, tempPath, levelGraphRelationType);
      this.currentLevelGraphRelation.levelGraph = this.currentLevelGraph;
      this.currentLevelGraphRelation.levelGraphNodes.push(levelGraphNode);
      this.drawRelation = true;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method onDrawRelation - Update the end point position of the path of a relation
   *
   * @param event: MouseEvent - Event Object of the onMouseMove Event
   *
   ****************************************************************************************************************************************/
  onDrawRelation(event: MouseEvent) {

    if (this.drawRelation) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      if (this.toolList[1].checked || this.toolList[2].checked || this.toolList[3].checked) {
        this.currentLevelGraphRelation.path.points[1].x = this.currentLevelGraphRelation.path.points[1].x + deltaX;
        this.currentLevelGraphRelation.path.points[1].y = this.currentLevelGraphRelation.path.points[1].y + deltaY;
        this.currentLevelGraphRelation.path.updatePath();
      }

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   * @param targetNode: LevelGraphNode - Target Node of the relation which should be draw
   * @param targetLevel: Level - Target Level is the level of the target node
   *
   ****************************************************************************************************************************************/
  stopDrawRelation(event, targetNode: LevelGraphNode, targetLevel: Level) {

    if (this.drawRelation) {
      let sourceNode = this.currentLevelGraphRelation.levelGraphNodes[0];
      let sourceCenterX = sourceNode.x + sourceNode.width / 2;
      let sourceCenterY = sourceNode.y + sourceNode.height / 2;
      let targetCenterX = targetNode.x + targetNode.width / 2;
      let targetCenterY = targetNode.y + targetNode.height / 2;
      this.currentLevelGraphRelation.targetLevelDepth = targetLevel.depth;
      this.currentLevelGraphRelation.targetNodeId = targetNode.id;
      this.currentLevelGraphRelation.levelGraphNodes.push(targetNode);

      if (!this.currentLevelGraphRelation.isSourceNodeEqualTargetNode()) {

        if (!this.isRelationExist(sourceNode, targetNode)) {


          if (this.toolList[1].checked || this.toolList[2].checked) {
            this.currentLevelGraphRelation.path.points[0].x = sourceCenterX;
            this.currentLevelGraphRelation.path.points[0].y = sourceCenterY;
            this.currentLevelGraphRelation.path.points[1].y = targetCenterY;
            this.currentLevelGraphRelation.path.points[1].x = targetCenterX;
            this.currentLevelGraphRelation.path.updatePath();

            if (this.toolList[1].checked && this.isConnectedToRelationDrawAllowed(sourceNode, targetNode)) {
              this.createLevelGraphRelation();
            } else if (this.toolList[2].checked && this.isHostedOnRelationDrawAllowed(sourceNode, targetNode)) {
              this.createLevelGraphRelation();
            }

          } else if (this.toolList[3].checked && this.isRefineToRelationDrawAllowed(sourceNode, targetNode, targetLevel)) {
            // TODO y position ?
            this.currentLevelGraphRelation.path.points[0].x = sourceCenterX + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL;
            this.currentLevelGraphRelation.path.points[1].y = targetCenterY + targetLevel.y;
            this.currentLevelGraphRelation.path.points[1].x = targetCenterX + LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL;
            this.currentLevelGraphRelation.path.updatePath();
            this.createLevelGraphRelation();

          }
        }
      } else {
        this.flashMessage.message = 'Self-Loops are not allowed in a Level Graph';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      }

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.drawRelation = false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Drag and Drop Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method onDrag is called to start drag and drop of level graph nodes from toolbox to the draw area
   *
   * @param event: Event - Event Object of the onDrag Event
   * @param dragData: any, - Level on which the node will be droped
   * @param typeDragData: any, - Type of the data which is dragged from the toolbox
   *
   ****************************************************************************************************************************************/
  onDrag(event, dragData: any, typeDragData: string) {
    this.currentDragData = dragData;
    this.typeCurrentDragData = typeDragData;
    this.drag = true;
  }

  /*****************************************************************************************************************************************
   *
   * @method onDragOver is called to allow a drag over between different div containers
   *
   * @param event: Event - Event Object of the onDragOver Event
   *
   ****************************************************************************************************************************************/
  onDragOver(event) {
    event.preventDefault();
  }

  /*****************************************************************************************************************************************
   *
   * @method onDrop is called to create a node in the drawArea
   *
   * @param event: Event - Event Object of the onDrop Event
   * @param level: Level - Level on which the node will be droped
   *
   ****************************************************************************************************************************************/
  onDrop(event, level: Level) {

    if (this.drag === true) {
      this.currentLevelGraphNode.id = null;
      this.currentLevelGraphNode.width = LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH;
      this.currentLevelGraphNode.height = LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT;
      this.currentLevelGraphNode.level = level;
      this.currentLevelGraphNode.levelId = level.id;
      this.currentLevelGraphNode.levelGraphRelations = [];
      this.currentLevelGraphNode.expectedProperties = [];
      this.currentLevelGraphNode.providedProperties = [];

      // TODO Check again right border
      if (event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2 < 0) {
        this.currentLevelGraphNode.x = 0;
      } else {
        this.currentLevelGraphNode.x = event.offsetX - LEVELGRAPHCONSTANTS.LEVELOFFSETBETWEENLEVELAREAANDLABEL - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2;
      }

      // TODO Check again bottom border
      if (event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2 < 0) {
        this.currentLevelGraphNode.y = 0;
      } else {
        this.currentLevelGraphNode.y = event.offsetY - level.y - LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2;
      }

      if (this.typeCurrentDragData === LEVELGRAPHNODETYPES.NODETYPEFRAGMENT) {
        if (level.depth > 1) {
          // TODO construct LevelGraph NodeTyp Fragment
          this.currentLevelGraphNode.name = 'Unnamed';
          this.currentLevelGraphNode.levelGraphNodeType = LEVELGRAPHNODETYPES.NODETYPEFRAGMENT;
          this.createLevelGraphNode();
        } else {
          this.flashMessage.message = 'Fragment Nodes cannot be added to level 1 of a level graph!';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        }
      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPES.RELATIONSHIPTYPEFRAGMENT) {
        if (level.depth > 1) {
          this.currentLevelGraphNode.name = 'Unnamed';
          this.currentLevelGraphNode.levelGraphNodeType = LEVELGRAPHNODETYPES.RELATIONSHIPTYPEFRAGMENT;
          // TODO construct LevelGraph RellationshipType Fragment
          this.createLevelGraphNode();
        } else {
          this.flashMessage.message = 'Fragment Nodes cannot be added to level 1 of a level graph!';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        }
      } else {
        this.currentLevelGraphNode.name = this.currentDragData.name;
        this.currentLevelGraphNode.levelGraphNodeType = this.typeCurrentDragData;
        this.currentLevelGraphNode.levelGraphNodeTypeId = this.currentDragData.id;
        this.createLevelGraphNode();
      }
      this.drag = false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section ChangeLevelHeight Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method startChangeLevelHeight - Start the level change height event
   *
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************************************************/
  startChangeLevelHeight(event: MouseEvent) {
    this.changeLevelHeight = true;
    this.lastMousePositionY = event.offsetY;
  }

  /*****************************************************************************************************************************************
   *
   * @method changeLevelHeight - Change level height if the mouse is moved and the mouseDownEvent is true
   *
   * @param event: MouseEvent - Event Object of the onMouseMove Event
   * @param level: Level - Level witch should be changed
   *
   ****************************************************************************************************************************************/
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

  /*****************************************************************************************************************************************
   *
   * @method stopChangeLevelHeight - Stop the level change height event and update the level graph data
   *
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   *
   ****************************************************************************************************************************************/
  stopChangeLevelHeight(event: MouseEvent) {
    this.updateLevelGraph();
    this.changeLevelHeight = false;
    this.lastMousePositionY = event.offsetY;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Filter/Show Methods for show and hide data
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method onShowLevel - Show a Level if it is currently invisible or hide a Level if it is currently visible
   *
   ****************************************************************************************************************************************/
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

  /*****************************************************************************************************************************************
   *
   * @method showRefineToRelation - Show or hide the refienToRelations if the level height is changed and overlay a level
   *
   ****************************************************************************************************************************************/
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section Check Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method isRelationExist - check if a directed relation exist between to nodes
   *
   * @param nodeSource: LevelGraphNode - Source node of the relation
   * @param targetNode: LevelGraphNode - Target node of the relation
   *
   ****************************************************************************************************************************************/
  isRelationExist(sourceNode: LevelGraphNode, targetNode: LevelGraphNode) {

    for (let targetRelation of targetNode.levelGraphRelations) {
      if (targetRelation.targetNodeId === targetNode.id) {
        for (let sourceRelation of sourceNode.levelGraphRelations) {
          if (targetRelation.id === sourceRelation.id) {
            this.flashMessage.message = 'There already exist a relation between this nodes!';
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
            return true;
          }
        }
      }
    }
    return false;
  }

  /*****************************************************************************************************************************************
   *
   * @method isConnectedToRelationDrawAllowed - check if a draw of a connectedTo relation is allowed
   *
   * @param nodeSource: LevelGraphNode - Source node of the relation
   * @param targetNode: LevelGraphNode - Target node of the relation
   *
   ****************************************************************************************************************************************/
  isConnectedToRelationDrawAllowed(nodeSource: LevelGraphNode, targetNode: LevelGraphNode) {
    if (this.currentLevelGraphRelation.isTargetNodeSourceNodeInSameLevel()) {
      if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
        return true;
      } else {
        this.flashMessage.message = 'ConnectedTo relation can only been draw between a Level Graph Node of Type RelationshipType and Level Graph Node of Type NodeType!';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        return false;
      }
    } else {
      this.flashMessage.message = 'ConnectedTo relations can only been drawn between two nodes in the same Level!';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
      return false;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method isHostedOnRelationDrawAllowed - check if a draw of a hostedTo relation is allowed
   *
   * @param nodeSource: LevelGraphNode - Source node of the relation
   * @param targetNode: LevelGraphNode - Target node of the relation
   *
   ****************************************************************************************************************************************/
  isHostedOnRelationDrawAllowed(nodeSource: LevelGraphNode, targetNode: LevelGraphNode) {

    if (this.currentLevelGraphRelation.isTargetNodeSourceNodeInSameLevel()) {

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
      this.flashMessage.message = 'HostedOn Relations can only been drawn between two nodes in the same level!';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
      return false;
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method isRefineToRelationDrawAllowed - check if a draw of a refineTo to relation is allowed
   *
   * @param nodeSource: LevelGraphNode - Source node of the relation
   * @param targetNode: LevelGraphNode - Target node of the relation
   *
   ****************************************************************************************************************************************/
  isRefineToRelationDrawAllowed(nodeSource: LevelGraphNode, targetNode: LevelGraphNode, targetLevel: Level) {

    if (this.currentLevelGraphRelation.sourceLevelDepth < targetLevel.depth) {

      if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPEFRAGMENT) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPEFRAGMENT) {
        return true;
      } else {
        this.flashMessage.message = 'Refine To relations can only be drawn between to nodes of same type in different levels or between a node and a node of type fragment!';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        return false;
      }
    } else {
      if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
        return true;
      } else if (nodeSource.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LEVELGRAPHNODETYPES.NODETYPE) {
        return true;
      } else {
        this.flashMessage.message = 'RefineTo relations can only been drawn between nodes in the same level from a level graph node of type fragment to a  level graph node of type relationship or nodetype.';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      }
      return false;
    }

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Small Helper Methods like change, select, view, add methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /*****************************************************************************************************************************************
   *
   *  @method addLevel - Add a new Level to the level graph
   *
   ****************************************************************************************************************************************/
  addLevel() {

    // calculate the y position of the new level
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
        this.currentLevelGraph.levels.push(levelResponse);
        Logger.info('Level with id: ' + levelResponse.id + ' was created sucessfully.', LevelGraphModellerComponent.name);
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
   *  @method removeLevel - Remove a level from the level graph
   *
   ****************************************************************************************************************************************/
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
      this.flashMessage.message = 'A Level Graph must have at least 2 levels.';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method stopAllEvents is called onMouseUpEvent on the draw area to set all flags to false for safety reasons
   *
   ****************************************************************************************************************************************/
  stopAllEvents() {
    this.drawRelation = false;
    this.changeLevelHeight = false;
    this.moveNode = false;
  }

  /*****************************************************************************************************************************************
   *
   * @method onSelectedRepository - Set the data of the current selectedRepository
   *
   * @param repository: Repository - Repository which is selected
   *
   ****************************************************************************************************************************************/
  onSelectRepository(repository: Repository) {
    this.selectedRepository = repository;
  }

  /*****************************************************************************************************************************************
   *
   *  @method - changeTool change the selected tool for model a level graph
   *
   *  @param tool: any - Tool which is selected
   *
   ****************************************************************************************************************************************/
  changeTool(tool: any) {

    for (let t of this.toolList) {
      t.checked = false;
    }
    tool.checked = true;
  }

  setEntity(entity: any) {
    this.entity = entity;
  }

  addProvidedProperties() {
    this.createProvidedProperty.entityProvided = this.entity;
    this.createProvidedProperty.entityProvidedId = this.entity.id;
    this.providedPropertyService.createProvidedProperty(this.createProvidedProperty).subscribe(providedPropertyResponse => this.entity.providedProperties.push(providedPropertyResponse));
  }

}
