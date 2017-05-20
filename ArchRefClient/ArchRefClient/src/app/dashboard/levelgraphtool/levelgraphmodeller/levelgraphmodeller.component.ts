import { Logger } from '../../../../logger/logger';
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

  moveNode: LevelGraphNode = new LevelGraphNode(null, null, null, null, null, null, null, null, null);
  currentDrawRelation: LevelGraphRelation = new LevelGraphRelation(null, null, null, null, null, null, null);

  // Collection of all levels witch are currently activated for displaying in the front-end
  activeLevels: Level[] = [];

  // Flag variable for moving nodes in the modelling area
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

  /***************************************************************************************************************************************
   *
   *  Constructor and ngOnInit Method
   *
   *************************************************************************************************************************************/

  constructor(private route: ActivatedRoute, private router: Router, private levelGraphService: LevelGraphService,
    private repositoryService: RepositoryService, private levelGraphNodeService: LevelGraphNodeService, private fragmentNodeService: FragmentNodeService, private levelService: LevelService, private levelGraphRelationService: LevelGraphRelationService) {
    this.currentLevelGraph = new LevelGraph('NO LEVEL GRAPH FOUND', 1);
  }

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

  loadRepositories() {
    this.repositoryService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

  loadLevelGraph(id: number) {
    this.levelGraphService.getLevelGraph(id).subscribe(levelGraph => this.loadLevelGraphData(levelGraph));
  }

  loadLevelGraphData(levelGraph: LevelGraph) {

    this.currentLevelGraph = levelGraph;
    this.activateLevels(levelGraph.levels);
  }

  activateLevels(levels: Level[]) {

    for (let level of this.currentLevelGraph.levels) {

      if (level.checked === true) {
        this.activeLevels.push(level);
      }
    }

  }

  /***************************************************************************************************************************************
   *
   * Methods for change the numberOfLevels of the current levelGraph and the visibility levels are displayed
   *
   *************************************************************************************************************************************/

  addLevel() {

    let y = 0;
    for (let level of this.activeLevels) {
      y = y + level.height + 40;
    }

    Logger.data('Number OF Levels' + this.currentLevelGraph.getNumberOfLevels(), LevelGraphModellerComponent.name);

    let tempLevel: Level = new Level('Level' + this.currentLevelGraph.getNumberOfLevels() + 1, this.currentLevelGraph.getNumberOfLevels() + 1, true, y, 300, this.currentLevelGraph);
    this.levelService.createLevel(tempLevel).subscribe(levelResponse => this.callBackAddLeve(levelResponse));
  }

  callBackAddLeve(level: Level) {
    this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() + 1);
    this.currentLevelGraph.levels.push(level);
    this.activeLevels.push(level);
    this.updateLevelGraph();
  }

  removeLevel() {

    if (this.currentLevelGraph.levels.length > 1) {
      this.currentLevelGraph.setNumberOfLevels(this.currentLevelGraph.getNumberOfLevels() - 1);
      this.activeLevels = Utility.deleteElementFromArry(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id, this.activeLevels);
      this.levelService.deleteLevel(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id).subscribe();
      this.currentLevelGraph.levels = Utility.deleteElementFromArry(this.currentLevelGraph.levels[this.currentLevelGraph.levels.length - 1].id, this.currentLevelGraph.levels);

      this.updateLevelGraph();

    } else {

      // TODO: ERROR HANDLING
    }
  }

  onShowLevel(level: Level) {

    if (level.checked === true) {
      this.activeLevels = Utility.deleteElementFromArry(level.id, this.activeLevels);
      for (let liveLevel of this.activeLevels) {
        if (liveLevel.value > level.value) {
          liveLevel.y = liveLevel.y - level.height - 40;
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


  /***************************************************************************************************************************************
   *
   * Methods for updating the data
   *************************************************************************************************************************************/

  updateLevelGraph() {
    this.levelGraphService.updateLevelGraph(this.currentLevelGraph).subscribe(levelGraph => this.currentLevelGraph = levelGraph);
  }


  onSelectRepository(id: number) {

    this.repositoryService.getRepository(id).subscribe(repository => this.setSelectedRepository(repository));
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
              relationOutGraph.path.points[0].x = relationOutGraph.path.points[0].x + deltaX;
              relationOutGraph.path.points[0].y = relationOutGraph.path.points[0].y + deltaY;
              let tempPath = new Path(relationOutGraph.path.points);
              relationOutGraph.path = tempPath;
            }
          }
        }

        for (let relationInNode of this.moveNode.inLevelGraphRelation) {
          for (let relationInGraph of this.currentLevelGraph.levelGraphRelations) {
            if (relationInNode.id === relationInGraph.id) {
              relationInGraph.path.points[1].x = relationInGraph.path.points[1].x + deltaX;
              relationInGraph.path.points[1].y = relationInGraph.path.points[1].y + deltaY;
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

    if (this.isRelationDrawAllowed(levelGraphNode, this.currentDrawRelation.sourceLevelGraphNode, level)) {

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

      this.levelGraphRelationService.createLevelGraphRelation(this.currentDrawRelation).subscribe(levelGraphRelationResponse => this.createLevelGraphRelation(levelGraphRelationResponse, this.currentDrawRelation.sourceLevelGraphNode, levelGraphNode));


    }

    this.mousedownOnLevelGraphNode = false;
    this.lastMousePositionY = event.offsetY;
    this.lastMousePositionX = event.offsetX;
    this.drawRelation = false;
  }


  createLevelGraphRelation(levelGraphRelation: LevelGraphRelation, levelGraphNodeSource: LevelGraphNode, levelGraphNodeTarget: LevelGraphNode) {
    this.currentLevelGraph.levelGraphRelations.push(levelGraphRelation);
    levelGraphNodeTarget.inLevelGraphRelation.push(levelGraphRelation);
    levelGraphNodeSource.outLevelGraphRelation.push(levelGraphRelation);
  }

  mouseUpOnDrawArea() {
    this.mousedownOnLevelGraphNode = false;
    this.drawRelation = false;
    this.mousedownOnLevelChangeView = false;
  }

  isRelationDrawAllowed(levelGraphNode: LevelGraphNode, levelGraphNodeSource: LevelGraphNode, level: Level) {
    if (!this.toolList[0].checked) {
      if (levelGraphNode.id != levelGraphNodeSource.id) {

        if (this.toolList[1].checked) {

          if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

            return true;

          } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

            return true;

          } else {

            return false; // TODO: Warning Message

          }

        } else if (this.toolList[2].checked) {


          if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

            return true;

          } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

            return true;

          } else {

            return false; // TODO: Warning Message

          }

        } else if (this.toolList[3].checked) {
          if (this.currentDrawRelation.sourceLevelValue < level.value) {
            if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

              return true; // TODO: Warning Message

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

              return true;

            } else if (this.currentDrawRelation.sourceLevelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE && levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.NODETYPE) {

              return true;

            } else {
              return false; // TODO: Warning Message Case not Supported

            }

          } else {
            return false; // TODO: Warning Message 
          }

        }
      }
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

  onDrop(event, level: Level) {
    if (this.drag === true) {
      if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.NODETYPE) {

        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - 50, event.offsetY - level.y, 200, 100, level, LEVELGRAPHNODETYPE.NODETYPE, this.currentDragData.id);

      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.RELATIONSHIPTYPE) {

        this.createLevelGraphNode(this.currentDragData.name, event.offsetX - 50, event.offsetY - level.y, 200, 100, level, LEVELGRAPHNODETYPE.RELATIONSHIPTYPE, this.currentDragData.id);

      } else if (this.typeCurrentDragData === LEVELGRAPHNODETYPE.FRAGMENTNODE) {

        if (level.value > 1) {

          let fragmentNode = new FragmentNode();
          this.fragmentNodeService.createFragmentNode(fragmentNode).subscribe(fragmentNodeRes => this.createLevelGraphNode('Fragment' + fragmentNodeRes.getId(), event.offsetX - 50, event.offsetY - level.y, 200, 100, level, LEVELGRAPHNODETYPE.FRAGMENTNODE, fragmentNodeRes.getId()));

        } else {
          //TODO:ErrorHandling
        }

      } else {
        //TODO: ErrorHandling
      }

      this.drag = false;
    }
  }

  createLevelGraphNode(name: string, x: number, y: number, width: number, height: number, level: Level, levelGraphNodeType: string, typeRef: number) {

    let levelGraphNode = new LevelGraphNode(name, x, y, width, height, level.id, levelGraphNodeType, typeRef, this.currentLevelGraph);
    this.levelGraphNodeService.createLevelGraphNode(levelGraphNode).subscribe(levelGraphNodeRes => this.currentLevelGraph.levelGraphNodes.push(levelGraphNodeRes));
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


  viewDetails(id: number) {

  }

  deleteLevelGraphNode(levelGraphNode: LevelGraphNode) {

    if (levelGraphNode.levelGraphNodeType === LEVELGRAPHNODETYPE.FRAGMENTNODE) {
      this.levelGraphNodeService.deleteLevelGraphNode(levelGraphNode.id).subscribe(response => this.currentLevelGraph.levelGraphNodes = Utility.deleteElementFromArry(levelGraphNode.id, this.currentLevelGraph.levelGraphNodes));
      this.fragmentNodeService.deleteFragmentNode(levelGraphNode.typeRef).subscribe();
    } else {
      this.levelGraphNodeService.deleteLevelGraphNode(levelGraphNode.id).subscribe(response => this.currentLevelGraph.levelGraphNodes = Utility.deleteElementFromArry(levelGraphNode.id, this.currentLevelGraph.levelGraphNodes));
    }

  }

  deleteLevelGraphRelation(levelGraphRelation: LevelGraphRelation) {

    this.levelGraphRelationService.deleteLevelGraphRelation(levelGraphRelation.id).subscribe(response => this.currentLevelGraph.levelGraphRelations = Utility.deleteElementFromArry(levelGraphRelation.id, this.currentLevelGraph.levelGraphRelations));

  }

}
