import { LevelGraphService } from '../../shared/dataservices/levelgraphservice';
import { LevelGraph } from '../../shared/levelgraph';
import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-levelgraphtool',
  templateUrl: './levelgraphtool.component.html',
  styleUrls: ['./levelgraphtool.component.css']
})
export class LevelGraphToolComponent implements OnInit {

  levelGraphs: LevelGraph[] = [];
  createdLevelGraph: LevelGraph;
  importedLevelGraph: LevelGraph;

  constructor(private levelGraphService: LevelGraphService) { }

  ngOnInit() {

    this.loadLevelGraphs();

  }

  loadLevelGraphs() {
       this.levelGraphService.getLevelGraphs().subscribe(levelGraphs => this.levelGraphs = levelGraphs);
  }

  createLevelGraph(name: string, numberOfLevels: number) {
      let levelGraph: LevelGraph = new LevelGraph(name, '', numberOfLevels);
      this.levelGraphService.createLevelGraph(levelGraph).subscribe(levelGraphCreated => this.levelGraphs.push(levelGraphCreated));
  }

  updateLevelGraph(id: string) {

  }

  deleteLevelGraph(id: string) {
    event.stopPropagation();
    this.levelGraphService.deleteLevelGraph(id).subscribe(res =>  this.levelGraphs = Utility.deleteElementFromArry(id, this.levelGraphs));
  }

}
