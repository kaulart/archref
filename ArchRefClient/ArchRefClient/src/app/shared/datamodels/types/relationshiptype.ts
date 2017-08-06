import { Entity } from '../entity/entity';
import { Repository } from '../repository/repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - RelationshipType - RelationshipType inherited from Entity it is the type of a RelationshipTemplate or of a LevelGraphNode
 *
 * @field - repository: Repository - Repository of the RelationshipType
 * @field - repositoryId: string - ID of the Repository of the RelationshipType
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipType extends Entity {

  // default icon
  icon = '/assets/img/relationTypeDefault.png';

  repository: Repository;
  repositoryId: string;

  constructor() {
    super();
  }

}
