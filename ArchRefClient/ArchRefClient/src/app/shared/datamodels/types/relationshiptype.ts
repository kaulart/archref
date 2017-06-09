import { Entity } from '../entity/entity';
import { Repository } from '../repository';

export class RelationshipType extends Entity {

  icon = '/assets/img/relationTypeDefault.png';

  repository: Repository;
  repositoryId: number;

  constructor(name: string, repositoryId: number) {
    super(name);
    this.repositoryId = repositoryId;
  }

}
