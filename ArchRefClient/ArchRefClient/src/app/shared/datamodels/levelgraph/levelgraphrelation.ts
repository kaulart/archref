import { Relation } from '../graph/relation';
import { Path } from '../path';
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

  sourceLevel: Level;
  targetLevel: Level;
  sourceLevelValue: number;
  targetLevelValue: number;
  sourceLevelGraphNode: LevelGraphNode;
  targetLevelGraphNode: LevelGraphNode;
  levelGraph: LevelGraph;
  levelGraphId: number;
  levelGraphRelationType: string;

  constructor(sourceLevelValue: number, targetLevelValue: number, sourceLevelGraphNodeId: number, targetLevelGraphNodeId: number, levelGraphId: number, path: Path, levelGraphRelationType: string) {
    super(name, sourceLevelGraphNodeId, targetLevelGraphNodeId, path);
    this.sourceLevelValue = sourceLevelValue;
    this.targetLevelValue = targetLevelValue;
    this.levelGraphId = levelGraphId;
    this.levelGraphRelationType = levelGraphRelationType;
  }

}
