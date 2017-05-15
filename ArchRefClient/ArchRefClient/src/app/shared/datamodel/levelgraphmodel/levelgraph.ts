import { Level } from './level';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';


export class LevelGraph {

  id: number;
  name: string;
  numberOfLevels: number;
  levels: Level[] = [];
  levelGraphRelations: LevelGraphRelation[] = [];
  levelGraphNodes: LevelGraphNode[] = [];


  constructor(name: string, numberOfLevels: number) {
    this.name = name;
    this.numberOfLevels = numberOfLevels;
  }

  public getNumberOfLevels() {
    return this.numberOfLevels;
  }

  public setNumberOfLevels(numberOfLevels: number) {
    this.numberOfLevels = numberOfLevels;
  }

}

