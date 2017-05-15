import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphRelation } from './levelgraphrelation';
export class LevelGraphNode {

  id: number;
  level: Level;
  levelGraph: LevelGraph;
  x: number;
  y: number;
  width: number;
  height: number;

  inLevelGraphRelations: LevelGraphRelation[] = [];
  outLevelGraphRelations: LevelGraphRelation[] = [];

  constructor(x: number, y: number, width: number, height: number, level: Level) {

    this.level = level;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

  }

}
