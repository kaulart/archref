import { Relation } from '../graph/relation';
import { Path } from '../utility/path';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraphRelation Data Model - A relation of a LevelGraph
 *
 * @Entity
 * @superFields - id: number - ID of the LevelGraphNode
 * @superFields - name: string - Name of the LevelGraphNode
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @Relation
 * @superFields - sourceNodeId: number - ID of the Source Node of LevelGraphRelation
 * @superFields - targetNodeId: number - ID of the Target Node of LevelGraphRelation
 * @superFields - path: Path - Path of the line from source node to target node
 *
 * @fields - sourceLevelDepth: number - Depth of the level of the source node
 * @fields - targetLevelDepth: number - Depth of the level of the target node
 * @fields - sourceLevelId: number - ID of the source level
 * @fields - targetLevelId: number - ID of the target level
 * @fields - sourceLevel: Level - ID of the source level
 * @fields - targetLevel: Level - ID of the target level
 * @fields - targetLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @fields - sourceLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @fields - levelGraph: LevelGraph - LevelGraph of the LevelGraphReltation
 * @fields - levelGraphId: number - ID of the LevelGraph of the LevelGraphRelation
 * @fields - levelGraphRelationType: string - Type of the LevelGraphRelation // You may decide to implement later the types as a Class for further Improvments currently it is enough to
 *                                            implement it as constant Strings
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraphRelation extends Relation {

  sourceLevelDepth: number;
  targetLevelDepth: number;
  sourceLevelId: number;
  targetLevelId: number;
  sourceLevel: Level;
  targetLevel: Level;

  targetLevelGraphNode: LevelGraphNode;
  sourceLevelGraphNode: LevelGraphNode;

  levelGraph: LevelGraph;
  levelGraphId: number;

  levels: Level[] = [];

  levelGraphRelationType: string;

  constructor(sourceLevelDepth: number, targetLevelDepth: number, sourceNodeId: number, targetNodeId: number, levelGraphId: number, path: Path, levelGraphRelationType: string) {
    super(sourceNodeId, targetNodeId, path);
    this.sourceLevelDepth = sourceLevelDepth;
    this.targetLevelDepth = targetLevelDepth;
    this.levelGraphId = levelGraphId;
    this.levelGraphRelationType = levelGraphRelationType;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - isTargetNodeSourceNodeInSameLevel
   *
   ******************************************************************************************************************************************************************************************************/
  isTargetNodeSourceNodeInSameLevel() {
    return (this.sourceLevelId === this.targetLevelId);
  }

}
