import { Relation } from '../graph/relation';
import { Path } from '../path';
import { NodeTemplate } from './nodetemplate';
import { RelationshipType } from '../types/relationshiptype';
import { TopologyTemplate } from './topologytemplate';

export class RelationshipTemplate extends Relation {

  relationshipType: RelationshipType;
  relationshipTypeId: number;

  sourceElement: NodeTemplate;
  targetElement: NodeTemplate;

  topologyTemplate: TopologyTemplate;
  topologyTemplateId: number;

  constructor(name: string, sourceNodeId: number, targetNodeId: number, path: Path, relationshipTypeId: number, topologyTemplateId: number) {
    super(name, sourceNodeId, targetNodeId, path);
    this.relationshipTypeId = relationshipTypeId;
  }

}
