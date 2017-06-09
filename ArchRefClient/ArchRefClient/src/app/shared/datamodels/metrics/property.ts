import { Entity } from '../entity/entity';
import { LevelGraphNode } from '../levelgraph/levelgraphnode';
import { NodeTemplate } from '../topology/nodetemplate';
import { NodeType } from '../types/nodetype';
import { RelationshipTemplate } from '../topology/relationshiptemplate';
import { RelationshipType } from '../types/relationshiptype';

/*******************************************************************************************************************************************************************************************************
 *
 * Property Data Model
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Property {

  id: number = null;
  name: string;
  value: string;

  entity: Entity;
  nodeType: NodeType;
  relationshipType: RelationshipType;
  //fragmentNode: FragmentNode;
  nodeTemplate: NodeTemplate;
  rlationshipTemplate: RelationshipTemplate;
  levelGraphNode: LevelGraphNode;

  //  propertyConstraintType: PropertyConstraintType;
  //  constrainValues: string[];

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
