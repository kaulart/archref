import { NodeType } from '../types/nodetype';
import { RelationshipType } from '../types/relationshiptype';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Repository - Collection of NodeTypes and RelationshipTypes
 *
 * @field - id: number - ID of the Repository
 * @field - name: name - Name of the Repository
 * @field - nodeTypeList: NodeTypeList[] - Array of the NodeTypes in the Repository
 * @field - relationshipType: RelationshipType[] - Array of the RelationshipTypes in the Repository
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Repository {

  id: number = null;
  name: string;
  nodeTypeList: NodeType[];
  relationshipTypeList: RelationshipType[];

  constructor() {
    this.id = null;
    this.name = 'Unnamed';
    this.nodeTypeList = [];
    this.relationshipTypeList = [];
  }

}
