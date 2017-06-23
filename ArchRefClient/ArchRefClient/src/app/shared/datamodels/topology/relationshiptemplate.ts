import { Relation } from '../graph/relation';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { Path } from '../utility/path';
import { NodeTemplate } from './nodetemplate';
import { RelationshipType } from '../types/relationshiptype';
import { TopologyTemplate } from './topologytemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - RelationshipTemplate - A relation between two NodeTemplates
 *
 * @Class Entity
 * @superField - id: number - ID of the RelationshipTemplate
 * @superField - name: string - Name of the RelationshipTemplate
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the RelationshipTemplate
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the RelationshipTemplate
 *
 * @Class Relation
 * @superField - sourceNodeId: number - ID of the Source Node of RelationshipTemplate
 * @superField - targetNodeId: number - ID of the Target Node of RelationshipTemplate
 * @superField - path: Path - Path of the line from source node to target node
 *
 * @field - levelGraphNode: LevelGraphNode - LevelGraph Node from which this RelationshipTemplate is derived
 * @field - levelGraphNodeId: number - ID of the LevelGraph Node form which the RelationshipTemplate is derived
 * @field - relationshipType: RelationshipType - RelationshipType of the RelationshipTemplate
 * @field - relationshipTypeId: number - ID of the RelationshipType
 * @field - sourceNodeTemplate: NodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @field - targetNodeTemplate: NodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @field - topologyTemplate: TopologyTemplate - TopologyTemplate of the RelationshipTemplate
 * @field - topologyTemplateId: number - ID of the TopologyTemplate
 * @field - abstractionLevel: number - Level of abstraction of the RelationshipTemplate
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

  abstractionLevel: number;

  constructor(sourceNodeId: number, targetNodeId: number, path: Path, relationshipTypeId: number, topologyTemplateId: number) {
    super(sourceNodeId, targetNodeId, path);
    this.relationshipTypeId = relationshipTypeId;
    this.topologyTemplateId = topologyTemplateId;
  }

}
