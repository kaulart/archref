import { AdministrationService } from '../../../shared/dataservices/administration.service';
import { LevelGraphService } from '../../../shared/dataservices/levelgraphservice';
import { Level } from '../../../shared/level';
import { LevelGraph } from '../../../shared/levelgraph';
import { Repository } from '../../../shared/repository';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Node } from '../../../shared/node';

@Component({
  selector: 'app-levelgraphmodeller',
  templateUrl: './levelgraphmodeller.component.html',
  styleUrls: ['./levelgraphmodeller.component.css']
})
export class LevelGraphModellerComponent implements OnInit {
   private currentDragData: any;
  repositories: Repository[] = [];
  selectedRepository: Repository = new Repository('Select Reposiory');

  nodes: Node[] = [];
  private mousedown = false;

  levels: Level[] = [];
  activeLevels: Level[] = [];

  levelGraphRelationTypes = [
    {name: 'ConnectedTo', value: '1', checked: true},
    {name: 'HostedOn', value: '2', checked: false},
    {name: 'RefineTo', value: '3', checked: true}
  ];

  levelGraphs: LevelGraph[];
  currentLevelGraph: LevelGraph;

  currentLevelGraphId: string;
  currentLevelGraphName: string;
  private sub: any;

  constructor( private route: ActivatedRoute, private router: Router, private levelGraphService: LevelGraphService,
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

  loadLevels(numberOfLevel: number) {

    for (let i = 0; i < numberOfLevel; i++) {
       this.levels.push({name: 'Level' + (i + 1), value: (i + 1), checked: true});
    }

    for (let level of this.levels) {

        if (level.checked === true) {
             this.activeLevels.push(level);
        }
    }

  }

  addLevel() {
      this.levels.push({name: 'Level' + (this.levels.length), value: (this.levels.length), checked: true});
  }

  removeLevel() {

  }

  loadRepositories() {
       this.administrationService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

  loadLevelGraph(id: string) {
      this.levelGraphService.getLevelGraph(id).subscribe(levelGraph => this.loadLevelGraphData(levelGraph));
  }

  loadLevelGraphData(levelGraph: LevelGraph) {

     this.currentLevelGraph = levelGraph;
     this.loadLevels(levelGraph.numberOfLevels);
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


  moveNode(event: MouseEvent, node: Node) {

    if (this.mousedown === true) {
       node.setPos_X(event.offsetX - node.getWidth() / 2);
       node.setPos_Y(event.offsetY - node.getHeight() / 2);
    }

  }

  mouseUp(event, node: Node) {
     this.mousedown = false;
  }

  startMovingNode(event: MouseEvent, node: Node) {
      this.mousedown = true;
  }

  onDragOver(event) {
      event.preventDefault();

  }

  onDrag(event, dragData: any) {
      this.currentDragData = dragData;
  }

  onDrop(event) {
      let newTempnode: Node = new Node("dummy", "dummy", "dummy",   event.offsetX,    event.offsetY, 50, 50);
      this.nodes.push(newTempnode);
  }
  
}
