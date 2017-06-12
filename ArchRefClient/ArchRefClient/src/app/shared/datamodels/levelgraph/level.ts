import { LevelGraph } from './levelgraph';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * Level Data Model
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
  levelGraphRelations: LevelGraphRelation[] = [];
  levelGraphNodes: LevelGraphNode[] = [];

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
