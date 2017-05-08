
import { NodeType } from './nodetype';
import { RelationshipType } from './relationshiptype';
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

  public getNodeTypeList() {
    return this.nodeTypeList;
  }

  public getRelatioshipTypeList() {
     return this.relationshipTypeList;
  }

}
