import { Path } from '../path';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
export class LevelGraphRelation {

  id: number;
  sourceLevel: Level;
  targetLevel: Level;
   sourceLevelGraphNode: LevelGraphNode;
  targetLevelGraphNpde: LevelGraphNode;
  levelGraph: LevelGraph;
  path: Path;
  levelGraphRelationType: string;

  constructor(sourceLevel: Level, targetLevel: Level, sourceLevelGraphNode: LevelGraphNode, targetLevelGraphNpde: LevelGraphNode, levelGraph: LevelGraph, path: Path, levelGraphRelationType: string) {
    this.sourceLevel = sourceLevel;
    this.targetLevel = targetLevel;
    this.sourceLevelGraphNode = sourceLevelGraphNode;
    this.targetLevelGraphNpde = targetLevelGraphNpde;
    this.levelGraph = levelGraph;
    this.path = path;
    this.levelGraphRelationType = levelGraphRelationType;
  }
}
