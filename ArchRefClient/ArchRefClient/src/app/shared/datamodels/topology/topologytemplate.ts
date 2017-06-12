import { Entity } from '../entity/entity';
import { LevelGraph } from '../levelgraph/levelgraph';
import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';

export class TopologyTemplate extends Entity {

  nodeTemplates: NodeTemplate[] = [];
  relationshipTemplates: RelationshipTemplate[] = [];

  parentTopologyTemplate: TopologyTemplate;
  parentTopologyTemplateId: number;
  childTopologyTemplates: TopologyTemplate[] = [];

  levelGraphs: LevelGraph[];

  abstractionLevel: number;

  constructor(name: string) {
    super(name);
  }

}
