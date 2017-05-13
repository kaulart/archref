import { NodeType } from '../topologymodel/nodetype';
import { RelationshipType } from '../topologymodel/relationshiptype';
import { Level } from './level';
import { LevelGraphConnectedToRelation } from './levelgraphconnectedtorelation';
import { LevelGraphHostedOnRelation } from './levelgraphhostedonrelation';
import { LevelGraphRefineToRelation } from './levelgraphrefinetorelation';

export class LevelGraphRelationshipTypeNode {

  id: number;
  level: Level;
  realtionshipType: RelationshipType;

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

  constructor(x: number, y: number, width: number, height: number, realtionshipType: RelationshipType, level: Level) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.realtionshipType = realtionshipType;
    this.level = level;
  };

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }



}
