import { Level } from '../../shared/datamodel/levelgraphmodel/level';
import { LevelGraph } from '../../shared/datamodel/levelgraphmodel/levelgraph';
import { LevelService } from '../../shared/dataservices/level.service';
import { LevelGraphService } from '../../shared/dataservices/levelgraph.service';

import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-levelgraphtool',
  templateUrl: './levelgraphtool.component.html',
  styleUrls: ['./levelgraphtool.component.css']
})
export class LevelGraphToolComponent implements OnInit {

  levels = 3;
  levelGraphs: LevelGraph[] = [];
  createdLevelGraph: LevelGraph;
  editedLevelGraph: LevelGraph = new LevelGraph('', 0);
  importedLevelGraph: LevelGraph;

  constructor(private levelGraphService: LevelGraphService, private levelService: LevelService) { }

  ngOnInit() {

    this.loadLevelGraphs();

  }

  loadLevelGraphs() {
    this.levelGraphService.getLevelGraphs().subscribe(levelGraphs => this.levelGraphs = levelGraphs);
  }

  createLevelGraph(name: string, numberOfLevels: number) {

    let levelGraph: LevelGraph = new LevelGraph(name, numberOfLevels);
    this.levelGraphService.createLevelGraph(levelGraph).subscribe(levelGraphCreated => this.setLevelGraphData(levelGraphCreated));

  }

  setEditedLevelGraph(levelGraph: LevelGraph) {
    this.editedLevelGraph = levelGraph;
  }

  setLevelGraphData(levelGraph: LevelGraph) {

    for (let i = 0; i < levelGraph.numberOfLevels; i++) {
      let tempLevel = new Level('Level ' + (i + 1), (i + 1), true, (i * 300 + i * 40), 300, levelGraph);
      this.levelService.createLevel(tempLevel).subscribe(level => levelGraph.levels.push(level));
    }

    this.levelGraphs.push(levelGraph);
  }

  updateLevelGraph(name: string) {
    this.editedLevelGraph.name = name;
    this.levelGraphService.updateLevelGraph(this.editedLevelGraph).subscribe(levelGraphResponse => this.levelGraphs = Utility.updateElementInArry(levelGraphResponse.id, this.levelGraphs));
  }

  deleteLevelGraph(id: number) {
    this.levelGraphService.deleteLevelGraph(id).subscribe(res => this.levelGraphs = Utility.deleteElementFromArry(id, this.levelGraphs));
  }

  addLevel() {
    this.levels++;
  }

  removeLevel() {
    if (this.levels > 1) {
      this.levels--;
    }
  }
}
