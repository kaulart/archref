import { Logger } from '../../../../logger/logger';
import { Constants } from '../../../shared/constants/constants';
import { LevelGraphNodeType } from '../../../shared/constants/levelgraphnodetype';
import { LevelGraphRelationType } from '../../../shared/constants/levelgraphrelationtype';
import { Entity } from '../../../shared/datamodels/entity/entity';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { LevelGraphNode } from '../../../shared/datamodels/levelgraph/levelgraphnode';
import { ExpectedProperty } from '../../../shared/datamodels/metrics/expectedproperty';
import { ProvidedProperty } from '../../../shared/datamodels/metrics/providedproperty';
import { Repository } from '../../../shared/datamodels/repository/repository';
import { NodeTemplate } from '../../../shared/datamodels/topology/nodetemplate';
import { RelationshipTemplate } from '../../../shared/datamodels/topology/relationshiptemplate';
import { TopologyTemplate } from '../../../shared/datamodels/topology/topologytemplate';
import { RelationshipType } from '../../../shared/datamodels/types/relationshiptype';
import { Path } from '../../../shared/datamodels/utility/path';
import { Point } from '../../../shared/datamodels/utility/point';
import { LevelService } from '../../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph/levelgraph.service';
import { LevelGraphNodeService } from '../../../shared/dataservices/levelgraph/levelgraphnode.service';
import { ExpectedPropertyService } from '../../../shared/dataservices/metrics/expectedproperty.service';
import { ProvidedPropertyService } from '../../../shared/dataservices/metrics/providedpropertyservice.service';
import { RefinementService } from '../../../shared/dataservices/refinement/refinement.service';
import { RepositoryService } from '../../../shared/dataservices/repository/repository.service';
import { NodeTemplateService } from '../../../shared/dataservices/topologytemplate/nodetemplate.service';
import { NodeTypeService } from '../../../shared/dataservices/types/nodetype.service';
import { RelationshipTemplateService } from '../../../shared/dataservices/topologytemplate/relationshiptemplate.service';
import { RelationshipTypeService } from '../../../shared/dataservices/types/relationshiptype.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopologyTemplateService } from '../../../shared/dataservices/topologytemplate/topologytemplate.service';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-topologymodeller',
  templateUrl: './topologymodeller.component.html',
  styleUrls: ['./topologymodeller.component.css']
})

/*****************************************************************************************************************************************************
 *
 * @component - TopologyModellerComponent Class - With this component you can display, model or refine a TopologyTemplate. It implements different retrieve,
 *                                                update, create and delete methods for different data types like NodeTemplates, RelationshipTemplates,
 *                                                TopologyTemplates, etc. Also it implements all Events which are used for model a TopologyTemplate like
 *                                                move a node and draw a relation. And it`s call the refinement algorithm on the server side and subscribe
 *                                                for a response.
 *
 * @field - rootTopologyTemplate: TopologyTemplate - Root TopologyTemplate which have to be modeled by the user
 * @field - currentTopologyTemplate: TopologyTemplate - Current displayed TopologyTemplate in the ModellerComponent
 * @field - currentNodeTemplate: NodeTemplate - NodeTemplate which should be moved with the move tool
 * @field - currentRelationshipTemplate - RelationshipTemplate - RelationshipTemplate which should be draw and created on the draw area with the draw tool
 * @field - levelGraphs: LevelGraph[] - List of all available LevelGraphs in the database
 * @field - selectedLevelGraph: LevelGraph - Current selected levelGraph in the tool box
 * @field - repositories: Repository[] - List of all available repositories in the database
 * @field - selectedRepository: Repository - Current selected repository in the tool box
 * @field - maxAbstractionLevel: number - Maximal number of different abstraction levels of the rootTopology default 2 because a Level Graph has
 *                                        at least two different levels
 * @field - lastMousePositionY: number - Last known x position of the mouse. Needed to calculate the delta of a mouse move event
 * @field - lastMousePositionX: number - Last known y position of the mouse. Needed to calculate the delta of a mouse move event
 * @field - currentDragData: any - Container for storing the data which are moved from the tool box to the draw area and should be created
 * @field - entity: Entity - Current selected Entity for add new expected or provided properties
 * @field - createdProvidedProperty: ProvidedProperty - Provided property which should be added
 * @field - createdExpectedProperty: ExpectedProperty - Expected property which should be added
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may
 *                                       cause a "Over-Flashing" for the user experience
 * @field - dragNodeType: boolean - True if you drag a nodeType from the repository tool box to the draw area
 * @field - dragLevelGraphNode: boolean - True if you drag a levelGraphNode from the level graph tool box to the draw area
 * @field - moveNode: boolean - True if you move a node in the draw area
 * @field - drawRelation: boolean - True if you draw a relationTemplate with a relationType from a repository and not directly from a level graph
 * @field - drawCurrentLevelGraphCompliantRelation: boolean - True if you draw a relationsTemplate with a relationType from a level graph node of a level graph
 * @field - currentLevelGraphCompliantRelationshipTypes: boolean - Collection of the relationshipTypes of a node template witch a compliant to a level graph node
 *
 * @author - Arthur Kaul
 *
 *****************************************************************************************************************************************************/
export class TopologyModellerComponent implements OnInit {

  rootTopologyTemplate = new TopologyTemplate();
  currentTopologyTemplate = new TopologyTemplate();
  currentTopologyTemplates: TopologyTemplate[] = [];

  currentNodeTemplate: NodeTemplate;
  currentRelationshipTemplate: RelationshipTemplate;

  levelGraphs: LevelGraph[] = [];

  selectedLevelGraph: LevelGraph = new LevelGraph();
  selectedLevelGraphNodeNodeType: LevelGraphNode[] = [];
  selectedLevelGraphNodeNodeTypeCurrentAbstractionLevel: LevelGraphNode[] = [];
  selectedLevelGraphNodeRelationType: LevelGraphNode[] = [];
  selectedLevelGraphNodeRelationTypeCurrentAbstractionLevel: LevelGraphNode[] = [];

  repositories: Repository[] = [];

  selectedRepository: Repository = new Repository();

  currentAbstractionLevel = 0;
  maxAbstractionLevel = 4;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  currentDragData: any;

  dragNodeType = false;
  dragLevelGraphNode = false;
  moveNode = false;
  drawRelation = false;
  drawCurrentLevelGraphRelation = false;
  drawCurrentLevelGraphCompliantRelation = false;
  currentLevelGraphCompliantRelationshipTypes: LevelGraphNode[] = [];

  entity: Entity = new Entity();
  createProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');
  createExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');

  public flashMessage = new FlashMessage();

  constructor(private repositoryService: RepositoryService,
    private levelGraphNodeService: LevelGraphNodeService,
    private levelService: LevelService,
    private flashMessageService: FlashMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private topologyTemplateService: TopologyTemplateService,
    private nodeTypeService: NodeTypeService,
    private relationshipTypeService: RelationshipTypeService,
    private levelGraphService: LevelGraphService,
    private nodeTemplateService: NodeTemplateService,
    private providedPropertyService: ProvidedPropertyService,
    private expectedPropertyService: ExpectedPropertyService,
    private relationshipTemplateService: RelationshipTemplateService,
    private refinementService: RefinementService) { }

  /*****************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   ****************************************************************************************************************************************/
  ngOnInit() {

    Logger.info('Initialize TopologyModellerComponent', TopologyModellerComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplate.id = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = 4000;
    this.retrieveTopologyTemplate(this.currentTopologyTemplate.id);
    this.retrieveRepositories();
    this.retrieveLevelGraphs();
    this.selectedRepository.name = 'Select Repository';
    this.selectedLevelGraph.name = 'Select Level Graph';

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Retrieve Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - retrieveTopologyTemplate - Call the TopologyTemplateService for loading a TopologyTemplate from database into the application
   *                                      and subscribe for a callback.
   *
   * @param - id: number - Number of TopologyTemplate which should be loaded from the database
   *
   ****************************************************************************************************************************************/
  retrieveTopologyTemplate(id: number) {
    Logger.info('Retrieve TopologyTemplate Data', TopologyModellerComponent.name);
    this.topologyTemplateService.getTopologyTemplate(id)
      .subscribe(topologyTemplateResponse => {
        this.currentTopologyTemplate = topologyTemplateResponse;
        this.currentAbstractionLevel = topologyTemplateResponse.abstractionLevel;
        this.setRootTopology();
        this.currentTopologyTemplates.push(topologyTemplateResponse);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.id + ' and name: ' + topologyTemplateResponse.name + 'was retrieved sucessfully.', TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************************************
   *
   * @method - retrieveRepositories - Call the RepositoryService for loading a Repository from database into the application
   *                                  and subscribe for a callback.
   *
   ****************************************************************************************************************************************/
  retrieveRepositories() {
    Logger.info('Retrieve Repositories Data', TopologyModellerComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        Logger.info('Repositories retrieved sucessfully.', TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************************************
   *
   * @method - retrieveLevelGraphs - Call the LevelGraphService for loading all LevelGraphs from database into the application and subscribe
   *                                 for a callback. Currently no pagination/streaming of data is supported
   *
   ****************************************************************************************************************************************/
  retrieveLevelGraphs() {
    Logger.info('Retrieve LevelGraphs Data', TopologyModellerComponent.name);
    this.levelGraphService.getLevelGraphs().subscribe(levelGraphsResponse => {
      this.levelGraphs = levelGraphsResponse;
      Logger.info('LevelGraphs were retrieved sucessfully', TopologyModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Create Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - createNodeTemplate - Call the NodeTemplateService for creating a new NodeTemplate in the database
   *                                and subscribe for a callback
   *
   * @param - nodeTemplate: NodeTemplate - NodeTemplate which should be stored in the database
   *
   ****************************************************************************************************************************************/
  createNodeTemplate(nodeTemplate: NodeTemplate) {
    Logger.info('Create NodeTemplate', TopologyModellerComponent.name);
    this.nodeTemplateService.createNodeTemplate(nodeTemplate)
      .subscribe(nodeTemplateResponse => {
        this.currentTopologyTemplate.nodeTemplates.push(nodeTemplateResponse);
        Logger.info('Node Template was sucessfully created with id: ' + nodeTemplateResponse.id, TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************************************
   *
   * @method - createLevelGraphRelation - Call the RelationshipTemplateService for creating a new RelationshipTemplate in the database
   *                                      and subscribe for a callback
   *
   * @param - relationshipTemplate: RelationshipTemplate - RelationshipTemplate which should be stored in the database
   *
   ****************************************************************************************************************************************/
  createRelationshipTemplate(relationshipTemplate: RelationshipTemplate) {
    Logger.info('Create RelationshipTemplate', TopologyModellerComponent.name);
    this.relationshipTemplateService.createRelationshipTemplate(relationshipTemplate).subscribe(relationshipTemplateResponse => {
      this.currentTopologyTemplate.relationshipTemplates.push(relationshipTemplateResponse);

      for (let i = 0; i < this.currentTopologyTemplate.nodeTemplates.length; i++) {
        if (this.currentTopologyTemplate.nodeTemplates[i].id === (relationshipTemplateResponse.targetNodeId)) {
          this.currentTopologyTemplate.nodeTemplates[i].inRelationshipTemplates.push(relationshipTemplateResponse);
        } else if (this.currentTopologyTemplate.nodeTemplates[i].id === (relationshipTemplateResponse.sourceNodeId)) {
          this.currentTopologyTemplate.nodeTemplates[i].outRelationshipTemplates.push(relationshipTemplateResponse);
        }
      }

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
  // @section - Delete Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - deleteNodeTemplate - Call the NodeTemplateService for delete a NodeTemplate from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the NodeTemplate witch should be deleted from the database
   *
   ****************************************************************************************************************************************/
  deleteNodeTemplate(nodeTemplate: NodeTemplate) {
    Logger.info('Delete NodeTemplate', TopologyModellerComponent.name);
    this.nodeTemplateService.deleteNodeTemplate(nodeTemplate.id).subscribe(nodeTemplateResponse => {

      for (let realtionshipTemplate of nodeTemplate.inRelationshipTemplates) {
        this.deleteRelationshipTemplate(realtionshipTemplate);
      }

      for (let realtionshipTemplate of nodeTemplate.outRelationshipTemplates) {
        this.deleteRelationshipTemplate(realtionshipTemplate);
      }

      this.topologyTemplateService.getTopologyTemplate(this.currentTopologyTemplate.id).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
      Logger.info('Node Template with id: ' + nodeTemplate.id + ' was deleted sucessfully.', TopologyModellerComponent.name);
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
   * @method - deleteRelationshipTemplate - Call the RelationshipTemplateService for delete a NodeTemplate from the database and subscribe for
   *                                      a callback.
   *
   * @param - id: number - ID of the RelationshipTemplate witch should be deleted from the database
   *
   ****************************************************************************************************************************************/
  deleteRelationshipTemplate(relationshipTemplate: RelationshipTemplate) {
    Logger.info('Delete RelationshipTemplate', TopologyModellerComponent.name);
    this.relationshipTemplateService.deleteRelationshipTemplate(relationshipTemplate.id)
      .subscribe(relationshipTemplateResponse => {
        this.topologyTemplateService.getTopologyTemplate(this.currentTopologyTemplate.id).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
        Logger.info('Relationship Template with  id: ' + relationshipTemplateResponse.id + ' was deleted sucessfully.', TopologyModellerComponent.name);
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
  // @section - Drag and Drop Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - onDragNodeType - Is called to start drag and drop of NodeTypes from tool box to the draw area
   *
   * @param - event: Event - Event Object of the onDrag Event
   * @param - dragData: any - NodeType data which will be dragged from the tool box to the draw area to create a NodeTemplate of this type
   *
   ****************************************************************************************************************************************/
  onDragNodeType(event, dragData: any) {

    if (!this.dragNodeType) {
      this.currentDragData = dragData;
      this.dragNodeType = true;
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method - onDragLevelGraphNode - Is called to start drag and drop of level graph nodes from tool box to the draw area
   *
   * @param - event: Event - Event Object of the onDrag Event
   * @param - dragData: any - LevelGraphNode data which will be dragged from the tool box to the draw area to create a NodeTemplate of this
   *                          type
   *
   ****************************************************************************************************************************************/
  onDragLevelGraphNode(event, dragData: any) {

    if (!this.dragLevelGraphNode) {
      this.currentDragData = dragData;
      this.dragLevelGraphNode = true;
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method - onDragOver is called to allow a drag over between different div containers
   *
   * @param - event: Event - Event Object of the onDragOver Event
   *
   ****************************************************************************************************************************************/
  onDragOver(event) {
    event.preventDefault();
  }

  /*****************************************************************************************************************************************
   *
   * @method - onDrop is called to create a NodeTemplate in the drawArea
   *
   * @param - event: Event - Event Object of the onDrop Event
   *
   ****************************************************************************************************************************************/
  onDrop(event) {

    if (this.dragNodeType || this.dragLevelGraphNode) {
      let tempNodeTemplate = new NodeTemplate();
      tempNodeTemplate.x = event.offsetX - Constants.NODEWIDTH / 2;
      tempNodeTemplate.y = event.offsetY - Constants.NODEHEIGHT / 2;
      tempNodeTemplate.width = Constants.NODEWIDTH;
      tempNodeTemplate.height = Constants.NODEHEIGHT;

      if (this.dragNodeType) {

        tempNodeTemplate.name = this.currentDragData.name;
        tempNodeTemplate.nodeTypeId = this.currentDragData.id;
        tempNodeTemplate.topologyTemplateId = this.currentTopologyTemplate.id;
        tempNodeTemplate.nodeType = this.currentDragData;
        tempNodeTemplate.icon = this.currentDragData.icon;
        tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
        this.createNodeTemplate(tempNodeTemplate);

      }

      if (this.dragLevelGraphNode) {
        this.nodeTypeService.getNodeType(this.currentDragData.levelGraphNodeTypeId).subscribe(nodeTypeResponse => {
          tempNodeTemplate.name = this.currentDragData.name;
          tempNodeTemplate.nodeTypeId = this.currentDragData.levelGraphNodeTypeId;
          tempNodeTemplate.topologyTemplateId = this.currentTopologyTemplate.id;
          tempNodeTemplate.nodeType = nodeTypeResponse;
          tempNodeTemplate.levelGraphNode = this.currentDragData;
          tempNodeTemplate.levelGraphNodeId = this.currentDragData.id;
          tempNodeTemplate.icon = nodeTypeResponse.icon;
          tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
          this.createNodeTemplate(tempNodeTemplate);

        });

      }

      this.dragNodeType = false;
      this.dragLevelGraphNode = false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Move Node Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - startMoveNode - Start moving a node in drawArea
   *
   * @param - event: MouseEvent - Event Object of the onMouseDown Event
   *
   ****************************************************************************************************************************************/
  startMoveNode(event: MouseEvent) {
    if (!this.moveNode && !this.drawRelation && !this.drawCurrentLevelGraphCompliantRelation) {
      this.moveNode = true;
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method - onMoveNode - Move a node and his in and outgoing edges in the drawArea
   *
   * @param - event: MouseEvent - Event Object of the onMouseMove Event
   *
   ****************************************************************************************************************************************/
  onMoveNode(event: MouseEvent, nodeTemplate: NodeTemplate) {
    if (this.moveNode) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      // TODO Check again right and bottom border
      if ((nodeTemplate.x + deltaX) > 0) {
        nodeTemplate.x = (nodeTemplate.x + deltaX);
      }

      if ((nodeTemplate.y + deltaY) > 0) {
        nodeTemplate.y = (nodeTemplate.y + deltaY);
      }

      // TODO Check again right and bottom border
      for (let relationshipTemplate of this.currentTopologyTemplate.relationshipTemplates) {
        if (nodeTemplate.id === relationshipTemplate.targetNodeId) {
          if ((relationshipTemplate.path.points[1].x + deltaX) > (0 + nodeTemplate.width / 2)) {
            relationshipTemplate.path.points[1].x = relationshipTemplate.path.points[1].x + deltaX;
          }
          if ((relationshipTemplate.path.points[1].y + deltaY) > (0 + nodeTemplate.height / 2)) {
            relationshipTemplate.path.points[1].y = relationshipTemplate.path.points[1].y + deltaY;
          }
        }
        if (nodeTemplate.id === relationshipTemplate.sourceNodeId) {
          if ((relationshipTemplate.path.points[0].x + deltaX) > (0 + nodeTemplate.width / 2)) {
            relationshipTemplate.path.points[0].x = relationshipTemplate.path.points[0].x + deltaX;
          }
          if ((relationshipTemplate.path.points[0].y + deltaY) > (0 + nodeTemplate.height / 2)) {
            relationshipTemplate.path.points[0].y = relationshipTemplate.path.points[0].y + deltaY;
          }
        }

        let tempPath = new Path(relationshipTemplate.path.points);
        relationshipTemplate.path = tempPath;
      }

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method - stopMoveNode - Stop the moving event of the NodeTemplate and create a new NodeTemplate in the TopologyTemplate
   *
   * @param - event: MouseEvent - Event Object of the onMouseUp Event
   *
   ****************************************************************************************************************************************/
  stopMoveNode(event) {
    if (this.moveNode) {
      this.moveNode = false;
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      //      this.updateTopologyTemplate();
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Refinement Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - startRefinement - Call the RefinementSerive for refine the currentTopologyTemplate and subscribe for a callback.
   *
   *
   ****************************************************************************************************************************************/
  startRefinement(smi: number, steps: number) {

    let levelGraph: LevelGraph = this.mergeLevelGraphs();

    let maxLevel = 0;
    for (let level of levelGraph.levels) {
      if (level.depth > maxLevel) {
        alert(level.depth);
        maxLevel = level.depth;
      }
    }

    if (maxLevel <= this.currentTopologyTemplate.abstractionLevel) {
      this.flashMessage.message = 'Topology Template can`t be refined with this Level Graphs, because the level of abstraction of the Topology Template is higher or equal to the abstraction levels of the selected Level Graphs';
      this.flashMessage.isSuccess = false;
      this.flashMessage.isError = true;
      this.flashMessageService.display(this.flashMessage);
    } else {

      this.flashMessage.message = 'Refinement Startet in Background';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
      let startTime = Date.now();

      if (steps === 1) {
        this.refinementService.refineOneStepTopologyTemplate(this.currentTopologyTemplate.id, levelGraph, smi).subscribe(topologyTemplateResponse => {
          this.currentTopologyTemplate = topologyTemplateResponse;
          let endTime = Date.now();
          this.flashMessage.message = 'Refinement Finished successfuly in' + (startTime - endTime);
          this.flashMessage.isSuccess = true;
          this.flashMessageService.display(this.flashMessage);
        },
          (error) => {
            this.flashMessage.message = error;
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
          });
      } else {
        this.refinementService.refineTopologyTemplate(this.currentTopologyTemplate.id, levelGraph, smi).subscribe(topologyTemplateResponse => {
          this.currentTopologyTemplate = topologyTemplateResponse;
          let endTime = Date.now();
          this.flashMessage.message = 'Refinement Finished successfuly in' + (startTime - endTime);
          this.flashMessage.isSuccess = true;
          this.flashMessageService.display(this.flashMessage);
        },
          (error) => {
            this.flashMessage.message = error;
            this.flashMessage.isSuccess = false;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
          });
      }

    }
  }

  /*************************************************************************************************************************************
   *
   * @method - mergeLevelGraph - Merge all data of the selected Level Graphs into one Level Graph which will be used for the refinement
   *
   **************************************************************************************************************************************/
  mergeLevelGraphs() {

    let levelGraph: LevelGraph = new LevelGraph();
    for (let levelGraphTemp of this.levelGraphs) {
      if (levelGraphTemp.checked) {
        levelGraph.levels = levelGraph.levels.concat(levelGraphTemp.levels);
        levelGraph.levelGraphNodes = levelGraph.levelGraphNodes.concat(levelGraphTemp.levelGraphNodes);
        levelGraph.levelGraphRelations = levelGraph.levelGraphRelations.concat(levelGraphTemp.levelGraphRelations);
      }
    }

    return levelGraph;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Draw Relation Event Handling
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method - startDrawRelation - Start the draw relation event if one of the draw relation tool is selected
   *
   * @param - event: MouseEvent - Event Object of the onMouseDown Event
   * @param - relationshipType: RelationshipType - RelationshiptType of the RelationshiptTemplate which should be created
   * @param - sourceNode: NodeTemplate - sourceNode of the RelationshipTemplate
   *
   ****************************************************************************************************************************************/
  startDrawRelation(event: MouseEvent, relationshipType: RelationshipType, sourceNode: NodeTemplate) {

    if (!this.drawRelation) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let startPoint: Point;
      let endPoint: Point;
      startPoint = new Point(sourceNode.x + sourceNode.width / 2, sourceNode.y + sourceNode.height / 2);
      endPoint = new Point(sourceNode.x + sourceNode.width / 2 - 5, sourceNode.y + sourceNode.height / 2 - 5);

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentRelationshipTemplate = new RelationshipTemplate(sourceNode.id, sourceNode.id, tempPath, relationshipType.id, this.currentTopologyTemplate.id);
      this.currentRelationshipTemplate.name = relationshipType.name;
      this.currentRelationshipTemplate.relationshipType = relationshipType;
      this.currentRelationshipTemplate.sourceNodeTemplate = sourceNode;
      this.drawCurrentLevelGraphCompliantRelation = true;
      this.drawRelation = true;
    }
  }

  startDrawCurrentLevelGraphRelation(event: MouseEvent, levelGraphNode: LevelGraphNode, sourceNode: NodeTemplate) {
    if (!this.drawCurrentLevelGraphRelation) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let startPoint: Point;
      let endPoint: Point;
      startPoint = new Point(sourceNode.x + sourceNode.width / 2, sourceNode.y + sourceNode.height / 2);
      endPoint = new Point(sourceNode.x + sourceNode.width / 2 - 5, sourceNode.y + sourceNode.height / 2 - 5);

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentRelationshipTemplate = new RelationshipTemplate(sourceNode.id, sourceNode.id, tempPath, levelGraphNode.levelGraphNodeTypeId, this.currentTopologyTemplate.id);
      this.currentRelationshipTemplate.name = levelGraphNode.name;
      this.currentRelationshipTemplate.levelGraphNode = levelGraphNode;
      this.currentRelationshipTemplate.levelGraphNodeId = levelGraphNode.id;
      this.currentRelationshipTemplate.sourceNodeTemplate = sourceNode;
      this.drawCurrentLevelGraphRelation = true;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method startDrawRelation - Start the draw relation event if one of the draw relation tool is selected
   *
   * @param event: MouseEvent - Event Object of the onMouseDown Event
   * @param levelGraphNode: LevelGraphNode - LevelGraphNode of the RelationshiptTemplate which should be created
   * @param sourceNode: NodeTemplate - sourceNode of the RelationshipTemplate
   *
   ****************************************************************************************************************************************/
  startDrawCurrentLevelGraphCompliantRelation(event: MouseEvent, levelGraphNode: LevelGraphNode, sourceNode: NodeTemplate) {
    if (!this.drawCurrentLevelGraphCompliantRelation) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let startPoint: Point;
      let endPoint: Point;
      startPoint = new Point(sourceNode.x + sourceNode.width / 2, sourceNode.y + sourceNode.height / 2);
      endPoint = new Point(sourceNode.x + sourceNode.width / 2 - 5, sourceNode.y + sourceNode.height / 2 - 5);

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentRelationshipTemplate = new RelationshipTemplate(sourceNode.id, sourceNode.id, tempPath, levelGraphNode.levelGraphNodeTypeId, this.currentTopologyTemplate.id);
      this.currentRelationshipTemplate.name = levelGraphNode.name;
      this.currentRelationshipTemplate.levelGraphNode = levelGraphNode;
      this.currentRelationshipTemplate.levelGraphNodeId = levelGraphNode.id;
      this.currentRelationshipTemplate.sourceNodeTemplate = sourceNode;
      this.drawCurrentLevelGraphCompliantRelation = true;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method - onDrawRelation - Update the end point position of the path of a relation
   *
   * @param - event: MouseEvent - Event Object of the onMouseMove Event
   *
   ****************************************************************************************************************************************/
  onDrawLevelGraphRelation(event: MouseEvent) {

    if (this.drawRelation || this.drawCurrentLevelGraphCompliantRelation || this.drawCurrentLevelGraphRelation) {
      this.currentRelationshipTemplate.path.points[1].x = event.offsetX;
      this.currentRelationshipTemplate.path.points[1].y = event.offsetY;
      this.currentRelationshipTemplate.path.updatePath();
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method - stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   * @param - targetNode: NodeTemplate - Target Node of the relation which should be draw
   *
   ****************************************************************************************************************************************/
  stopDrawLevelGraphRelation(targetNode: NodeTemplate) {
    if (this.drawRelation || this.drawCurrentLevelGraphRelation || (this.drawCurrentLevelGraphCompliantRelation && this.isRelationLevelGraphCompliant(targetNode))) {

      this.currentRelationshipTemplate.targetNodeId = targetNode.id;
      this.currentRelationshipTemplate.path.points[1].x = targetNode.x + targetNode.width / 2;
      this.currentRelationshipTemplate.path.points[1].y = targetNode.y + targetNode.height / 2;
      this.currentRelationshipTemplate.path.updatePath();
      this.currentRelationshipTemplate.targetNodeTemplate = targetNode;

      this.currentRelationshipTemplate.topologyTemplate = this.currentTopologyTemplate;
      this.currentRelationshipTemplate.topologyTemplateId = this.currentTopologyTemplate.id;

      if (!this.currentRelationshipTemplate.isSourceNodeEqualTargetNode()) {
        this.createRelationshipTemplate(this.currentRelationshipTemplate);
      } else {
        this.flashMessage.message = 'Self-Loops are not allowed in a Topology Template';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      }
    }
    this.drawRelation = false;
    this.drawCurrentLevelGraphCompliantRelation = false;
    this.drawCurrentLevelGraphRelation = false;

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Check Methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   * @param targetNode: LevelGraphNode - Target Node of the relation which should be draw
   * @param targetLevel: Level - Target Level is the level of the target node
   *
   ****************************************************************************************************************************************/
  isRelationLevelGraphCompliant(targetNode: NodeTemplate) {
    for (let levelGraphRelation of this.currentRelationshipTemplate.levelGraphNode.outLevelGraphRelations) {
      for (let levelGraphNode of this.selectedLevelGraph.levelGraphNodes) {
        if (levelGraphNode.id === levelGraphRelation.targetNodeId && levelGraphNode.levelGraphNodeTypeId === targetNode.nodeTypeId) {
          return true;
        }
      }
    }
    this.flashMessage.message = 'NodeType of NodeTemplate is not compliant to the RelationshipType of the current draw RelationTemplate';
    this.flashMessage.isSuccess = false;
    this.flashMessage.isError = true;
    this.flashMessageService.display(this.flashMessage);

    return false;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // @section - Small Helper Methods like change, select, view, add methods
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****************************************************************************************************************************************
   *
   * @method onSelectedLevelGraph - Set the data of the currently selected LevelGraph and the availabel LevelGraphNodes in 
   *
   * @param levelGraph: LevelGraph - LevelGraph which should be set
   *
   ****************************************************************************************************************************************/
  onSelectLevelGraph(levelGraph: LevelGraph) {
    this.selectedLevelGraph = levelGraph;
    this.selectedLevelGraphNodeNodeType = [];
    this.selectedLevelGraphNodeNodeTypeCurrentAbstractionLevel = [];
    this.selectedLevelGraphNodeRelationType = [];
    this.selectedLevelGraphNodeRelationTypeCurrentAbstractionLevel = [];

    for (let levelGraphNode of this.selectedLevelGraph.levelGraphNodes) {

      if (levelGraphNode.levelGraphNodeType === LevelGraphNodeType.NODETYPE) {
        if (levelGraphNode.levelDepth === this.currentTopologyTemplate.abstractionLevel) {
          this.selectedLevelGraphNodeNodeTypeCurrentAbstractionLevel.push(levelGraphNode);
        }
        this.selectedLevelGraphNodeNodeType.push(levelGraphNode);
      } else if (levelGraphNode.levelGraphNodeType === LevelGraphNodeType.RELATIONSHIPTYPE) {
        if (levelGraphNode.levelDepth === this.currentTopologyTemplate.abstractionLevel) {
          this.selectedLevelGraphNodeRelationTypeCurrentAbstractionLevel.push(levelGraphNode);
        }
        this.selectedLevelGraphNodeRelationType.push(levelGraphNode);
      }
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method onSelectRepository - Set the data of the currently selected Repository
   *
   * @param repository: Repository - Repository which should be set
   *
   ****************************************************************************************************************************************/
  onSelectRepository(repository: Repository) {
    this.selectedRepository = repository;
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
  setCurrentLevelGraphCompliantRelationshipTypes(event, levelGraphNodeId: number) {

    if (event.which === 3) {
      this.currentLevelGraphCompliantRelationshipTypes = [];

      for (let levelGraphNode of this.selectedLevelGraphNodeRelationTypeCurrentAbstractionLevel) {
        for (let levelGraphRelation of levelGraphNode.inLevelGraphRelations) {
          if (levelGraphRelation.sourceNodeId === levelGraphNodeId) {
            this.currentLevelGraphCompliantRelationshipTypes.push(levelGraphNode);
          }
        }
      }

      //      for (let levelGraphNode of this.selectedLevelGraph.levelGraphNodes) {
      //        if (levelGraphNode.id === levelGraphNodeId) {
      //          for (let levelGraphRelation of levelGraphNode.outLevelGraphRelations) {
      //            if (levelGraphRelation.levelGraphRelationType === LEVELGRAPHRELATIONTYPE.CONNECTED_TO && levelGraphRelation.sourceNodeId === levelGraphNode.id) {
      //              for (let node of this.selectedLevelGraph.levelGraphNodes) {
      //                if (node.id === levelGraphRelation.targetNodeId && node.levelGraphNodeType === LEVELGRAPHNODETYPES.RELATIONSHIPTYPE) {
      //
      //                  this.currentLevelGraphCompliantRelationshipTypes.push(node);
      //                }
      //              }
      //            }
      //          }
      //        }
      //      }
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
  setRootTopology() {

    if (this.currentTopologyTemplate.abstractionLevel === 0) {
      this.rootTopologyTemplate = this.currentTopologyTemplate;
    } else {
      let tempTopologyTemplate = new TopologyTemplate();
      tempTopologyTemplate = this.currentTopologyTemplate;

      while (tempTopologyTemplate.abstractionLevel !== 0) {
        tempTopologyTemplate = this.currentTopologyTemplate.parentTopologyTemplate;
      }
      this.rootTopologyTemplate = tempTopologyTemplate;
    }

    this.setMaxAbstractionLevel();

  }

  setMaxAbstractionLevel() {

    if (this.rootTopologyTemplate.childTopologyTemplates.length < 1) {
      this.maxAbstractionLevel = 0;
    } else {
      this.maxAbstractionLevel = this.calcMaxAbstractionLevel(this.rootTopologyTemplate);
    }
  }

  calcMaxAbstractionLevel(topologyTemplate: TopologyTemplate) {
    let tempMaxAbstractionLevel = 0;
    if (topologyTemplate.childTopologyTemplates.length < 1) {
      return topologyTemplate.abstractionLevel;
    }
    for (let childTopologyTemplate of topologyTemplate.childTopologyTemplates) {
      let tempAbstractionLevel = this.calcMaxAbstractionLevel(childTopologyTemplate);
      if (tempMaxAbstractionLevel < tempAbstractionLevel) {
        tempMaxAbstractionLevel = tempAbstractionLevel;
      }
    }
    return tempMaxAbstractionLevel;
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
  stopAllEvents() {
    this.dragNodeType = false;
    this.dragLevelGraphNode = false;
    this.moveNode = false;
    this.drawRelation = false;
    this.drawCurrentLevelGraphCompliantRelation = false;
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
  //  updateTopologyTemplate() {
  //    this.topologyTemplateService.updateTopologyTemplate(this.currentTopologyTemplate)
  //      .subscribe(topologyTemplateResponse =>
  //        this.currentTopologyTemplate = topologyTemplateResponse);
  //  }

  /*****************************************************************************************************************************************
   *
   * @method stopDrawRelation - Stop the draw relation event and draw a relation if it is allowed to draw it
   *
   * @param event: MouseEvent - Event Object of the onMouseUp Event
   * @param targetNode: LevelGraphNode - Target Node of the relation which should be draw
   * @param targetLevel: Level - Target Level is the level of the target node
   *
   ****************************************************************************************************************************************/
  // TODO All Topology of the abstraction level
  onChangeAbstractionLevel() {
    let temp = this.currentTopologyTemplate.abstractionLevel;
    while (this.currentAbstractionLevel !== this.currentTopologyTemplate.abstractionLevel) {
      if (this.currentAbstractionLevel > this.currentTopologyTemplate.abstractionLevel) {
        if (this.currentTopologyTemplate.childTopologyTemplates.length < 1) {
          this.flashMessage.message = 'There are no Topology Templates in this abstraction level for the current selected Topology Template. Select a other Topology Template in previous abstraction level Topology';
          this.flashMessage.isSuccess = false;
          this.flashMessage.isError = true;
          this.flashMessageService.display(this.flashMessage);
          this.currentAbstractionLevel = temp;
        } else {
          this.currentTopologyTemplate = this.currentTopologyTemplate.childTopologyTemplates[0];
        }
      } else {
        this.currentTopologyTemplate = this.currentTopologyTemplate.parentTopologyTemplate;
      }
    }

    this.currentTopologyTemplates = this.currentTopologyTemplate.parentTopologyTemplate.childTopologyTemplates;
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
  prevTopology() {
    this.currentTopologyTemplate = this.currentTopologyTemplates[this.currentTopologyTemplates.indexOf(this.currentTopologyTemplate) - 1];
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
  nextTopology() {
    this.currentTopologyTemplate = this.currentTopologyTemplates[this.currentTopologyTemplates.indexOf(this.currentTopologyTemplate) + 1];
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
  setEntity(entity: any) {
    this.entity = entity;
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
  addExpectedProperty() {
    this.createExpectedProperty.entityExpected = this.entity;
    this.createExpectedProperty.entityExpectedId = this.entity.id;
    this.expectedPropertyService.createExpectedProperty(this.createExpectedProperty).subscribe(expectedPropertyResponse => this.entity.expectedProperties.push(expectedPropertyResponse));
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
  addProvidedProperty() {
    this.createProvidedProperty.entityProvided = this.entity;
    this.createProvidedProperty.entityProvidedId = this.entity.id;
    this.providedPropertyService.createProvidedProperty(this.createProvidedProperty).subscribe(providedPropertyResponse => this.entity.providedProperties.push(providedPropertyResponse));
  }

  setUsedLevelGraphs() {

    for (let levelGraph of this.levelGraphs) {
      levelGraph.checked = false;
    }

    for (let levelGraph of this.levelGraphs) {
      for (let levelGraphNode of levelGraph.levelGraphNodes) {
        for (let relationshipTemplate of this.currentTopologyTemplate.relationshipTemplates) {
          if (levelGraphNode.id === relationshipTemplate.levelGraphNodeId) {
            levelGraph.checked = true;
          }
        }

        for (let nodeTemplate of this.currentTopologyTemplate.nodeTemplates) {
          if (levelGraphNode.id === nodeTemplate.levelGraphNodeId) {
            levelGraph.checked = true;
          }
        }
      }
    }
  }

  onCheckLevelGraph(levelGraph) {
    if (levelGraph.checked) {
      levelGraph.checked = false;
    } else {
      levelGraph.checked = true;
    }
  }


}
