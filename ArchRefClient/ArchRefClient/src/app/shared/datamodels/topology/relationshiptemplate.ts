import { Relation } from '../graph/relation';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { Path } from '../utility/path';
import { NodeTemplate } from './nodetemplate';
import { RelationshipType } from '../types/relationshiptype';
import { TopologyTemplate } from './topologytemplate';

export class RelationshipTemplate extends Relation {

  levelGraphNode: LevelGraphNode;
  levelGraphNodeId: number;

  relationshipType: RelationshipType;
  relationshipTypeId: number;

  nodeTemplates: NodeTemplate[] = [];

  topologyTemplate: TopologyTemplate;
  topologyTemplateId: number;

  constructor(name: string, sourceNodeId: number, targetNodeId: number, path: Path, relationshipTypeId: number, topologyTemplateId: number) {
    super(name, sourceNodeId, targetNodeId, path);
    this.relationshipTypeId = relationshipTypeId;
    this.topologyTemplateId = topologyTemplateId;
  }

}
