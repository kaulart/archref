import { Entity } from '../entity/entity';
import { Repository } from '../repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @data RelationshipType - RelationshipType inherited from Entity it is the Type of a RelationshipTemplate or of a LevelGraphNode
 *
 * @field id: number - ID of the NodeType inherited from Entity
 * @field name: name - Name of the Repository inherited from Entity
 * @field repository: Repository - Repository of the NodeType
 * @field repositoryId: number - ID of the Repository of the NodeType
 * @field expectedProperties: Property[] - Array of expected properties inherited from Entity
 * @field providedProperties: Property[] - Array of provided properties inherited from Entity
 * @field icon: String - Path of the icon for representation inherited from Entity
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipType extends Entity {

  // default icon
  icon = '/assets/img/relationTypeDefault.png';

  repository: Repository;
  repositoryId: number;

  constructor(name: string, repositoryId: number) {
    super(name);
    this.repositoryId = repositoryId;
  }

}
