import { Logger } from '../../../../logger/logger';
import { Level } from '../../../shared/datamodel/levelgraphmodel/level';
import { LevelGraph } from '../../../shared/datamodel/levelgraphmodel/levelgraph';
import { LevelGraphConnectedToRelation } from '../../../shared/datamodel/levelgraphmodel/levelgraphconnectedtorelation';
import { LevelGraphFragmentNode } from '../../../shared/datamodel/levelgraphmodel/levelgraphfragmentnode';
import { LevelGraphHostedOnRelation } from '../../../shared/datamodel/levelgraphmodel/levelgraphhostedonrelation';
import { LevelGraphNodeType } from '../../../shared/datamodel/levelgraphmodel/levelgraphnodetype';
import { LevelGraphRefineToRelation } from '../../../shared/datamodel/levelgraphmodel/levelgraphrefinetorelation';
import { LevelGraphRelationshipTypeNode } from '../../../shared/datamodel/levelgraphmodel/levelgraphrelationshiptypenode';
import { Repository } from '../../../shared/datamodel/repository';
import { AdministrationService } from '../../../shared/dataservices/administration.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraphservice';
import { Utility } from '../../../utility';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-levelgraphmodeller',
  templateUrl: './levelgraphmodeller.component.html',
  styleUrls: ['./levelgraphmodeller.component.css']
})
export class LevelGraphModellerComponent implements OnInit {

  /***************************************************************************************************************************************
   *
   *  Field Definitions
   *
   *************************************************************************************************************************************/

  // Variable for transporting the data between drag and drop event
  private currentDragData: any;
  typeCurrentDragData: string;

  // Collection of repositories witch are exist
  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository('Select Reposiory');

  // Collection of nodes in the level graph witch is currently displayed
  levelGraphNodeTypeNodes: LevelGraphNodeType[] = [];
  levelGraphRelationshipTypeNodes: LevelGraphRelationshipTypeNode[] = []
  levelGraphFragmentNodes: LevelGraphFragmentNode[] = [];

  // Collection of relations in the level graph in sum and separated related to the LevelGraphRelationType

  levelGraphRefineToRelation: LevelGraphRefineToRelation[] = [];
  levelGraphConnectToRelation: LevelGraphConnectedToRelation[] = [];
  levelGraphHostedOnRelation: LevelGraphHostedOnRelation[] = [];

  // Collection of all levels witch are currently activated for displaying in the front-end
  activeLevels: Level[] = [];

  // Flag variable for moving nodes in the modelling area
  private mousedownOnLevelChangeView = false;
  private mousedownOnLevelGraphNode = false;

  lastMousePositionY = 0;
  lastMousePositionX = 0;

  private drag = false;

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

  currentLevelGraph: LevelGraph = new LevelGraph('NO LEVEL GRAPH FOUND', 1);
  currentLevelGraphId: number;
  currentLevelGraphName: string;
  private sub: any;

  /***************************************************************************************************************************************
   *
   *  Constructor and ngOnInit Method
   *
   *************************************************************************************************************************************/

  constructor(private route: ActivatedRoute, private router: Router, private levelGraphService: LevelGraphService,
    private administrationService: AdministrationService) { }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentLevelGraphName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentLevelGraphId = params['id'] || '';
    });

    this.loadLevelGraph(this.currentLevelGraphId);
    this.loadRepositories();

  }

  /***************************************************************************************************************************************
   *
   * Methods for loading data
   *
   *************************************************************************************************************************************/

  activateLevels(levels: Level[]) {

    for (let level of this.currentLevelGraph.levels) {

      if (level.checked === true) {
        this.activeLevels.push(level);
      }
    }

  }

  loadRepositories() {
    this.administrationService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

  loadLevelGraph(id: number) {
    this.levelGraphService.getLevelGraph(id).subscribe(levelGraph => this.loadLevelGraphData(levelGraph));
  }

  loadLevelGraphData(levelGraph: LevelGraph) {

    this.currentLevelGraph = levelGraph;
    this.activateLevels(levelGraph.levels);
  }


  /***************************************************************************************************************************************
   *
   * Methods for change the numberOfLevels of the current levelGraph and the visibility levels are displayed
   *
   *************************************************************************************************************************************/

  addLevel() {

    let y = 0;
    for (let level of this.activeLevels) {
      y = level.height + 40;
    }
    this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() + 1);
    let tempLevel: Level = new Level('Level' + (this.currentLevelGraph.levels.length + 1), this.currentLevelGraph.levels.length + 1, true, y, 300, this.currentLevelGraph);
    this.currentLevelGraph.levels.push(tempLevel);
    this.activeLevels.push(tempLevel);
    this.updateLevelGraph(this.currentLevelGraph);
  }

  removeLevel() {

    if (this.currentLevelGraph.levels.length > 1) {
      this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() - 1);
      this.updateLevelGraph(this.currentLevelGraph);
      this.currentLevelGraph.levels.pop();
      this.activeLevels = Utility.deleteElementFromArry(this.currentLevelGraph.levels.length + 1, this.activeLevels);
      this.updateLevelGraph(this.currentLevelGraph);
    }
    //todo remove Nodes and edges in last level plus warning message for user 
  }

  onShowLevel(level: Level) {

    if (level.checked === true) {
      this.activeLevels = Utility.deleteElementFromArry(level.id, this.activeLevels);
    } else {
      this.activeLevels.push(level);
    }

  }

  /***************************************************************************************************************************************
   *
   * Methods for updating the data
   *************************************************************************************************************************************/

  updateLevelGraph(levelGraph: LevelGraph) {
    this.levelGraphService.updateLevelGraph(levelGraph).subscribe(levelGraph => this.currentLevelGraph = levelGraph);
  }


  onSelectRepository(id: number) {

    this.administrationService.getRepository(id).subscribe(repository => this.setSelectedRepository(repository));
  }

  setSelectedRepository(repository: Repository) {
    this.selectedRepository = repository;
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

  startMovingNode(event: MouseEvent) {

    this.mousedownOnLevelGraphNode = true;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
  
  }

  
  drawEdge(){
  
  }
  
  moveNode(event: MouseEvent, node: any) {

    let newMousePositionY = event.offsetY;
    let newMousePositionX = event.offsetX;
    let deltaY = (newMousePositionY - this.lastMousePositionY);
    let deltaX = (newMousePositionX - this.lastMousePositionX);
    // Logger.info("[MOUSEMOVEEVENT] event OFFSETY: " + (newMousePositionY - this.lastMousePositionY), LevelGraphModellerComponent.name);

    if (this.mousedownOnLevelGraphNode === true) {
    
      node.y = node.y + deltaY;
        node.x = node.x + deltaX;
    }
  
  
    this.lastMousePositionY = newMousePositionY;
    this.lastMousePositionX = newMousePositionX;

  }

  stopMovingNode(event) {
    this.mousedownOnLevelGraphNode = false;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
  }

 
  
  

  /*****************************************************************************************************************************************
   *
   * Drag and Drop Handling for creating Level Graph Nodes
   *
   ****************************************************************************************************************************************/


  onDrag(event, dragData: any, typeDragData: string) {

    this.currentDragData = dragData;
    this.typeCurrentDragData = typeDragData;
    this.drag = true;
  }

  onDragOver(event) {

    event.preventDefault();

  }

  onDrop(event, level) {
    Logger.info("[ONDROP]", LevelGraphModellerComponent.name);
    if (this.drag === true) {
      if (this.typeCurrentDragData === "NodeType") {
        Logger.data("On Drop Data of Level: " + JSON.stringify(level) + " Data of current DragData: " + JSON.stringify(this.currentDragData) + "OFFSET X  " + event.offsetX + "  OFFSET Y  " + event.offsetY, LevelGraphModellerComponent.name);
        let levelGraphNodeTypeNode = new LevelGraphNodeType(event.offsetX - 50, event.offsetY -level.y, 200, 100, this.currentDragData, level);
        this.levelGraphNodeTypeNodes.push(levelGraphNodeTypeNode);

      } else if (this.typeCurrentDragData === "RelationshipType") {

        let levelGraphRelationshipTypeNode = new LevelGraphRelationshipTypeNode(event.offsetX -50, event.offsetY - level.y, 200, 100, this.currentDragData, level);
        this.levelGraphRelationshipTypeNodes.push(levelGraphRelationshipTypeNode);

      } else if (this.typeCurrentDragData === "FragmentNode") {

        let levelGraphFragmentNode = new LevelGraphFragmentNode(event.offsetX -50, event.offsetY - level.y, 200, 100, level);
        this.levelGraphFragmentNodes.push(levelGraphFragmentNode);

      } else {
        console.log("NO ");
      }
      this.drag = false;
    }
  }

  /*****************************************************************************************************************************************
   *
   * Handling for changing the high of the level view area 
   *
   ****************************************************************************************************************************************/
  startChangeLevelHeight(event: MouseEvent) {
    this.mousedownOnLevelChangeView = true;
    this.lastMousePositionY = event.offsetY;
  }

  changeLevelHeight(event: MouseEvent, level: Level) {

    let newMousePositionY = event.offsetY;
    let delta = (newMousePositionY - this.lastMousePositionY);
    Logger.info("[MOUSEMOVEEVENT] event OFFSETY: " + (newMousePositionY - this.lastMousePositionY), LevelGraphModellerComponent.name);

    if (this.mousedownOnLevelChangeView === true) {

      level.height = level.height + delta;
      this.updateLevelPosition(level, delta);
    }

    this.lastMousePositionY = newMousePositionY;

  }

  updateLevelPosition(level: Level, delta: number) {

    for (let activeLevel of this.activeLevels) {
      if (activeLevel.value > level.value) {
        activeLevel.y = activeLevel.y + delta;
      }
    }

  }

  stopChangeLevelHeight(event: MouseEvent) {
    this.mousedownOnLevelChangeView = false;
    this.lastMousePositionY = event.offsetY;
  }

}
