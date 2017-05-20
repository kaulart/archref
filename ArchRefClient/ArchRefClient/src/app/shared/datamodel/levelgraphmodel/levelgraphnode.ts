
import { LevelGraph } from './levelgraph';
import { LevelGraphRelation } from './levelgraphrelation';
export class LevelGraphNode {

  id: number;
  name: string;

  levelId: number;
  levelGraph: LevelGraph;

  x: number;
  y: number;
  width: number;
  height: number;

  inLevelGraphRelation: LevelGraphRelation[] = [];
  outLevelGraphRelation: LevelGraphRelation[] = [];

  levelGraphNodeType: string;
  typeRef: number;

  constructor(name: string, x: number, y: number, width: number, height: number, levelId: number, levelGraphNodeType: string, typeRef: number, levelGraph: LevelGraph) {

    this.name = name;
    this.levelId = levelId;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.levelGraphNodeType = levelGraphNodeType;
    this.typeRef = typeRef;
    this.levelGraph = levelGraph;

  }

}
