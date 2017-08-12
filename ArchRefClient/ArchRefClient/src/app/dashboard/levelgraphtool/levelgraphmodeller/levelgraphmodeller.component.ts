import {Logger} from '../../../../logger/logger';
import {Constants} from '../../../shared/constants/constants';
import {LevelGraphNodeType} from '../../../shared/constants/levelgraphnodetype';
import {LevelGraphRelationType} from '../../../shared/constants/levelgraphrelationtype';
import {Entity} from '../../../shared/datamodels/entity/entity';
import {Level} from '../../../shared/datamodels/levelgraph/level';
import {LevelGraph} from '../../../shared/datamodels/levelgraph/levelgraph';
import {LevelGraphNode} from '../../../shared/datamodels/levelgraph/levelgraphnode';
import {LevelGraphRelation} from '../../../shared/datamodels/levelgraph/levelgraphrelation';
import {ExpectedProperty} from '../../../shared/datamodels/metrics/expectedproperty';
import {ProvidedProperty} from '../../../shared/datamodels/metrics/providedproperty';
import {Path} from '../../../shared/datamodels/utility/path';
import {Point} from '../../../shared/datamodels/utility/point';
import {Repository} from '../../../shared/datamodels/repository/repository';
import {RepositoryService} from '../../../shared/dataservices/repository/repository.service';
import {LevelService} from '../../../shared/dataservices/levelgraph/level.service';
import {LevelGraphService} from '../../../shared/dataservices/levelgraph/levelgraph.service';
import {LevelGraphNodeService} from '../../../shared/dataservices/levelgraph/levelgraphnode.service';
import {LevelGraphRelationService} from '../../../shared/dataservices/levelgraph/levelgraphrelation.service';
import {ExpectedPropertyService} from '../../../shared/dataservices/metrics/expectedproperty.service';
import {ProvidedPropertyService} from '../../../shared/dataservices/metrics/providedpropertyservice.service';
import {Utility} from '../../../utility';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';

@Component({
  selector: 'app-levelgraphmodeller',
  templateUrl: './levelgraphmodeller.component.html',
  styleUrls: ['./levelgraphmodeller.component.css']
})

/*********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphModellerComponent for model a LevelGraph for the refinement of topologies
 *
 * @field - currentDragData: any - Container for storing the data which are moved from the tool box to the draw area and should be created
 * @field - typeCurrentDragData: string - Type of the current drag data
 *
 * @field - repositories: Repository[] - All available repositories in the database
 * @field - selectedRepository: Repository - Currently selected repository
 *
 * @field - entity: Entity - Current selected Entity for add new expected or provided properties
 * @field - createdProvidedProperty: ProvidedProperty - Provided property which should be added
 * @field - createdExpectedProperty: ExpectedProperty - Expected property which should be added
 *
 * @field - currentLevelGraph: LevelGraph - Current LevelGraph which is displayed in the LevelGraphModeller
 * @field - currentLevelGraphNode: LevelGraphNode - Current LevelGraphNode which should be created or moved in the level
 * @field - currentLevelGraphRelation: LevelGraphRelation - Current LevelGraphRelation which should be drawn and created
 *
 * @field - lastMousePositionY: number - Last known x position of the mouse. Needed to calculate the delta of a mouse move event
 * @field - lastMousePositionX: number - Last known y position of the mouse. Needed to calculate the delta of a mouse move event
 *
 * @field - drag: boolean - True if drag and drop event is enabled else false
 * @field - drawRelation: boolean - True if you currently draw a relation else false
 *
 * @field - moveNode: boolean - True if you currently move a node around in the level area
 * @field - changeLevelHeight: boolean - True if you currently change the height of the level area
 *
 * @field - toolList: [] -  The Relation Types of a levelGraph currently implemented as fixed array but you may decide to transform
 *                          this types into class if the have specific attributes which are different from each other
 * @field - levelGraphRelationTypes: [] -The Relation Types of a levelGraph currently implemented as constants Types but you may decide
 *                                       to transform this types into class if the have specific attributes which are different from each other
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may
 *                                       cause a "Over-Flashing" for the user experience
 *
 ********************************************************************************************************************************************************************************************************/
export class LevelGraphModellerComponent implements OnInit {

  currentDragData: any;
  typeCurrentDragData: string;

  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository();

  entity: Entity = new Entity();
  createdProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');
  createdExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');

  currentLevelGraph: LevelGraph = new LevelGraph();
  currentLevelGraphNode: LevelGraphNode = new LevelGraphNode();
  currentLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  drag = false;
  drawRelation = false;
  moveNode = false;
  changeLevelHeight = false;

  exitPoint: boolean;
  entryPoint: boolean;

  toolList = [
    {name: 'Move Node', checked: true},
    {name: 'ConnectOverTo', checked: false},
    {name: 'RefineTo', checked: false}
  ];

  levelGraphRelationTypes = [
    {name: 'ConnectOverTo', checked: true},
    {name: 'RefineTo', checked: true},
  ];

  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private levelGraphService: LevelGraphService,
    private repositoryService: RepositoryService,
    private levelGraphNodeService: LevelGraphNodeService,
    private levelService: LevelService,
    private levelGraphRelationService: LevelGraphRelationService,
    private flashMessageService: FlashMessageService,
    private providedPropertyService: ProvidedPropertyService,
    private expectedPropertySerivce: ExpectedPropertyService) {
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   ******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Initialize LevelGraphModellerComponent', LevelGraphModellerComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentLevelGraph.id = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = Constants.FLASHMESSAGETIMEOUT;
    this.selectedRepository.name = 'Select Repository';
    this.retrieveLevelGraph(this.currentLevelGraph.id);
    this.retrieveRepositories();

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Retrieve Methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - retrieveRepositories -Call the RepositoryService for loading all repositories from database into the application and subscribe
   *                                 for a callback. Currently no pagination/streaming of data is supported
   *
   ******************************************************************************************************************************************************************************************************/
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraph - Call the LevelGraphService for loading repository from database into the application and subscribe
   *                                 for a callback.
   *
   * @param id: number - ID of the level graph which should be retrieved from the database
   *
   ******************************************************************************************************************************************************************************************************/
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Update Methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - updateLevelGraph - Call the LevelGraphService Update Method for update the data in the database
   *
   ******************************************************************************************************************************************************************************************************/
  updateLevelGraph() {
    this.levelGraphService.updateLevelGraph(this.currentLevelGraph)
      .subscribe(levelGraph => {
        this.currentLevelGraph = levelGraph;
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Create Methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - createLevelGraphNode - Call the LevelGraphNodeService for creating a new LevelGraphNode in the database
   *                                  and subscribe for a callback
   *
   ******************************************************************************************************************************************************************************************************/
  createLevelGraphNode(levelGraphNode: LevelGraphNode) {
    this.levelGraphNodeService.createLevelGraphNode(levelGraphNode)
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - createLevelGraphRelation - Call the LevelGraphRelationService for creating a new LevelGraphRelation in the database
   *                                      and subscribe for a callback
   *
   ******************************************************************************************************************************************************************************************************/
  createLevelGraphRelation() {
    this.levelGraphRelationService.createLevelGraphRelation(this.currentLevelGraphRelation)
      .subscribe(levelGraphRelationResponse => {
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Delete Methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - deleteLevelGraphNode - Call the LevelGraphNodeService for delete a LevelGraphNode from the database and subscribe for a callback.
   *
   * @param - levelGraphNode: LevelGraphNode - LevelGraphNode witch should be deleted
   *
   ******************************************************************************************************************************************************************************************************/
  deleteLevelGraphNode(levelGraphNode: LevelGraphNode) {
    this.levelGraphNodeService.deleteLevelGraphNode(levelGraphNode.id).subscribe(levelGraphNodeResponse => {

      for (let levelGraphRelation of this.currentLevelGraph.levelGraphRelations) {
        if (levelGraphRelation.sourceNodeId === levelGraphNode.id) {
          for (let node of this.currentLevelGraph.levelGraphNodes) {
            if (node.id === levelGraphRelation.targetNodeId) {
              node.inLevelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, node.inLevelGraphRelations);
            }
          }
          this.currentLevelGraph.levelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, this.currentLevelGraph.levelGraphRelations);

        }

        if (levelGraphRelation.targetNodeId === levelGraphNode.id) {
          for (let node of this.currentLevelGraph.levelGraphNodes) {
            if (node.id === levelGraphRelation.sourceNodeId) {
              node.outLevelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, node.outLevelGraphRelations);
            }
          }
          this.currentLevelGraph.levelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, this.currentLevelGraph.levelGraphRelations);
        }
      }

      this.currentLevelGraph.levelGraphNodes = Utility.deleteElementFromArry(levelGraphNode.id, this.currentLevelGraph.levelGraphNodes);
      //    this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
      Logger.info('Level Graph Node with id: ' + levelGraphNode.id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - delelteLevelGraphRelation - Delete level graph relation and update the level graph
   *
   * @param - levelGraphRelation: LevelGraphRelation - LevelGraphRelation witch should be deleted
   *
   ******************************************************************************************************************************************************************************************************/
  deleteLevelGraphRelation(levelGraphRelation: LevelGraphRelation) {
    this.levelGraphRelationService.deleteLevelGraphRelation(levelGraphRelation.id)
      .subscribe(levelGraphRelationResponse => {

        for (let node of this.currentLevelGraph.levelGraphNodes) {
          if (node.id === levelGraphRelation.sourceNodeId) {
            node.outLevelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, node.outLevelGraphRelations);
          }

          if (node.id === levelGraphRelation.targetNodeId) {
            node.inLevelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, node.inLevelGraphRelations);
          }
        }

        this.currentLevelGraph.levelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, this.currentLevelGraph.levelGraphRelations);

        // this.levelGraphService.getLevelGraph(this.currentLevelGraph.id).subscribe(levelGraphResponse => this.currentLevelGraph = levelGraphResponse);
        Logger.info('Level Graph Relation with id: ' + levelGraphRelation.id + ' was deleted sucessfully.', LevelGraphModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Move Node Event Handling
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - startMoveNode - Start moving a node in the level area if the moving tool is selected
   *
   * @param - event: MouseEvent - Event Object of the onMouseDown Event
   * @param - levelGraphNode: LevelGraphNode - LevelGraphNode which should be moved
   *
   ******************************************************************************************************************************************************************************************************/
  startMoveNode(event: MouseEvent, levelGraphNode) {
    if (!this.moveNode && this.toolList[0].checked) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.currentLevelGraphNode = levelGraphNode;
      this.moveNode = true;
    }
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onMoveNode - Move a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   * @param - event: MouseEvent - Event Object of the onMouseMove Event
   * @param - level: Level - Level in which the node should be moved
   *
   ******************************************************************************************************************************************************************************************************/
  onMoveNode(event: MouseEvent, level: Level) {

    if (this.moveNode) {

      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      // Change Node Position
      if (((this.currentLevelGraphNode.x + deltaX) > 0)) {
        this.currentLevelGraphNode.x = (this.currentLevelGraphNode.x + deltaX);
      }

      if ((this.currentLevelGraphNode.y + deltaY) > 0 && ((this.currentLevelGraphNode.y + deltaY + this.currentLevelGraphNode.height) < (level.height))) {
        this.currentLevelGraphNode.y = (this.currentLevelGraphNode.y + deltaY);
      }

      // Change Relation Position
      for (let levelGraphRelation of this.currentLevelGraph.levelGraphRelations) {

        // Change Incoming Relation End Point Position
        if (this.currentLevelGraphNode.id === levelGraphRelation.targetNodeId) {
          if (levelGraphRelation.levelGraphRelationType === LevelGraphRelationType.REFINE_TO) {
            if ((levelGraphRelation.path.points[1].x + deltaX) > (0 + Constants.LABELOFFSET + (Constants.NODEWIDTH / 2))) {
              levelGraphRelation.path.points[1].x = levelGraphRelation.path.points[1].x + deltaX;
            }
            if ((levelGraphRelation.path.points[1].y + deltaY) > level.y + 0 + Constants.NODEHEIGHT / 2 && ((levelGraphRelation.path.points[1].y + deltaY) < (level.y + level.height - Constants.NODEHEIGHT / 2))) {
              levelGraphRelation.path.points[1].y = levelGraphRelation.path.points[1].y + deltaY;
            }
          } else {
            if ((levelGraphRelation.path.points[1].x + deltaX) > (0 + (Constants.NODEWIDTH / 2))) {
              levelGraphRelation.path.points[1].x = levelGraphRelation.path.points[1].x + deltaX;
            }
            if ((levelGraphRelation.path.points[1].y + deltaY) > 0 + Constants.NODEHEIGHT / 2 && ((levelGraphRelation.path.points[1].y + deltaY) < (level.height - Constants.NODEHEIGHT / 2))) {
              levelGraphRelation.path.points[1].y = levelGraphRelation.path.points[1].y + deltaY;
            }
          }
        }

        // Change Outgoing Relation Start Point Position
        if (this.currentLevelGraphNode.id === levelGraphRelation.sourceNodeId) {
          if (levelGraphRelation.levelGraphRelationType === LevelGraphRelationType.REFINE_TO) {
            if ((levelGraphRelation.path.points[0].x + deltaX) > 0 + Constants.LABELOFFSET + Constants.NODEWIDTH / 2) {
              levelGraphRelation.path.points[0].x = levelGraphRelation.path.points[0].x + deltaX;
            }
            if ((levelGraphRelation.path.points[0].y + deltaY) > level.y + 0 + Constants.NODEHEIGHT / 2 && ((levelGraphRelation.path.points[0].y + deltaY) < (level.y + level.height - Constants.NODEHEIGHT / 2))) {
              levelGraphRelation.path.points[0].y = levelGraphRelation.path.points[0].y + deltaY;
            }
          } else {
            if ((levelGraphRelation.path.points[0].x + deltaX) > 0 + Constants.NODEWIDTH / 2) {
              levelGraphRelation.path.points[0].x = levelGraphRelation.path.points[0].x + deltaX;
            }
            if ((levelGraphRelation.path.points[0].y + deltaY) > 0 + Constants.NODEHEIGHT / 2 && ((levelGraphRelation.path.points[0].y + deltaY) < (level.height - Constants.NODEHEIGHT / 2))) {
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - stopMoveNode - Stop the moving event of a node and his in and outgoing edges in his level area if the moving tool is selected
   *
   * @param - event: MouseEvent - Event Object of the onMouseUp Event
   *
   ******************************************************************************************************************************************************************************************************/
  stopMoveNode(event: MouseEvent) {
    if (this.moveNode) {
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.updateLevelGraph();
      this.moveNode = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Draw Relation Event Handling
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - startDrawRelation - Start the draw relation event if one of the draw relation tool is selected
   *
   * @param - event: MouseEvent - Event Object of the onMouseDown Event
   * @param - level: Level - Level of the source node
   * @param - sourceNode: LevelGraphNode - Source Node of the LevelGraphRelation
   *
   ******************************************************************************************************************************************************************************************************/
  startDrawRelation(event: MouseEvent, level: Level, sourceNode: LevelGraphNode) {

    if (this.toolList[1].checked || this.toolList[2].checked) {
      this.drawRelation = true;

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let levelGraphRelationType: string;

      let startPoint: Point;
      let endPoint: Point;

      if (this.toolList[2].checked) {
        levelGraphRelationType = LevelGraphRelationType.REFINE_TO;
        startPoint = new Point(this.lastMousePositionX, this.lastMousePositionY);
        endPoint = new Point(this.lastMousePositionX - 5, this.lastMousePositionY - 5);
      } else {
        startPoint = new Point(this.lastMousePositionX - 50, this.lastMousePositionY - level.y);
        endPoint = new Point(this.lastMousePositionX - 50 - 5, this.lastMousePositionY - level.y - 5);
        levelGraphRelationType = LevelGraphRelationType.CONNECT_OVER_TO;
      }

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentLevelGraphRelation = new LevelGraphRelation(level.depth, level.depth, sourceNode.id, sourceNode.id, this.currentLevelGraph.id, tempPath, levelGraphRelationType);
      this.currentLevelGraphRelation.levelGraph = this.currentLevelGraph;
      this.currentLevelGraphRelation.sourceLevelGraphNode = sourceNode;
      this.currentLevelGraphRelation.sourceLevel = level;
      this.currentLevelGraphRelation.sourceLevelId = level.id;
    }
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onDrawRelation - Update the end point position of the path of a relation
   *
   * @param - event: MouseEvent - Event Object of the onMouseMove Event
   *
   ******************************************************************************************************************************************************************************************************/
  onDrawRelation(event: MouseEvent) {

    if (this.drawRelation) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      this.currentLevelGraphRelation.path.points[1].x = this.currentLevelGraphRelation.path.points[1].x + deltaX;
      this.currentLevelGraphRelation.path.points[1].y = this.currentLevelGraphRelation.path.points[1].y + deltaY;
      this.currentLevelGraphRelation.path.updatePath();

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }

  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   * @param - event: MouseEvent - Event Object of the onMouseUp Event
   * @param - targetNode: LevelGraphNode - Target Node of the relation which should be draw
   * @param - targetLevel: Level - Level of the target node
   *
   ******************************************************************************************************************************************************************************************************/
  stopDrawRelation(event, targetNode: LevelGraphNode, targetLevel: Level) {

    if (this.drawRelation) {
      let sourceNode = this.currentLevelGraphRelation.sourceLevelGraphNode;
      let sourceCenterX = sourceNode.x + sourceNode.width / 2;
      let sourceCenterY = sourceNode.y + sourceNode.height / 2;
      let targetCenterX = targetNode.x + targetNode.width / 2;
      let targetCenterY = targetNode.y + targetNode.height / 2;
      this.currentLevelGraphRelation.targetLevelDepth = targetLevel.depth;
      this.currentLevelGraphRelation.targetLevel = targetLevel;
      this.currentLevelGraphRelation.targetLevelId = targetLevel.id;
      this.currentLevelGraphRelation.targetNodeId = targetNode.id;
      this.currentLevelGraphRelation.targetLevelGraphNode = targetNode;

      if (!this.currentLevelGraphRelation.isSourceNodeEqualTargetNode()) {

        if (!this.isRelationExist(sourceNode, targetNode)) {

          if (this.toolList[1].checked && this.isConnectedToRelationDrawAllowed(sourceNode, targetNode)) {
            this.currentLevelGraphRelation.path.points[0].x = sourceCenterX;
            this.currentLevelGraphRelation.path.points[0].y = sourceCenterY;
            this.currentLevelGraphRelation.path.points[1].y = targetCenterY;
            this.currentLevelGraphRelation.path.points[1].x = targetCenterX;
            this.currentLevelGraphRelation.path.updatePath();
            this.createLevelGraphRelation();
          } else if (this.toolList[2].checked && this.isRefineToRelationDrawAllowed(sourceNode, targetNode, targetLevel)) {
            this.currentLevelGraphRelation.path.points[0].x = sourceCenterX + Constants.LABELOFFSET;
            this.currentLevelGraphRelation.path.points[1].y = targetCenterY + targetLevel.y;
            this.currentLevelGraphRelation.path.points[1].x = targetCenterX + Constants.LABELOFFSET;
            this.currentLevelGraphRelation.path.updatePath();
            if ((sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) || (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE)) {
              this.currentLevelGraphRelation.entryPoint = true;
              this.currentLevelGraphRelation.exitPoint = true;
            }
            sourceNode.providedProperties = sourceNode.providedProperties.concat(targetNode.providedProperties);
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Drag and Drop Event Handling
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onDrag - is called to start drag and drop of level graph nodes from toolbox to the draw area
   *
   * @param - event: Event - Event Object of the onDrag Event
   * @param - dragData: any, - Level on which the node will be droped
   * @param - typeDragData: any, - Type of the data which is dragged from the toolbox
   *
   ******************************************************************************************************************************************************************************************************/
  onDrag(event, dragData: any, typeDragData: string) {
    this.currentDragData = dragData;
    this.typeCurrentDragData = typeDragData;
    this.drag = true;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onDragOver is called to allow a drag over between different div containers
   *
   * @param - event: Event - Event Object of the onDragOver Event
   *
   ******************************************************************************************************************************************************************************************************/
  onDragOver(event: MouseEvent) {
    event.preventDefault();
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onDrop is called to create a LevelGraphNode in the drawArea
   *
   * @param - event: Event - Event Object of the onDrop Event
   * @param - level: Level - Level on which the node will be droped
   *
   ******************************************************************************************************************************************************************************************************/
  onDrop(event, level: Level) {

    if (this.drag === true) {
      let levelGraphNode = new LevelGraphNode();
      levelGraphNode.level = level;
      levelGraphNode.levelId = level.id;
      levelGraphNode.levelDepth = level.depth;
      levelGraphNode.levelGraph = this.currentLevelGraph;
      levelGraphNode.levelGraphId = this.currentLevelGraph.id;

      if (event.offsetX - Constants.LABELOFFSET - Constants.NODEWIDTH / 2 < 0) {
        levelGraphNode.x = 0;
      } else {
        levelGraphNode.x = event.offsetX - Constants.LABELOFFSET - Constants.NODEWIDTH / 2;
      }

      if (event.offsetY - level.y - Constants.NODEHEIGHT / 2 < 0) {
        levelGraphNode.y = 0;
      } else {
        levelGraphNode.y = event.offsetY - level.y - Constants.NODEHEIGHT / 2;
      }


      if (this.typeCurrentDragData === LevelGraphNodeType.NODETYPEFRAGMENT || this.typeCurrentDragData === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT) {
        if (level.depth > Constants.LOWESTABSTRACTIONLEVEL) {
          if (this.typeCurrentDragData === LevelGraphNodeType.NODETYPEFRAGMENT) {
            levelGraphNode.levelGraphNodeType = LevelGraphNodeType.NODETYPEFRAGMENT;
          } else {
            levelGraphNode.levelGraphNodeType = LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT;
          }
          levelGraphNode.name = 'Unnamed';
          this.createLevelGraphNode(levelGraphNode);
        } else {
          this.flashMessage.message = 'Fragment Nodes cannot be added to level ' + Constants.LOWESTABSTRACTIONLEVEL + ' of a level graph!';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
        }
      } else {
        levelGraphNode.name = this.currentDragData.name;

        for (let property of this.currentDragData.providedProperties) {
          let tempProperty = new ProvidedProperty(property.name, property.value);
          levelGraphNode.providedProperties.push(tempProperty);
        }

        levelGraphNode.levelGraphNodeType = this.typeCurrentDragData;
        levelGraphNode.levelGraphNodeTypeId = this.currentDragData.id;
        levelGraphNode.icon = this.currentDragData.icon;

        this.createLevelGraphNode(levelGraphNode);
      }
      this.drag = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - ChangeLevelHeight Event Handling
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - startChangeLevelHeight - Start the level change height event
   *
   * @param - event: MouseEvent - Event Object of the onMouseDown Event
   *
   ******************************************************************************************************************************************************************************************************/
  startChangeLevelHeight(event: MouseEvent) {
    this.changeLevelHeight = true;
    this.lastMousePositionY = event.offsetY;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - changeLevelHeight - Change level height of the level draw area
   *
   * @param - event: MouseEvent - Event Object of the onMouseMove Event
   * @param - level: Level - Level witch should be changed
   *
   ******************************************************************************************************************************************************************************************************/
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

      for (let tempLevel of this.currentLevelGraph.levels) {
        if (tempLevel.visible && tempLevel.depth > level.depth) {
          tempLevel.y = tempLevel.y + delta;
        }
      }
    }
    this.lastMousePositionY = newMousePositionY;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - stopChangeLevelHeight - Stop the level change height event and update the level graph data
   *
   * @param - event: MouseEvent - Event Object of the onMouseUp Event
   *
   ******************************************************************************************************************************************************************************************************/
  stopChangeLevelHeight(event: MouseEvent) {
    this.changeLevelHeight = false;
    this.lastMousePositionY = event.offsetY;
    this.updateLevelGraph();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Filter/Show Methods for show and hide data
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onShowLevel - Show a Level if it is currently invisible or hide a Level if it is currently visible
   *
   * @param -level:Level - Level which should be displayed or hide from the draw area
   *
   ******************************************************************************************************************************************************************************************************/
  onShowLevel(level: Level) {

    if (level.visible) {
      level.visible = false;
      for (let templevel of this.currentLevelGraph.levels) {
        if (templevel.visible && templevel.depth > level.depth) {
          templevel.y = templevel.y - level.height - Constants.LEVELGAPOFFSET;
        }
      }
    } else {
      level.visible = true;
      for (let templevel of this.currentLevelGraph.levels) {
        if (templevel.visible && (templevel.depth + 1) === level.depth) {
          level.y = templevel.y + templevel.height + Constants.LEVELGAPOFFSET;
        } else if (templevel.depth > level.depth) {
          templevel.y = templevel.y + level.height + Constants.LEVELGAPOFFSET;
        }
      }
    }

  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - showRefineToRelation - Show or hide the refienToRelations if the level height is changed and overlay a level
   *
   * @param - levelGraphRelation: LevelGraphRelation - Checks if a RefineTo Relation should be displayed or not accorrding to the level
   *                                                   height of all level areas
   *
   ******************************************************************************************************************************************************************************************************/
  showRefineToRelation(levelGraphRelation: LevelGraphRelation) {

    for (let level of this.currentLevelGraph.levels) {
      if (!level.visible) {
        if (levelGraphRelation.sourceLevelDepth === level.depth || levelGraphRelation.targetLevelDepth === level.depth) {
          return false;
        }
      } else {
        if (levelGraphRelation.sourceLevelDepth < level.depth) {
          if (levelGraphRelation.path.points[0].y + Constants.LEVELGAPOFFSET * (level.depth - 1) >= level.y) {
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Check Methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - isRelationExist - checks if a directed relation exist between to nodes
   *
   * @param - sourceNode: LevelGraphNode - Source node of the relation
   * @param - targetNode: LevelGraphNode - Target node of the relation
   *
   ******************************************************************************************************************************************************************************************************/
  isRelationExist(sourceNode: LevelGraphNode, targetNode: LevelGraphNode) {

    for (let targetRelation of targetNode.inLevelGraphRelations) {
      for (let sourceRelation of sourceNode.outLevelGraphRelations) {
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - isConnectedToRelationDrawAllowed - check if a draw of a connectedTo relation is allowed
   *
   * @param - sourceNode: LevelGraphNode - Source node of the relation
   * @param - targetNode: LevelGraphNode - Target node of the relation
   *
   ******************************************************************************************************************************************************************************************************/
  isConnectedToRelationDrawAllowed(sourceNode: LevelGraphNode, targetNode: LevelGraphNode) {
    if (this.currentLevelGraphRelation.isTargetNodeSourceNodeInSameLevel()) {
      if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - isRefineToRelationDrawAllowed - check if a draw of a refineTo to relation is allowed
   *
   * @param - sourceNode: LevelGraphNode - Source node of the relation
   * @param - targetNode: LevelGraphNode - Target node of the relation
   *
   ******************************************************************************************************************************************************************************************************/
  isRefineToRelationDrawAllowed(sourceNode: LevelGraphNode, targetNode: LevelGraphNode, targetLevel: Level) {

    if (this.currentLevelGraphRelation.sourceLevelDepth < targetLevel.depth) {

      if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPEFRAGMENT) {
        return true;
      } else {
        this.flashMessage.message = 'Refine To relations can only be drawn between to nodes of same type in different levels or between a node and a node of type fragment!';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        return false;
      }
    } else {
      if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
        return true;
      } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Small Helper Methods like change, select, view, add methods
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - addLevel - Add a new Level to the level graph
   *
   ******************************************************************************************************************************************************************************************************/
  addLevel() {

    let y = 0;
    for (let level of this.currentLevelGraph.levels) {
      if (level.visible) {
        y = y + level.height + Constants.LEVELGAPOFFSET;
      }
    }

    let tempLevel: Level = new Level(this.currentLevelGraph.levels.length, y, this.currentLevelGraph.id);
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

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - removeLevel - Remove a level from the level graph
   *
   ******************************************************************************************************************************************************************************************************/
  removeLevel() {
    if (this.currentLevelGraph.levels.length > 2) {

      this.levelService.deleteLevel(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id)
        .subscribe(response => {
          this.currentLevelGraph.removeLevel(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id);
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

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - stopAllEvents is called onMouseUpEvent on the draw area to set all flags to false for safety reasons
   *
   ******************************************************************************************************************************************************************************************************/
  stopAllEvents() {
    this.drawRelation = false;
    this.changeLevelHeight = false;
    this.moveNode = false;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - onSelectedRepository - Set the data of the current selectedRepository
   *
   * @param - repository: Repository - Repository which is selected
   *
   ******************************************************************************************************************************************************************************************************/
  onSelectRepository(repository: Repository) {
    this.selectedRepository = repository;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - changeTool change the selected tool for model a level graph
   *
   *  @param - tool: any - Tool which is selected
   *
   ******************************************************************************************************************************************************************************************************/
  changeTool(tool: any) {

    for (let t of this.toolList) {
      t.checked = false;
    }
    tool.checked = true;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - setEntity - Set Entity to which a expected or provided property should be added
   *
   *  @param - entity: any - Entity which should be set
   *
   ******************************************************************************************************************************************************************************************************/
  setEntity(entity: any) {
    this.entity = entity;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - addProvidedProperty - Add a ProvidedProperty to the current set entity
   *
   ******************************************************************************************************************************************************************************************************/
  addProvidedProperty() {
    this.createdProvidedProperty.entityProvided = this.entity;
    this.createdProvidedProperty.entityProvidedId = this.entity.id;
    this.providedPropertyService.createProvidedProperty(this.createdProvidedProperty).subscribe(providedPropertyResponse => this.entity.providedProperties.push(providedPropertyResponse));
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - addExpectedProperty - Add a ExpectedProperty to the current set entity
   *
   ******************************************************************************************************************************************************************************************************/
  addExpectedProperty() {
    this.createdExpectedProperty.entityExpected = this.entity;
    this.createdExpectedProperty.entityExpectedId = this.entity.id;
    this.expectedPropertySerivce.createExpectedProperty(this.createdExpectedProperty).subscribe(expectedPropertyResponse => this.entity.expectedProperties.push(expectedPropertyResponse));
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - addExpectedProperty - Add a ExpectedProperty to the current set entity
   *
   ******************************************************************************************************************************************************************************************************/
  setEntryExitProperty() {
    this.currentLevelGraphRelation.exitPoint = this.exitPoint;
    this.currentLevelGraphRelation.entryPoint = this.entryPoint;
    this.updateLevelGraph();
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - isEntryExitRelation - Set the entry and exit property of a refineTo relation
   *
   ******************************************************************************************************************************************************************************************************/
  isEntryExitRelation(relation: LevelGraphRelation) {
    let sourceNode: LevelGraphNode;
    let targetNode: LevelGraphNode;

    for (let node of this.currentLevelGraph.levelGraphNodes) {
      if (relation.sourceNodeId === node.id) {
        sourceNode = node;
      }
      if (relation.targetNodeId === node.id) {
        targetNode = node;
      }
    }

    if (sourceNode.levelGraphNodeType === LevelGraphNodeType.NODETYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
      return true;
    } else if (sourceNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT && targetNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
      return true;
    } else {
      return false;
    }

  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @method - setLevelGraphRelation - Set current selected relation and the values of the entry and exit point of the relation
   *
   ******************************************************************************************************************************************************************************************************/
  setLevelGraphRelation(relation: LevelGraphRelation) {
    this.currentLevelGraphRelation = relation;
    this.entryPoint = relation.entryPoint;
    this.exitPoint = relation.exitPoint;
  }

  setLevelGraphNode(levelGraphNode: LevelGraphNode) {
    this.currentLevelGraphNode = levelGraphNode;
  }

  editLevelGraphNodeName(name: string) {
    this.currentLevelGraphNode.name = name;
    this.currentLevelGraph.levelGraphNodes = Utility.updateElementInArry(this.currentLevelGraphNode, this.currentLevelGraph.levelGraphNodes);
    this.updateLevelGraph();

  }

}
