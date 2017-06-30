import { Relation } from '../graph/relation';
import { Path } from '../utility/path';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraphRelation - A relation of a LevelGraph
 *
 * @Entity
 * @superField - id: number - ID of the LevelGraphNode
 * @superField - name: string - Name of the LevelGraphNode
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @Relation
 * @superField - sourceNodeId: number - ID of the Source Node of LevelGraphRelation
 * @superField - targetNodeId: number - ID of the Target Node of LevelGraphRelation
 * @superField - path: Path - Path of the line from source node to target node
 *
 * @field - sourceLevelDepth: number - Depth of the level of the source node
 * @field - targetLevelDepth: number - Depth of the level of the target node
 * @field - sourceLevelId: number - ID of the source level
 * @field - targetLevelId: number - ID of the target level
 * @field - sourceLevel: Level - Source level object
 * @field - targetLevel: Level - Target level object
 * @field - targetLevelGraphNode: LevelGraphNode - Target LevelGraphNode of the levelGraphRelation
 * @field - sourceLevelGraphNode: LevelGraphNode - Source LevelGraphNode of the levelGraphRelation
 * @field - levelGraph: LevelGraph - LevelGraph of the LevelGraphReltation
 * @field - levelGraphId: number - ID of the LevelGraph of the LevelGraphRelation
 * @field - levelGraphRelationType: string - Type of the LevelGraphRelation
 * @hint:    You may decide to implement later the types as a Class for further improvment currently it is enough to implement it as constant Strings
 * @field - entryPoint: boolean - True if a LevelGraphRelation of type REFINE_TO is a outgoing relation of a LevelGraphNode of type NODEFTYPERAGMENT or RELATIONSHIPTYPEFRAGMENT and its target
 *                                LevelGraphNode is a EntryPoint of the Fragment. Default is false.
 * @field - exitPoint: boolean - True if a LevelGraphRelation of type REFINE_TO is a outgoing relation of a LevelGraphNode of type fragment and its target LevelGraphNode is a ExitPoint of the Fragment.
 *                               Default is false.
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

  entryPoint = false;
  exitPoint = false;

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
