import { Logger } from '../../../../logger/logger';
import { TOPOLOGYTEMPLATECONSTANTS } from '../../../constants/topologytemplateconstants';
import { LevelGraph } from '../../../shared/datamodel/levelgraphmodel/levelgraph';
import { NodeTemplate } from '../../../shared/datamodel/topologymodel/nodetemplate';
import { NodeType } from '../../../shared/datamodel/topologymodel/nodetype';
import { RelationshipType } from '../../../shared/datamodel/topologymodel/relationshiptype';
import { TopologyTemplate } from '../../../shared/datamodel/topologymodel/topologytemplate';
import { LevelGraphService } from '../../../shared/dataservices/levelgraph.service';
import { NodeTemplateService } from '../../../shared/dataservices/nodetemplate.service';
import { NodeTypeService } from '../../../shared/dataservices/nodetype.service';
import { RelationshipTemplateService } from '../../../shared/dataservices/relationshiptemplate.service';
import { RelationshipTypeService } from '../../../shared/dataservices/relationshiptype.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopologyTemplateService } from '../../../shared/dataservices/topologytemplate.service';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-topologymodeller',
  templateUrl: './topologymodeller.component.html',
  styleUrls: ['./topologymodeller.component.css']
})
export class TopologyModellerComponent implements OnInit {

  currentTopologyTemplate = new TopologyTemplate('');
  currentTopologyTemplateId: number;
  currentTopologyTemplateName: string;

  selectedLevelGraph: LevelGraph = new LevelGraph('Select Level Graph', 0);

  moveNode: NodeTemplate;

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

  constructor(private flashMessageService: FlashMessageService, private route: ActivatedRoute, private router: Router, private topologyTemplateService: TopologyTemplateService, private nodeTypeService: NodeTypeService, private relationshipTypeService: RelationshipTypeService, private levelGraphService: LevelGraphService, private nodeTemplateService: NodeTemplateService, private relationshipTemplateService: RelationshipTemplateService) { }

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
        this.flashMessage.message = 'Topology Template with id: ' + topologyTemplateResponse.getId() + ' and name: ' + topologyTemplateResponse.getName() + 'was retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.getId() + ' and name: ' + topologyTemplateResponse.getName() + 'was retrieved sucessfully.', TopologyModellerComponent.name);
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
      this.flashMessage.message = 'NodeType were retrieved sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
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
      this.flashMessage.message = 'RelationshipTypes were retrieved sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
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
      this.flashMessage.message = 'LevelGraphs were retrieved sucessfully.';
      this.flashMessage.isSuccess = true;
      this.flashMessageService.display(this.flashMessage);
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
      let tempNodeTemplate = new NodeTemplate(this.currentDragData.name, this.currentDragData, event.offsetX, event.offsetY, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEWIDTH, TOPOLOGYTEMPLATECONSTANTS.TOPOLOGYTEMPLATENODEHEIGHT);
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

      //    for (let relationTemplate of this.moveNode.outRelationTemplates) {
      //      for (let relationOutGraph of this.currentLevelGraph.levelGraphRelations) {
      //        if (relationOutNode.id === relationOutGraph.id) {
      //          if ((relationOutGraph.path.points[0].x + deltaX) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2) {
      //            relationOutGraph.path.points[0].x = relationOutGraph.path.points[0].x + deltaX;
      //          }
      //          if ((relationOutGraph.path.points[0].y + deltaY) > 0 + LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2) {
      //            relationOutGraph.path.points[0].y = relationOutGraph.path.points[0].y + deltaY;
      //          }
      //          let tempPath = new Path(relationOutGraph.path.points);
      //          relationOutGraph.path = tempPath;
      //        }
      //      }
      //    }

      //    for (let relationInNode of this.moveNode.inLevelGraphRelation) {
      //      for (let relationInGraph of this.currentLevelGraph.levelGraphRelations) {
      //        if (relationInNode.id === relationInGraph.id) {
      //          if ((relationInGraph.path.points[1].x + deltaX) > (0 + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEWIDTH / 2))) {
      //            relationInGraph.path.points[1].x = relationInGraph.path.points[1].x + deltaX;
      //          }
      //
      //          if ((relationInGraph.path.points[1].y + deltaY) > (0 + (LEVELGRAPHCONSTANTS.LEVELGRAPHNODEHEIGHT / 2))) {
      //            relationInGraph.path.points[1].y = relationInGraph.path.points[1].y + deltaY;
      //          }
      //          let tempPath = new Path(relationInGraph.path.points);
      //          relationInGraph.path = tempPath;
      //        }
      //      }
      //    }

      this.lastMousePositionY = newMousePositionY;
      this.lastMousePositionX = newMousePositionX;
    }
  }

  mouseUpOnNode(event) {
    this.mousedownOnNodeTemplate = false;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
  }

  createNodeTemplate(nodeTemplate: NodeTemplate) {

    this.nodeTemplateService.createNodeTemplate(nodeTemplate)
      .subscribe(nodeTemplateResponse => {
        this.currentTopologyTemplate.addNodeTemplate(nodeTemplateResponse);
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
        this.flashMessage.message = 'Level Graphs with id: ' + levelGraphResponse.id + ' retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Level Graphs with id: ' + levelGraphResponse.id + ' retrieved sucessfully.', TopologyModellerComponent.name);
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

  deleteNodeTemplate() {
    // TODO
  }

  deleteRelationshipTemplate() {
    // TODO
  }

}
