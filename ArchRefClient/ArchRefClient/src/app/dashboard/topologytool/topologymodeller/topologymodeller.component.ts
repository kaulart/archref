import { Logger } from '../../../../logger/logger';
import { TOPOLOGYTEMPLATECONSTANTS } from '../../../shared/constants/topologytemplateconstants';
import { LEVELGRAPHNODETYPES } from '../../../shared/constants/levelgraphnodetype';
import { LevelGraph } from '../../../shared/datamodels/levelgraph/levelgraph';
import { NodeTemplate } from '../../../shared/datamodels/topology/nodetemplate';
import { RelationshipTemplate } from '../../../shared/datamodels/topology/relationshiptemplate';
import { TopologyTemplate } from '../../../shared/datamodels/topology/topologytemplate';
import { NodeType } from '../../../shared/datamodels/types/nodetype';
import { RelationshipType } from '../../../shared/datamodels/types/relationshiptype';
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
export class TopologyModellerComponent implements OnInit {

  LEVELGRAPHNODETYPES: LEVELGRAPHNODETYPES;

  rootTopologyTemplate = new TopologyTemplate('');
  currentTopologyTemplate = new TopologyTemplate('');
  currentTopologyTemplateId: number;
  currentTopologyTemplateName: string;

  selectedLevelGraph: LevelGraph = new LevelGraph();

  moveNode: NodeTemplate;

  abstractionLevel = 1;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  currentDragData: any;
  drag = false;
  mousedownOnNodeTemplate = false;

  nodeTypeList: NodeType[] = [];
  relationshipTypeList: RelationshipType[] = [];
  levelGraphList: LevelGraph[] = [];
  private sub: any;
  public flashMessage = new FlashMessage();

  constructor(private levelService: LevelService, private flashMessageService: FlashMessageService, private route: ActivatedRoute, private router: Router, private topologyTemplateService: TopologyTemplateService, private nodeTypeService: NodeTypeService, private relationshipTypeService: RelationshipTypeService, private levelGraphService: LevelGraphService, private nodeTemplateService: NodeTemplateService, private relationshipTemplateService: RelationshipTemplateService) { }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplateName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplateId = params['id'] || '';
    });

    this.flashMessage.timeoutInMS = 4000;
    this.retrieveTopologyTemplate(this.currentTopologyTemplateId);
    this.retrieveNodeTypes();
    this.retrieveRelationshipTypes();
    this.retrieveLevelGraphs();

  }

  retrieveTopologyTemplate(id: number) {
    this.topologyTemplateService.getTopologyTemplate(id)
      .subscribe(topologyTemplateResponse => {
        this.currentTopologyTemplate = topologyTemplateResponse;
        // TODO this.rootTopologyTemplate = topologyTemplateResponse;
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.id + ' and name: ' + topologyTemplateResponse.name + 'was retrieved sucessfully.', TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  retrieveNodeTypes() {
    this.nodeTypeService.getNodeTypes().subscribe(nodeTypeResponse => {
      this.nodeTypeList = nodeTypeResponse;
      Logger.info('Nodetypes were retrieved sucessfully', TopologyModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  retrieveRelationshipTypes() {
    this.relationshipTypeService.getRelationshipTypes().subscribe(relationshipTypeResponse => {
      this.relationshipTypeList = relationshipTypeResponse;
      Logger.info('RelationshipTypes were retrieved sucessfully', TopologyModellerComponent.name);
    },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  retrieveLevelGraphs() {
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

  /*****************************************************************************************************************************************
   *
   * onDrag is called to start drag and drop of nodeTypes from toolbox to the draw area
   *
   ****************************************************************************************************************************************/
  onDrag(event, dragData: any) {
    this.currentDragData = dragData;
    this.drag = true;
  }

  /*****************************************************************************************************************************************
   *
   * onDragLevelGraphNode is called to start drag and drop of levelGraphNodes from toolbox to the draw area
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
  onDrop(event) {
    if (this.drag === true) {
      let tempNodeTemplate = new NodeTemplate(this.currentDragData.name, this.currentDragData, event.offsetX - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH / 2, event.offsetY - TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT / 2, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT);
      tempNodeTemplate.topologyTemplate = this.currentTopologyTemplate;
      this.createNodeTemplate(tempNodeTemplate);
      this.drag = false;
    }
  }

  /*****************************************************************************************************************************************
   *
   * mouseDownOnNode is called to move a node in the drawArea
   *
   ****************************************************************************************************************************************/
  mouseDownOnNode(event: MouseEvent, nodeTemplate: NodeTemplate) {
    this.mousedownOnNodeTemplate = true;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
    this.moveNode = nodeTemplate;
  }

  onMoveNode(event: MouseEvent) {
    if (this.mousedownOnNodeTemplate === true) {
      let newMousePositionY = event.offsetY;
      let newMousePositionX = event.offsetX;
      let deltaY = (newMousePositionY - this.lastMousePositionY);
      let deltaX = (newMousePositionX - this.lastMousePositionX);

      if ((this.moveNode.x + deltaX) > 0) {
        this.moveNode.x = (this.moveNode.x + deltaX);
      }

      if ((this.moveNode.y + deltaY) > 0) {
        this.moveNode.y = (this.moveNode.y + deltaY);
      }

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }
  }

  mouseUpOnNode(event) {
    this.mousedownOnNodeTemplate = false;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
    this.nodeTemplateService.updateNodeTemplate(this.moveNode).subscribe();
  }

  mouseUpOnDrawArea() {
    this.mousedownOnNodeTemplate = false;
  }

  createNodeTemplate(nodeTemplate: NodeTemplate) {

    this.nodeTemplateService.createNodeTemplate(nodeTemplate)
      .subscribe(nodeTemplateResponse => {
        this.currentTopologyTemplate.nodeTemplates.push(nodeTemplateResponse);
        this.topologyTemplateService.updateTopologyTemplate(this.currentTopologyTemplate).subscribe();
        //     this.topologyTemplateService.getTopologyTemplate(this.currentTopologyTemplate.getId()).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
        this.flashMessage.message = 'Node Template was sucessfully created with id: ' + nodeTemplateResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Node Template was sucessfully created with id: ' + nodeTemplateResponse.id, TopologyModellerComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
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

  createRelationshipTemplate() {
    // TODO
  }

  updateTopologyTemplate() {
    // TODO
  }

  deleteNodeTemplate(nodeTemplate: NodeTemplate) {
    this.nodeTemplateService.deleteNodeTemplate(nodeTemplate.id).subscribe(nodeTemplateResponse => {
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

  deleteRelationshipTemplate(relationshipTemplate: RelationshipTemplate) {
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

  //  prevLevel() {
  //
  //    if (this.abstractionLevel > 1) {
  //      this.abstractionLevel--;
  //    }
  //
  //  }

  prevTopology() {

  }

  nextTopology() {

  }

  //  nextLevel() {
  //    if (this.abstractionLevel < this.selectedLevelGraph.numberOfLevels) {
  //      this.abstractionLevel++;
  //    }
  //  }

  isNodeTypeEqual(nodeTypeId: number, nodeTemplate: NodeTemplate) {


  }

  //  isInCurrentLevel(levelId: number) {
  //    for (let level of this.selectedLevelGraph.getLevels()) {
  //      if (level.id === levelId) {
  //        if (level.value === this.abstractionLevel) {
  //          return true;
  //        } else {
  //          return false;
  //        }
  //      }
  //    }
  //  }
}
