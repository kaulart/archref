import { Entity } from '../entity/entity';
import { Repository } from '../repository/repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @data NodeType - NodeType inherited from Entity it is the Type of a NodeTemplate or of a LevelGraphNode
 *
 * Entity
 * @superFields - id: number - ID of the NodeType
 * @superFields - name: string - Name of the NodeType
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeType
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeType
 * @superFields icon: String - Path of the icon for representation inherited from Entity
 *
 * @field repository: Repository - Repository of the NodeType
 * @field repositoryId: number - ID of the Repository of the NodeType
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class NodeType extends Entity {

  // default icon
  icon = '/assets/img/nodeTypeDefault.png';

  repository: Repository;
  repositoryId: number;

  constructor() {
    super();
  }

}
