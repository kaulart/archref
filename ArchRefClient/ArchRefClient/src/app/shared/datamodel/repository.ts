import { NodeType } from './topologymodel/nodetype';
import { RelationshipType } from './topologymodel/relationshiptype';

export class Repository {

  name: string;
  id: number;

  nodeTypeList: NodeType[] = [];
  relationshipTypeList: RelationshipType[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getId() {
    return this.id;
  }

}
