import { NodeType } from '../types/nodetype';
import { Node } from '../graph/node';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { RelationshipTemplate } from './relationshiptemplate';
import { TopologyTemplate } from './topologytemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - NodeTemplate - A node of a TopologyTemplate
 *
 * @Class Entity
 * @superField - id: number - ID of the NodeTemplate
 * @superField - name: string - Name of the NodeTemplate
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeTemplate
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeTemplate
 *
 * @Class Node
 * @superField - x: number - x Position of the left upper corner of a rectangle
 * @superField - y: number - y Position of the left upper corner of a rectangle
 * @superField - width: number - Width of the rectangle
 * @superField - height: number - Height of the rectangle
 *
 * @field - levelGraphNode: LevelGraphNode - LevelGraphNode from which the NodeTemplate was created
 * @field - levelGraphNodeId: number - ID of the LevelGraphNode from which the NodeTemplate was created
 * @field - nodeType: NodeType - NodeType of the NodeTemplate
 * @field - nodeTypeId: number - ID of NodeType of the NodeTemplate
 * @field - inRelationshipTemplates: RelationshipTemplate[] - Array of all outgoing and incoming RelationshipTemplates of the NodeTemplate
 * @field - outRelationshipTemplates: RelationshipTemplate[] - Array of all outgoing and incoming RelationshipTemplates of the NodeTemplate
 * @field - topologyTemplate: TopologyTemplate - TopologyTemplate of the NodeTemplate
 * @field - topologyTemplateId: number - ID of TopologyTemplate of the NodeTemplate
 * @field - abstractionLevel: number - Level of abstraction of the NodeTemplate
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

  abstractionLevel: number;

  constructor() {
    super();
  }

}
