import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - Level Data Model - Level for the Level Graph Model for display the levels in the LevelGraphModellerComponent
 *
 * @fields - id: number - ID of the level
 * @fields - depth: number - Depth of the level in the LevelGraph
 * @fields - visible: boolean - Indicates if a level should be displayed or not in the LevelGraphModellerComponent
 * @fields - y: number - Y-Position of the level layer in the LevelGraphModellerComponent
 * @fields - height: number - Height of the level layer in the LevelGraphModellerComponent
 * @fields - levelGraph: LevelGraph height: number - Corresponding LevelGraph for the Level
 * @fields - levelGraphId: number - ID of the corresponding LevelGraph
 * @fields - levelGraphRelations: LevelGraphRelation[] = [] - Array of all Relations which have the target or source node in this level
 * @fields - levelGraphNodes: LevelGraphNode[] = [] - Array of all Node which are in this level
 *
 * //TODO You may decide to decouple level data from data which is only be used for display reasons in the LevelGraphModellerComponent
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Level {

  id: number;
  depth: number;
  visible: boolean;
  y: number;
  height: number;
  levelGraph: LevelGraph;
  levelGraphId: number;
  levelGraphRelations: LevelGraphRelation[];
  levelGraphNodes: LevelGraphNode[];

  constructor(depth: number, visible: boolean, y: number, height: number, levelGraphId: number, levelGraphRelations: LevelGraphRelation[], levelGraphNodes: LevelGraphNode[]) {
    this.depth = depth;
    this.visible = visible;
    this.y = y;
    this.height = height;
    this.levelGraphId = levelGraphId;
    this.levelGraphRelations = levelGraphRelations;
    this.levelGraphNodes = levelGraphNodes;
  }

}
