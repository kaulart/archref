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

  levelId: number;
  level: Level;
  levelGraph: LevelGraph;
  levelGraphId: number;

  inLevelGraphRelation: LevelGraphRelation[] = [];
  outLevelGraphRelation: LevelGraphRelation[] = [];

  levelGraphNodeType: string;
  typeRef: number;

  constructor(name: string, x: number, y: number, width: number, height: number, levelId: number, levelGraphNodeType: string, typeRef: number, levelGraphId: number) {
    super(name, x, y, width, height);
    this.levelId = levelId;
    this.levelGraphNodeType = levelGraphNodeType;
    this.typeRef = typeRef;
    this.levelGraphId = levelGraphId;
  }

}
