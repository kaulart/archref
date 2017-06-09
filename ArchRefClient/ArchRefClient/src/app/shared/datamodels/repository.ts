import { Entity } from './entity/entity';
import { NodeType } from './types/nodetype';
import { RelationshipType } from './types/relationshiptype';

export class Repository extends Entity {

  nodeTypeList: NodeType[] = [];
  relationshipTypeList: RelationshipType[] = [];

  constructor(name: string) {
    super(name);
  }

}
