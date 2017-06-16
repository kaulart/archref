import { Entity } from '../entity/entity';
import { Repository } from '../repository/repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @data RelationshipType - RelationshipType inherited from Entity it is the Type of a RelationshipTemplate or of a LevelGraphNode
 *
 * Entity
 * @superFields - id: number - ID of the RelationshipType
 * @superFields - name: string - Name of the RelationshipType
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the RelationshipType
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the RelationshipType
 * @superFields icon: String - Path of the icon for representation inherited from Entity
 *
 * @field repository: Repository - Repository of the RelationshipType
 * @field repositoryId: number - ID of the Repository of the RelationshipType
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipType extends Entity {

  // default icon
  icon = '/assets/img/relationTypeDefault.png';

  repository: Repository;
  repositoryId: number;

  constructor() {
    super();
  }

}
