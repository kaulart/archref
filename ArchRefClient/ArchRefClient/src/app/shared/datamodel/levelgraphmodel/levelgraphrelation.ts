import { Path } from '../path';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
export class LevelGraphRelation {

  id: number;
  sourceLevelValue: number;
  targetLevelValue: number;
  sourceLevelGraphNode: LevelGraphNode;
  targetLevelGraphNode: LevelGraphNode;
  levelGraph: LevelGraph;
  path: Path;
  levelGraphRelationType: string;

  constructor(sourceLevelValue: number, targetLevelValue: number, sourceLevelGraphNode: LevelGraphNode, targetLevelGraphNode: LevelGraphNode, levelGraph: LevelGraph, path: Path, levelGraphRelationType: string) {
    this.sourceLevelValue = sourceLevelValue;
    this.targetLevelValue = targetLevelValue;
    this.sourceLevelGraphNode = sourceLevelGraphNode;
    this.targetLevelGraphNode = targetLevelGraphNode;
    this.levelGraph = levelGraph;
    this.path = path;
    this.levelGraphRelationType = levelGraphRelationType;
  }
}
