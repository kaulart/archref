import { Entity } from '../entity/entity';
import { Repository } from '../repository/repository';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - NodeType - NodeType inherited from Entity it is the type of a NodeTemplate or of a LevelGraphNode
 *
 * @superField - id: number - ID of the NodeType
 * @superField - name: string - Name of the NodeType
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeType
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeType
 * @superField - icon: String - URL of the icon for representation inherited from Entity
 *
 * @field - repository: Repository - Repository of the NodeType
 * @field - repositoryId: number - ID of the Repository of the NodeType
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class NodeType extends Entity {

  // default icon
  icon = '/assets/img/nodeTypeDefault.png';

  repositories: Repository[]=[];
  repositoryId: number;

  constructor() {
    super();
  }

}
