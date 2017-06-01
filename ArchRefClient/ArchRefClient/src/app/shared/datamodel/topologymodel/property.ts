import { FragmentNode } from '../levelgraphmodel/fragmentnode';
import { LevelGraphNode } from '../levelgraphmodel/levelgraphnode';
import { NodeTemplate } from './nodetemplate';
import { NodeType } from './nodetype';
import { RelationshipTemplate } from './relationshiptemplate';
import { RelationshipType } from './relationshiptype';
export class Property {

  id: number = null;
  name: string;
  value: string;

  nodeType: NodeType;
  relationshipType: RelationshipType;
  fragmentNode: FragmentNode;
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
