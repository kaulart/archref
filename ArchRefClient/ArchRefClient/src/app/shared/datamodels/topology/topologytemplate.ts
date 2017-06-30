import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - TopologyTemplate -  TopologyTemplate Model is used for model a abstract or specific system architecture
 *
 * @field - id: number - ID of the TopologyTemplate
 * @field - name: string - Name of the TopologyTemplate
 * @field - nodeTemplates: NodeTemplate[] - Array of all NodeTemplates in the LevelGraph
 * @field - relationshipTemplates: RelationshipTemplate[] - Array of all RelationshipTemplates in the LevelGraph
 * @field - parentTopologyTemplate: TopologyTemplate - Parent of the TopologyTemplate from which it was derived
 * @field - parentTopologyTemplateId: number - ID of the parent of the topology
 * @field - childTopologyTemplates: TopologyTemplate[] - Array of child of the TopologyTemplate. Child are all TopologyTemplate which are generated through the refinement from this topology
 * @field - abstractionLevel: number : Level is calculated from the Root Topology
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class TopologyTemplate {

  id: number;
  name: string;

  nodeTemplates: NodeTemplate[];
  relationshipTemplates: RelationshipTemplate[];

  parentTopologyTemplate: TopologyTemplate;
  parentTopologyTemplateId: number;
  childTopologyTemplates: TopologyTemplate[];

  abstractionLevel: number;

  constructor() {
    this.id = null;
    this.name = 'Unnamed';
    this.nodeTemplates = [];
    this.relationshipTemplates = [];
    this.childTopologyTemplates = [];
  }

}
