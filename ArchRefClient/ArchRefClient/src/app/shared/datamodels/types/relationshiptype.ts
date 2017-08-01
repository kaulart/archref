import { Entity } from '../entity/entity';
import { Repository } from '../repository/repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - RelationshipType - RelationshipType inherited from Entity it is the type of a RelationshipTemplate or of a LevelGraphNode
 *
 * Entity
 * @superField - id: number - ID of the RelationshipType
 * @superField - name: string - Name of the RelationshipType
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the RelationshipType
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the RelationshipType
 * @superField - icon: String - Path of the icon for representation inherited from Entity
 *
 * @field - repository: Repository - Repository of the RelationshipType
 * @field - repositoryId: number - ID of the Repository of the RelationshipType
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipType extends Entity {

  // default icon
  icon = '/assets/img/relationTypeDefault.png';

  repositories: Repository[];
  repositoryId: number;

  constructor() {
    super();
  }

}
