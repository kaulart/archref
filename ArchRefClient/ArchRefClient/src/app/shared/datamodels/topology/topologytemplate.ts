import { LevelGraph } from '../levelgraph/levelgraph';
import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - TopologyTemplate Data Model - TopologyTemplate Model is used for model a system architecture
 *
 * @fields - id: number - ID of the TopologyTemplate
 * @fields - name: string - Name of the TopologyTemplate
 * @fields - nodeTemplates: NodeTemplate[] - Array of all NodeTemplates in the LevelGraph
 * @fields - relationshipTemplates: RelationshipTemplate[] - Array of all RelationshipTemplates in the LevelGraph
 * @fields - parentTopologyTemplate: TopologyTemplate - Parent of the TopologyTemplate from which it was derived
 * @fields - parentTopologyTemplateId: number - ID of the parent of the topology
 * @fields - childTopologyTemplates: TopologyTemplate - Child of the TopologyTemplate are all TopologyTemplate which are generated through the refinement from this topology
 * @fields - levelGraphs: LevelGraph[] - Array of all LevelGraphs which were used to create or generated the TopologyTemplate
 * @fields - abstractionLevel: number : Level is calculated from the Root Topology
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

  levelGraphs: LevelGraph[];

  abstractionLevel: number;

  constructor() {
    this.id = null;
    this.name = 'Unnamed';
    this.nodeTemplates = [];
    this.relationshipTemplates = [];
    this.childTopologyTemplates = [];
    this.levelGraphs = [];
  }

  isSingleLevelGraphLevelKonform() {
    // TODO
  }

  isSingleLevelGraphKonform() {
    // TODO
  }

  isMultiLevelGraphLevelKonform() {
    // TODO
  }

  isMultiLevelGraphKonform() {
    // TODO
  }

}
