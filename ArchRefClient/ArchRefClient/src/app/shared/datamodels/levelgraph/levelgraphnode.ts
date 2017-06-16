import { Node } from '../graph/node';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraphNode Data Model - A node of a LevelGraph
 *
 * @Entity
 * @superFields - id: number - ID of the LevelGraphNode
 * @superFields - name: string - Name of the LevelGraphNode
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @Node
 * @superFields - x: number - x Position of the left upper corner of a rectangle
 * @superFields - y: number - y Position of the left upper corner of a rectangle
 * @superFields - width: number - Width of the rectangle
 * @superFields - height: number - Height of the rectangle
 *
 * @fields - level: Level - Level of the Node
 * @fields - levelId: number - ID of the Level of the Node
 * @fields - levelGraph: LevelGraph - LevelGraph of the Node
 * @fields - levelGraphId: number - ID of the LevelGraph of the Node
 * @fields - levelGraphRelations: LevelGraphRelation[] - Array of all outgoing and incoming relations of the node
 * @fields - levelGraphNodeType: string - Type of the LevelGraphNode;
 * @fields - levelGraphNodeTypeId: number - ID of the Type of the LevelGraphNode
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraphNode extends Node {

  level: Level;
  levelId: number;
  levelGraph: LevelGraph;
  levelGraphId: number;

  levelGraphRelations: LevelGraphRelation[] = [];

  levelGraphNodeType: string;
  levelGraphNodeTypeId: number;

  constructor(x: number, y: number, width: number, height: number, levelId: number, levelGraphNodeType: string, levelGraphNodeTypeId: number, levelGraphId: number) {
    super(x, y, width, height);
    this.levelId = levelId;
    this.levelGraphNodeType = levelGraphNodeType;
    this.levelGraphNodeTypeId = levelGraphNodeTypeId;
    this.levelGraphId = levelGraphId;
  }

}
