
import { Repository } from './repository';
export class RelationshipType {

       name: string;
       id: number = null;
   repositoryRelationshipType: Repository;

      constructor(name: string, repositoryRelationshipType: Repository) {
          this.name = name;
          this.repositoryRelationshipType = repositoryRelationshipType;
      }

}
