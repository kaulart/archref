/**
 * New typescript file
 */
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

export class Level {

  id: number;
  name: string;
  value: number;
  checked: boolean;
  y: number;
  height: number;
  levelGraph: LevelGraph;
  outLevelGraphRelations: LevelGraphRelation[] = [];
  inLevelGraphRelations: LevelGraphRelation[] = [];
  levelGraphnodes: LevelGraphNode[] = [];

  constructor(name: string, value: number, checked: boolean, y: number, height: number, levelGraph: LevelGraph) {
    this.name = name;
    this.value = value;
    this.checked = checked;
    this.y = y;
    this.height = height;
    this.levelGraph = levelGraph;
  }

}
