
import { Repository } from './repository';
export class NodeType {

              name: string;
                id: number = null;
        repositoryNodeType: Repository;

      constructor(name: string, repositoryNodeType: Repository) {
          this.name = name;
          this.repositoryNodeType = repositoryNodeType;
      }
}
