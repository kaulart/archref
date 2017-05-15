import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
export class LevelGraphRelation {

  id: number;
  sourceLevel: Level;
  targetLevel: Level;
  levelGraph: LevelGraph;
  x: number;
  y: number;
  width: number;
  height: number;

  sourceLevelGraphNode: LevelGraphNode;
  targetLevelGraphNpde: LevelGraphNode;
}
