import { NodeType } from '../topologymodel/nodetype';
import { Level } from './level';
import { LevelGraphConnectedToRelation } from './levelgraphconnectedtorelation';
import { LevelGraphHostedOnRelation } from './levelgraphhostedonrelation';
import { LevelGraphRefineToRelation } from './levelgraphrefinetorelation';
export class LevelGraphNodeType {

  id: number;
  level: Level;
  nodeType: NodeType;

  x: number;
  y: number;
  width: number;
  height: number;

  refineRelationOut: LevelGraphRefineToRelation[] = [];
  connectToRelationOut: LevelGraphConnectedToRelation[] = [];
  hostedOnRelationOut: LevelGraphHostedOnRelation[] = [];

  refineRelationIn: LevelGraphRefineToRelation[] = [];
  connectToRelationIn: LevelGraphConnectedToRelation[] = [];
  hostedOnRelationIn: LevelGraphHostedOnRelation[] = [];

  constructor(x: number, y: number, width: number, height: number, nodeType: NodeType, level: Level) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nodeType = nodeType;
    this.level = level;
  };

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }


}
