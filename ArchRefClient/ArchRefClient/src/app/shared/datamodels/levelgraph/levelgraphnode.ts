  import { Node } from '../graph/node';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraphNode - A node of a LevelGraph
 *
 * @superclass - Entity
 * @superField - id: number - ID of the LevelGraphNode
 * @superField - name: string - Name of the LevelGraphNode
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @superclass - Node
 * @superField - x: number - x Position of the left upper corner of a rectangle
 * @superField - y: number - y Position of the left upper corner of a rectangle
 * @superField - width: number - Width of the rectangle
 * @superField - height: number - Height of the rectangle
 *
 * @field - level: Level - Level of the LevelGraphNode
 * @field - levelId: number - ID of the Level of the LevelGraphNode
 * @field - levelDepth: number - Level depth of the LevelGraphNode
 * @field - levelGraph: LevelGraph - LevelGraph of the LevelGraphNode
 * @field - levelGraphId: number - ID of the LevelGraph of the LevelGraphNode
 * @field - inLevelGraphRelations: LevelGraphRelation[] - Array of all incoming relations of the node
 * @field - outLevelGraphRelations: LevelGraphRelation[] - Array of all outgoing relations of the node
 * @field - levelGraphNodeType: string - Type of the LevelGraphNode;
 * @field - levelGraphNodeTypeId: number - ID of the Type of the LevelGraphNode
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraphNode extends Node {

  level: Level;
  levelId: number;
  levelDepth: number;

  levelGraph: LevelGraph;
  levelGraphId: number;

  inLevelGraphRelations: LevelGraphRelation[] = [];
  outLevelGraphRelations: LevelGraphRelation[] = [];

  levelGraphNodeType: string;
  levelGraphNodeTypeId: number;

  constructor() {
    super();
  }

}
