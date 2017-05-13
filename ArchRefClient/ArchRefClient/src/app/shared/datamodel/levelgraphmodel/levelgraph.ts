

import { Level } from './level';
import { LevelGraphConnectedToRelation } from './levelgraphconnectedtorelation';
import { LevelGraphFragmentNode } from './levelgraphfragmentnode';
import { LevelGraphHostedOnRelation } from './levelgraphhostedonrelation';
import { LevelGraphNodeType } from './levelgraphnodetype';
import { LevelGraphRefineToRelation } from './levelgraphrefinetorelation';
import { LevelGraphRelationshipTypeNode } from './levelgraphrelationshiptypenode';

export class LevelGraph {

  name: string;
  id: number;
  numberOfLevels: number;
  levels: Level[] = [];

  levelGraphRelationTypeList: LevelGraphRelationshipTypeNode[];
  levelGraphNodeTypeList: LevelGraphNodeType[];
  levelGraphFragmentNodeList: LevelGraphFragmentNode[];

  levelGraphConnectToRelationList: LevelGraphConnectedToRelation[] ;
  levelGraphHostedOnRelationList: LevelGraphHostedOnRelation[] ;
  levelGraphRefineToRelationList: LevelGraphRefineToRelation[];

  constructor(name: string, numberOfLevels: number) {
      this.name = name;
      this.numberOfLevels = numberOfLevels;
  }

  public getNumberOfLevels() {
      return this.numberOfLevels;
  }

  public setNumberOfLevels(numberOfLevels: number) {
    this.numberOfLevels = numberOfLevels;
  }

}

