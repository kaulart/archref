import { Entity } from '../entity/entity';
import { Repository } from '../repository';

export class NodeType extends Entity {

  icon = '/assets/img/nodeTypeDefault.png';

  repository: Repository;
  repositoryId: number;

  constructor(name: string, repositoryId: number) {
    super(name);
    this.repositoryId = repositoryId;
  }

}
