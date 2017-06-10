import { Logger } from '../../../../logger/logger';
import { TOPOLOGYTEMPLATECONSTANTS } from '../../../shared/constants/topologytemplateconstants';
import { LEVELGRAPHNODETYPES } from '../../../shared/constants/levelgraphnodetype';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { NodeTemplate } from '../../../shared/datamodels/topology/nodetemplate';
import { RelationshipTemplate } from '../../../shared/datamodels/topology/relationshiptemplate';
import { TopologyTemplate } from '../../../shared/datamodels/topology/topologytemplate';
import { LevelService } from '../../../shared/dataservices/levelgraph/level.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph/levelgraph.service';
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
 * @component TopologyModellerComponent Class - The component display, model or refine a TopologyTemplate. It implements different retrieve,
 *                                              update, create and delete methods for different data types like NodeTemplates, RelationsshipTemplates,
 *                                              TopologyTemplates, etc. Also it implements all Events which are used for model a TopologyTemplate like
 *                                              move a node and draw a relation.
 *
 * @author Arthur Kaul
 *
 *****************************************************************************************************************************************************/
export class TopologyModellerComponent implements OnInit {

  // Root TopologyTemplate which have to be modeled by the user
  rootTopologyTemplate = new TopologyTemplate('');

  // Current displayed TopologyTemplate in the ModellerComponent
  currentTopologyTemplate = new TopologyTemplate('');

  // Current selected levelGraph in the tool box
  selectedLevelGraph: LevelGraph = new LevelGraph();

  // NodeTemplate which should be moved with the move tool
  currentMoveNode: NodeTemplate;

  // Maximal number of different abstractions of the root TopologyTemplate
  maxAbstractionLevel = 2;

  // last known position of the mouse needed to calculate the delta of a mouse move event
  lastMousePositionY = 0;
  lastMousePositionX = 0;

  // container for storing the data which are moved from the tool box to the draw area
  currentDragData: any;

  // flags to differentiate events like moving, drawing and drag&drop and to indicate which event is currently active or not
  drag = false;
  moveNode = false;
  drawRelation = false;

  // list of all available LevelGraphs in the database
  levelGraphList: LevelGraph[] = [];

  // for display errors and warnings you can also use it for display success messages but this may a cause a "Overflashing" for the user experience
  public flashMessage = new FlashMessage();

  constructor(private levelService: LevelService, private flashMessageService: FlashMessageService, private route: ActivatedRoute, private router: Router, private topologyTemplateService: TopologyTemplateService, private nodeTypeService: NodeTypeService, private relationshipTypeService: RelationshipTypeService, private levelGraphService: LevelGraphService, private nodeTemplateService: NodeTemplateService, private relationshipTemplateService: RelationshipTemplateService) { }

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
    //  this.retrieveRepository();
    this.retrieveLevelGraphs();

  }

  /*********************************************************************************************************************************************
   *
   * @method retrieveTopologyTemplate - Call the TopologyTemplateService for loading a TopologyTemplate from database into the application and subscribe
   *                                     for a callback.
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

  /*********************************************************************************************************************************************
   *
   *  @method retrieveLevelGraphs - Call the LevelGraphService for loading all LevelGraphs from database into the application and subscribe
   *                                for a callback. Currently no pagination/streaming of data is supported
   *
   ********************************************************************************************************************************************/
  retrieveLevelGraphs() {
    Logger.info('Retrieve LevelGraphs Data', TopologyModellerComponent.name);
    this.levelGraphService.getLevelGraphs().subscribe(levelGraphsResponse => {
      this.levelGraphList = levelGraphsResponse;
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
        // this.topologyTemplateService.updateTopologyTemplate(this.currentTopologyTemplate).subscribe();
        // this.topologyTemplateService.getTopologyTemplate(this.currentTopologyTemplate.getId()).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
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
   * onSelectedLevelGraph - Set the data of the currently selected levelgraph
   * @param id - Id of the selected level graph
   *
   ****************************************************************************************************/
  onSelectLevelGraph(id: number) {
    this.levelGraphService.getLevelGraph(id)
      .subscribe(levelGraphResponse => {
        this.selectedLevelGraph = levelGraphResponse;
        Logger.info('Level Graphs with id: ' + levelGraphResponse.getId() + ' retrieved sucessfully.', TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************************************
   *
   * @method onDrag is called to start drag and drop of nodeTypes from toolbox to the draw area
   *
   ****************************************************************************************************************************************/
  onDrag(event, dragData: any) {
    this.currentDragData = dragData;
    this.drag = true;
  }

  /*****************************************************************************************************************************************
   *
   * @method onDragLevelGraphNode is called to start drag and drop of levelGraphNodes from tool box to the draw area
   *
   ****************************************************************************************************************************************/
  onDragLevelGraphNode(event, nodeTypeId: number) {

    if (this.drag === false) {
      this.nodeTypeService.getNodeType(nodeTypeId).subscribe(nodeTypeResponse => this.currentDragData = nodeTypeResponse);
      this.drag = true;
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
    if (this.drag === true) {
      let tempNodeTemplate = new NodeTemplate(this.currentDragData.name, event.offsetX - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH / 2, event.offsetY - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT / 2, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT, this.currentDragData.id, this.currentTopologyTemplate.id);
      tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
      this.createNodeTemplate(tempNodeTemplate);
      this.drag = false;
    }
  }

  /*****************************************************************************************************************************************
   *
   * @method startMoveNode is called to move a node in the drawArea
   *
   ****************************************************************************************************************************************/
  startMoveNode(event: MouseEvent, nodeTemplate: NodeTemplate) {
    if (!this.moveNode) {
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

      if ((this.currentMoveNode.x + deltaX) > 0) {
        this.currentMoveNode.x = (this.currentMoveNode.x + deltaX);
      }

      if ((this.currentMoveNode.y + deltaY) > 0) {
        this.currentMoveNode.y = (this.currentMoveNode.y + deltaY);
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
      this.nodeTemplateService.updateNodeTemplate(this.currentMoveNode).subscribe();
    }
  }

  startDrawLevelGraphRelation() {
    // TODO
  }

  onDrawLevelGraphRelation() {
    // TODO
  }

  stopDrawLevelGraphRelation() {
    // TODO
  }

  setRootTopology(topologyTemplate) {
    //TODO 
  }

  createRelationshipTemplate() {
    // TODO
  }

  updateTopologyTemplate() {
    // TODO
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

  isNodeTypeEqual(nodeTypeId: number, nodeTemplate: NodeTemplate) {

  }

  isInCurrentLevel(levelId: number) {
    for (let level of this.selectedLevelGraph.getLevels()) {
      if (level.id === levelId) {
        if (level.depth === this.currentTopologyTemplate.abstractionLevel) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  stopAllEvents() {
    this.moveNode = false;
  }
}
