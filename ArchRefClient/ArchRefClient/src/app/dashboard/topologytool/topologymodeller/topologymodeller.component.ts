import { Logger } from '../../../../logger/logger';
import { TOPOLOGYTEMPLATECONSTANTS } from '../../../shared/constants/topologytemplateconstants';
import { LEVELGRAPHNODETYPES } from '../../../shared/constants/levelgraphnodetype';
import { LEVELGRAPHRELATIONTYPE } from '../../../shared/constants/levelgraphrelationtype';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { LevelGraphNode } from '../../../shared/datamodels/levelgraph/levelgraphnode';
import { Repository } from '../../../shared/datamodels/repository';
import { NodeTemplate } from '../../../shared/datamodels/topology/nodetemplate';
import { RelationshipTemplate } from '../../../shared/datamodels/topology/relationshiptemplate';
import { TopologyTemplate } from '../../../shared/datamodels/topology/topologytemplate';
import { NodeType } from '../../../shared/datamodels/types/nodetype';
import { RelationshipType } from '../../../shared/datamodels/types/relationshiptype';
import { Path } from '../../../shared/datamodels/utility/path';
import { Point } from '../../../shared/datamodels/utility/point';
import { LevelService } from '../../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph/levelgraph.service';
import { LevelGraphNodeService } from '../../../shared/dataservices/levelgraph/levelgraphnode.service';
import { RepositoryService } from '../../../shared/dataservices/repository.service';
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
 * @component TopologyModellerComponent Class - With this component you can display, model or refine a TopologyTemplate. It implements different retrieve,
 *                                              update, create and delete methods for different data types like NodeTemplates, RelationshipTemplates,
 *                                              TopologyTemplates, etc. Also it implements all Events which are used for model a TopologyTemplate like
 *                                              move a node and draw a relation. And it`s call the refinement algorithm on the server side and subscribe
 *                                              for a response.
 *
 * @author Arthur Kaul
 *
 *****************************************************************************************************************************************************/
export class TopologyModellerComponent implements OnInit {

  // Root TopologyTemplate which have to be modeled by the user
  rootTopologyTemplate = new TopologyTemplate('');

  // Current displayed TopologyTemplate in the ModellerComponent
  currentTopologyTemplate = new TopologyTemplate('');

  // NodeTemplate which should be moved with the move tool
  currentMoveNode: NodeTemplate;

  // RelationshipTemplate which should be draw and created on the draw area with the draw tool
  currentDrawRelation: RelationshipTemplate;

  // List of all available LevelGraphs in the database
  levelGraphs: LevelGraph[] = [];

  // Current selected levelGraph in the tool box
  selectedLevelGraph: LevelGraph = new LevelGraph();

  // List of all available repositories in the database
  repositories: Repository[] = [];

  // Current selected repository in the tool box
  selectedRepository: Repository = new Repository();

  // Maximal number of different abstraction levels default 2 because a Level Graph has at least two different levels
  maxAbstractionLevel = 2;

  // last known position of the mouse to calculate the delta of a mouse move event
  lastMousePositionY = 0;
  lastMousePositionX = 0;

  // container for storing the data which are moved from the tool box to the draw area
  currentDragData: any;

  // true if you drag a nodeType from the repository tool box to the draw area
  dragNodeType = false;

  // true if you drag a levelGraphNode from the level graph tool box to the draw area
  dragLevelGraphNode = false;

  // true if you move a node in the draw area
  moveNode = false;

  // true if you draw a relationTemplate with a relationType from a repository and not directly from a level graph
  drawRelation = false;

  // true if you draw a relationsTemplate with a relationType from a level graph node of a level graph
  drawCurrentLevelGraphCompliantRelation = false;

  // Collection of the relationshipTypes of a node template witch a compliant to a level graph node
  currentLevelGraphCompliantRelationshipTypes: LevelGraphNode[] = [];

  // for display errors and warnings you can also use it for display success messages but this may a cause a "Overflashing" for the user experience
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
    private relationshipTemplateService: RelationshipTemplateService) { }

  /*********************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   ********************************************************************************************************************************************/
  ngOnInit() {

    Logger.info('Initialize TopologyModellerComponent', TopologyModellerComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplate.name = params['name'] || 'Unnamed';
    });

    this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplate.id = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = 4000;
    this.retrieveTopologyTemplate(this.currentTopologyTemplate.id);
    this.retrieveRepository();
    this.retrieveLevelGraphs();
    this.selectedRepository.name = 'Select Repository';
    this.selectedLevelGraph.name = 'Select LevelGraph';

  }

  /*********************************************************************************************************************************************
   *
   * @method retrieveTopologyTemplate - Call the TopologyTemplateService for loading a TopologyTemplate from database into the application and subscribe
   *                                    for a callback.
   *
   * @param id: number - Number of TopologyTemplate which should be loaded from the database
   *
   ********************************************************************************************************************************************/
  retrieveTopologyTemplate(id: number) {
    Logger.info('Retrieve TopologyTemplate Data', TopologyModellerComponent.name);
    this.topologyTemplateService.getTopologyTemplate(id)
      .subscribe(topologyTemplateResponse => {
        this.currentTopologyTemplate = topologyTemplateResponse;
        this.setRootTopology(this.currentTopologyTemplate);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.id + ' and name: ' + topologyTemplateResponse.name + 'was retrieved sucessfully.', TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  retrieveRepository() {
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

  /*********************************************************************************************************************************************
   *
   *  @method retrieveLevelGraphs - Call the LevelGraphService for loading all LevelGraphs from database into the application and subscribe
   *                                for a callback. Currently no pagination/streaming of data is supported
   *
   ********************************************************************************************************************************************/
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

  /*********************************************************************************************************************************************
   *
   * @method createNodeTemplate - Call the NodeTemplateService for creating a new NodeTemplate in the database
   *                               and subscribe for a callback
   *
   * @param nodeTemplate: NodeTemplate - NodeTemplate which should be stored in the database
   *
   ********************************************************************************************************************************************/
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

  /*********************************************************************************************************************************************
   *
   * @method deleteNodeTemplate - Call the NodeTemplateService for delete a NodeTemplate from the database and subscribe for a callback.
   *
   * @param id: number - ID of the NodeTemplate witch should be deleted from the database
   *
   ********************************************************************************************************************************************/
  deleteNodeTemplate(id: number) {
    Logger.info('Delete NodeTemplate', TopologyModellerComponent.name);
    this.nodeTemplateService.deleteNodeTemplate(id).subscribe(nodeTemplateResponse => {
      this.topologyTemplateService.getTopologyTemplate(this.currentTopologyTemplate.id).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
      Logger.info('Node Template with id: ' + id + ' was deleted sucessfully.', TopologyModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*********************************************************************************************************************************************
   *
   * @method deleteRelationshipTemplate - Call the RelationshipTemplateService for delete a NodeTemplate from the database and subscribe for a callback.
   *
   * @param id: number - ID of the RelationshipTemplate witch should be deleted from the database
   *
   ********************************************************************************************************************************************/
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

  /****************************************************************************************************
   *
   * onSelectedLevelGraph - Set the data of the currently selected LevelGraph
   * @param levelGraph: LevelGraph - LevelGraph which should be set
   *
   ****************************************************************************************************/
  onSelectLevelGraph(levelGraph: LevelGraph) {
    this.selectedLevelGraph = levelGraph;
  }

  /****************************************************************************************************
   *
   * onSelectRepository - Set the data of the currently selected Repository
   * @param repository: Repository - Repository which should be set
   *
   ****************************************************************************************************/
  onSelectRepository(repository: Repository) {
    this.selectedRepository = repository;
  }

  /*****************************************************************************************************************************************
   *
   * @method onDrag is called to start drag and drop of nodeTypes from toolbox to the draw area
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
   * @method onDragLevelGraphNode is called to start drag and drop of levelGraphNodes from tool box to the draw area
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
   *  @method onDragOver is called to allow a drag over between different div containers
   *
   ****************************************************************************************************************************************/
  onDragOver(event) {
    event.preventDefault();
  }

  /*****************************************************************************************************************************************
   *
   *  @method onDrop is called to create a node in the drawArea
   *
   ****************************************************************************************************************************************/
  onDrop(event) {

    if (this.dragNodeType) {

      let tempNodeTemplate = new NodeTemplate(this.currentDragData.name, event.offsetX - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH / 2, event.offsetY - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT / 2, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT, this.currentDragData.id, this.currentTopologyTemplate.id);
      tempNodeTemplate.nodeType = this.currentDragData;
      tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
      this.createNodeTemplate(tempNodeTemplate);

      this.dragNodeType = false;
    }

    if (this.dragLevelGraphNode) {
      this.nodeTypeService.getNodeType(this.currentDragData.levelGraphNodeTypeId).subscribe(nodeTypeResponse => {
        let tempNodeTemplate = new NodeTemplate(this.currentDragData.name, event.offsetX - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH / 2, event.offsetY - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT / 2, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT, nodeTypeResponse.id, this.currentTopologyTemplate.id);
        tempNodeTemplate.levelGraphNode = this.currentDragData;
        tempNodeTemplate.levelGraphNodeId = this.currentDragData.id;
        tempNodeTemplate.nodeType = nodeTypeResponse;
        tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
        this.createNodeTemplate(tempNodeTemplate);
      });
      this.dragLevelGraphNode = false;
    }

  }

  /*****************************************************************************************************************************************
   *
   * @method startMoveNode is called to move a node in the drawArea
   *
   ****************************************************************************************************************************************/
  startMoveNode(event: MouseEvent, nodeTemplate: NodeTemplate) {
    if (!this.moveNode && !this.drawRelation && !this.drawCurrentLevelGraphCompliantRelation) {
      this.moveNode = true;
      this.currentMoveNode = nodeTemplate;
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method onMoveNode is called to move a node in the drawArea
   *
   ****************************************************************************************************************************************/
  onMoveNode(event: MouseEvent) {
    if (this.moveNode) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      // TODO Check again right and bottom border
      if ((this.currentMoveNode.x + deltaX) > 0) {
        this.currentMoveNode.x = (this.currentMoveNode.x + deltaX);
      }

      if ((this.currentMoveNode.y + deltaY) > 0) {
        this.currentMoveNode.y = (this.currentMoveNode.y + deltaY);
      }

      // TODO Check again right and bottom border
      for (let relationshipTemplate of this.currentTopologyTemplate.relationshipTemplates) {
        if (this.currentMoveNode.id === relationshipTemplate.targetNodeId) {
          if ((relationshipTemplate.path.points[1].x + deltaX) > (0 + this.currentMoveNode.width / 2)) {
            relationshipTemplate.path.points[1].x = relationshipTemplate.path.points[1].x + deltaX;
          }
          if ((relationshipTemplate.path.points[1].y + deltaY) > (0 + this.currentMoveNode.height / 2)) {
            relationshipTemplate.path.points[1].y = relationshipTemplate.path.points[1].y + deltaY;
          }
        }
        if (this.currentMoveNode.id === relationshipTemplate.sourceNodeId) {
          if ((relationshipTemplate.path.points[0].x + deltaX) > (0 + this.currentMoveNode.width / 2)) {
            relationshipTemplate.path.points[0].x = relationshipTemplate.path.points[0].x + deltaX;
          }
          if ((relationshipTemplate.path.points[0].y + deltaY) > (0 + this.currentMoveNode.height / 2)) {
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
   * @method stopMoveNode is called to move a node in the drawArea
   *
   ****************************************************************************************************************************************/
  stopMoveNode(event) {
    if (this.moveNode) {
      this.moveNode = false;
      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;
      this.updateTopologyTemplate();
    }
  }

  startRefinement() {

  }

  startOneStepRefinement() {

  }

  startDrawRelation(event: MouseEvent, relationshipType: RelationshipType, nodeTemplate: NodeTemplate) {

    if (!this.drawRelation) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let startPoint: Point;
      let endPoint: Point;
      startPoint = new Point(nodeTemplate.x + nodeTemplate.width / 2, nodeTemplate.y + nodeTemplate.height / 2);
      endPoint = new Point(nodeTemplate.x + nodeTemplate.width / 2 - 5, nodeTemplate.y + nodeTemplate.height / 2 - 5);

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentDrawRelation = new RelationshipTemplate(relationshipType.name, nodeTemplate.id, nodeTemplate.id, tempPath, relationshipType.id, this.currentTopologyTemplate.id);
      this.currentDrawRelation.relationshipType = relationshipType;
      this.currentDrawRelation.nodeTemplates.push(nodeTemplate);
      this.drawCurrentLevelGraphCompliantRelation = true;
      this.drawRelation = true;
    }
  }

  startDrawCurrentLevelGraphCompliantRelation(event: MouseEvent, levelGraphNode: LevelGraphNode, nodeTemplate: NodeTemplate) {
    if (!this.drawCurrentLevelGraphCompliantRelation) {

      this.lastMousePositionY = event.offsetY;
      this.lastMousePositionX = event.offsetX;

      let startPoint: Point;
      let endPoint: Point;
      startPoint = new Point(nodeTemplate.x + nodeTemplate.width / 2, nodeTemplate.y + nodeTemplate.height / 2);
      endPoint = new Point(nodeTemplate.x + nodeTemplate.width / 2 - 5, nodeTemplate.y + nodeTemplate.height / 2 - 5);

      let tempPoints: Point[] = [];
      tempPoints.push(startPoint);
      tempPoints.push(endPoint);

      let tempPath = new Path(tempPoints);
      this.currentDrawRelation = new RelationshipTemplate(levelGraphNode.name, nodeTemplate.id, nodeTemplate.id, tempPath, levelGraphNode.levelGraphNodeTypeId, this.currentTopologyTemplate.id);
      this.currentDrawRelation.levelGraphNode = levelGraphNode;
      this.currentDrawRelation.levelGraphNodeId = levelGraphNode.id;
      this.currentDrawRelation.nodeTemplates.push(nodeTemplate);
      this.drawCurrentLevelGraphCompliantRelation = true;
    }
  }

  onDrawLevelGraphRelation(event: MouseEvent) {

    if (this.drawRelation || this.drawCurrentLevelGraphCompliantRelation) {
      this.currentDrawRelation.path.points[1].x = event.offsetX;
      this.currentDrawRelation.path.points[1].y = event.offsetY;
      this.currentDrawRelation.path.updatePath();
    }

  }

  stopDrawLevelGraphRelation(targetNodeTemplate: NodeTemplate) {
    if (this.drawRelation || (this.drawCurrentLevelGraphCompliantRelation && this.isRelationLevelGraphCompliant(targetNodeTemplate))) {

      if (!this.currentDrawRelation.isSourceNodeEqualTargetNode()) {

        this.currentDrawRelation.path.points[1].x = targetNodeTemplate.x + targetNodeTemplate.width / 2;
        this.currentDrawRelation.path.points[1].y = targetNodeTemplate.y + targetNodeTemplate.height / 2;
        this.currentDrawRelation.path.updatePath();
        this.currentDrawRelation.nodeTemplates.push(targetNodeTemplate);
        this.currentDrawRelation.targetNodeId = targetNodeTemplate.id;
        this.createRelationshipTemplate(this.currentDrawRelation);
      } else {
        this.flashMessage.message = 'Self-Loops are not allowed in a Topology Template';
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      }

      this.drawRelation = false;
      this.drawCurrentLevelGraphCompliantRelation = false;
    }
  }

  isRelationLevelGraphCompliant(targetNode: NodeTemplate) {

  }

  isRelationExist() {

  }

  setRootTopology(topologyTemplate: TopologyTemplate) {

    if (topologyTemplate.abstractionLevel === 1) {
      this.rootTopologyTemplate = topologyTemplate;
    } else {
      // TODO
    }

  }

  createRelationshipTemplate(relationshipTemplate: RelationshipTemplate) {
    this.relationshipTemplateService.createRelationshipTemplate(relationshipTemplate).subscribe(relationshipTemplateResponse => {
      this.currentTopologyTemplate.relationshipTemplates.push(relationshipTemplateResponse);
      relationshipTemplate.nodeTemplates[0].relationshipTemplates.push(relationshipTemplateResponse);
      relationshipTemplate.nodeTemplates[1].relationshipTemplates.push(relationshipTemplateResponse);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isSuccess = false;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  isInCurrentLevel(levelId: number) {
    for (let level of this.selectedLevelGraph.levels) {
      if (level.id === levelId) {
        if (level.depth === this.currentTopologyTemplate.abstractionLevel) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  setCurrentLevelGraphCompliantRelationshipTypes(event, levelGraphNodeId: number) {

    if (event.which === 3) {
      Logger.info("ID: " + levelGraphNodeId, '');
      this.currentLevelGraphCompliantRelationshipTypes = [];
      this.levelGraphNodeService.getLevelGraphNode(levelGraphNodeId).subscribe(levelGraphNode => {
        for (let levelGraphRelation of levelGraphNode.levelGraphRelations) {
          if (levelGraphRelation.levelGraphRelationType === LEVELGRAPHRELATIONTYPE.CONNECTED_TO && levelGraphRelation.sourceNodeId === levelGraphNode.id) {
            Logger.info("ID: " + levelGraphRelation.targetNodeId, '');
            this.levelGraphNodeService.getLevelGraphNode(levelGraphRelation.targetNodeId).subscribe(targetNode => {
              Logger.info("FIND", '');
              this.currentLevelGraphCompliantRelationshipTypes.push(targetNode);
            }
            );
          }
        }
      });
    }

    // Alternative ohne services 

    //      for (let levelGraphNode of this.selectedLevelGraph.levelGraphNodes) {
    //        if (levelGraphNode.id === levelGraphNodeId) {
    //          for (let levelGraphRelation of levelGraphNode.levelGraphRelations) {
    //            if (levelGraphRelation.levelGraphRelationType === LEVELGRAPHRELATIONTYPE.CONNECTED_TO && levelGraphRelation.sourceNodeId === levelGraphNode.id) {
    //              for (let node of this.selectedLevelGraph.levelGraphNodes) {
    //                if (){
    //
    //                }// relationshipTypes.push(node.levelGraphNodeTypeObject);
    //              }
    //            }
    //          }
    //        }
    //      }

  }

  getLevelGraphmiantRelationshipTypes(nodeTypeId: number): RelationshipType[] {
    let relationshipTypes: RelationshipType[] = [];
    // TODO
    return relationshipTypes;
  }

  stopAllEvents() {
    this.dragNodeType = false;
    this.dragLevelGraphNode = false;
    this.moveNode = false;
    this.drawRelation = false;
    this.drawCurrentLevelGraphCompliantRelation = false;
  }

  updateTopologyTemplate() {
    this.topologyTemplateService.updateTopologyTemplate(this.currentTopologyTemplate)
      .subscribe(topologyTemplateResponse =>
        this.currentTopologyTemplate = topologyTemplateResponse);
  }

  onChangeAbstraktionLevel() {
    // TODO
  }

  prevTopology() {
    // TODO
  }

  nextTopology() {
    // TODO
  }

  addExpectedProperties() {

  }

  addProvidedProperties() {

  }

}
