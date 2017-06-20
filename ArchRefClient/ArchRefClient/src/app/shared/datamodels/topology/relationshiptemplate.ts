import { Relation } from '../graph/relation';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { Path } from '../utility/path';
import { NodeTemplate } from './nodetemplate';
import { RelationshipType } from '../types/relationshiptype';
import { TopologyTemplate } from './topologytemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - RelationshipTemplate Data Model - A relation of a RelationshipTemplate
 *
 * @Entity
 * @superFields - id: number - ID of the RelationshipTemplate
 * @superFields - name: string - Name of the RelationshipTemplate
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the RelationshipTemplate
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the RelationshipTemplate
 *
 * @Relation
 * @superFields - sourceNodeId: number - ID of the Source Node of RelationshipTemplate
 * @superFields - targetNodeId: number - ID of the Target Node of RelationshipTemplate
 * @superFields - path: Path - Path of the line from source node to target node
 *
 * @fields - levelGraphNode: LevelGraphNode - LevelGraph Node from which this RelationshipTemplate is derived
 * @fields - levelGraphNodeId: number - ID of the LevelGraph Node form which the RelationshipTemplate is derived
 * @fields - relationshipType: RelationshipType - RelationshipType of the RelationshipTemplate
 * @fields - relationshipTypeId: number - ID of the RelationshipType
 * @fields - sourceNodeTemplate: NodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @fields - targetNodeTemplate: NodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @fields - topologyTemplate: TopologyTemplate - TopologyTemplate of the RelationshipTemplate
 * @fields - topologyTemplateId: number - ID of the TopologyTemplate
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipTemplate extends Relation {

  levelGraphNode: LevelGraphNode;
  levelGraphNodeId: number;

  relationshipType: RelationshipType;
  relationshipTypeId: number;

  sourceNodeTemplate: NodeTemplate;
  targetNodeTemplate: NodeTemplate;

  topologyTemplate: TopologyTemplate;
  topologyTemplateId: number;

  constructor(sourceNodeId: number, targetNodeId: number, path: Path, relationshipTypeId: number, topologyTemplateId: number) {
    super(sourceNodeId, targetNodeId, path);
    this.relationshipTypeId = relationshipTypeId;
    this.topologyTemplateId = topologyTemplateId;
  }

}
