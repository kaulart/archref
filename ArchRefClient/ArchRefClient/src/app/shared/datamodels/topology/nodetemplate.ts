import { NodeType } from '../types/nodetype';
import { Node } from '../graph/node';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { RelationshipTemplate } from './relationshiptemplate';
import { TopologyTemplate } from './topologytemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - NodeTemplate Data Model - A node of a TopologyTemplate
 *
 * @Entity
 * @superFields - id: number - ID of the NodeTemplate
 * @superFields - name: string - Name of the NodeTemplate
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeTemplate
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeTemplate
 *
 * @Node
 * @superFields - x: number - x Position of the left upper corner of a rectangle
 * @superFields - y: number - y Position of the left upper corner of a rectangle
 * @superFields - width: number - Width of the rectangle
 * @superFields - height: number - Height of the rectangle
 *
 * @fields - levelGraphNode: LevelGraphNode - LevelGraphNode from which the NodeTemplate was created
 * @fields - levelGraphNodeId: number - ID of the LevelGraphNode from which the NodeTemplate was created
 * @fields - nodeType: NodeType - NodeType of the NodeTemplate
 * @fields - nodeTypeId: number - ID of NodeType of the NodeTemplate
 * @fields - inRelationshipTemplates: RelationshipTemplate[] - Array of all outgoing and incoming RelationshipTemplates of the NodeTemplate
 * @fields - outRelationshipTemplates: RelationshipTemplate[] - Array of all outgoing and incoming RelationshipTemplates of the NodeTemplate
 * @fields - topologyTemplate: TopologyTemplate - TopologyTemplate of the NodeTemplate
 * @fields - topologyTemplateId: number - ID of TopologyTemplate of the NodeTemplate
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class NodeTemplate extends Node {

  levelGraphNode: LevelGraphNode;
  levelGraphNodeId: number;

  nodeType: NodeType;
  nodeTypeId: number;

  inRelationshipTemplates: RelationshipTemplate[] = [];
  outRelationshipTemplates: RelationshipTemplate[] = [];

  topologyTemplate: TopologyTemplate;
  topologyTemplateId: number;

  constructor(x: number, y: number, width: number, height: number, nodeTypeId: number, topologyTemplateId: number) {
    super(x, y, width, height);
    this.nodeTypeId = nodeTypeId;
    this.topologyTemplateId = topologyTemplateId;
  }

}
