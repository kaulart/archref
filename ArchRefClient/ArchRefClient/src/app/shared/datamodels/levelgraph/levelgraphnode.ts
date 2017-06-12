import { Node } from '../graph/node';
import { Level } from './level';
import { LevelGraph } from './levelgraph';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * LevelGraphNode Data Model
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

  constructor(name: string, x: number, y: number, width: number, height: number, levelId: number, levelGraphNodeType: string, levelGraphNodeTypeId: number, levelGraphId: number) {
    super(name, x, y, width, height);
    this.levelId = levelId;
    this.levelGraphNodeType = levelGraphNodeType;
    this.levelGraphNodeTypeId = levelGraphNodeTypeId;
    this.levelGraphId = levelGraphId;
  }

}
