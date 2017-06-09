import { Entity } from '../entity/entity';
import { LevelGraph } from '../levelgraph/levelgraph';
import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';

export class TopologyTemplate extends Entity {

  nodeTemplates: NodeTemplate[] = [];
  relationshipTemplates: RelationshipTemplate[] = [];

  parentTopologyTemplate: TopologyTemplate;
  childTopologyTemplates: TopologyTemplate[] = [];

  levelGraph: LevelGraph;
  levelGraphId: number;

  abstractionLevel: number;

  constructor(name) {
    super(name);
  }

}
