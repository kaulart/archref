import { NodeType } from '../types/nodetype';
import { Node } from '../graph/node';
import { RelationshipTemplate } from './relationshiptemplate';
import { TopologyTemplate } from './topologytemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * NodeTemplate Data Model
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class NodeTemplate extends Node {

  nodeType: NodeType;
  nodeTypeId: number;

  inRelationshipTemplates: RelationshipTemplate[] = [];
  outRelationsipTemplates: RelationshipTemplate[] = [];

  topologyTemplate: TopologyTemplate;
  topologyTemplateId: number;

  constructor(name: string, x: number, y: number, width: number, height: number, nodeTypeId: number, topologyTemplateId: number) {
    super(name, x, y, width, height);
    this.nodeTypeId = nodeTypeId;
  }

}
