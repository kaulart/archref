import { Relation } from '../graph/relation';
import { Path } from '../utility/path';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';

/*******************************************************************************************************************************************************************************************************
 *
 * LevelGraphRelation Data Model
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraphRelation extends Relation {

  sourceLevelDepth: number;
  targetLevelDepth: number;

  levelGraphNodes: LevelGraphNode[] = [];

  levelGraph: LevelGraph;
  levelGraphId: number;

  levels: Level[] = [];
  sourceLevelId: number;
  targetLevelId: number;

  levelGraphRelationType: string;

  constructor(sourceLevelDepth: number, targetLevelDepth: number, sourceNodeId: number, targetNodeId: number, levelGraphId: number, path: Path, levelGraphRelationType: string) {
    super(name, sourceNodeId, targetNodeId, path);
    this.sourceLevelDepth = sourceLevelDepth;
    this.targetLevelDepth = targetLevelDepth;
    this.levelGraphId = levelGraphId;
    this.levelGraphRelationType = levelGraphRelationType;
  }

  isTargetNodeSourceNodeInSameLevel() {
    return (this.sourceLevelId === this.targetLevelId);
  }

}
