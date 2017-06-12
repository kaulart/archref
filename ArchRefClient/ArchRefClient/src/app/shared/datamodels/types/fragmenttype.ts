import { Entity } from '../entity/entity';

/*******************************************************************************************************************************************************************************************************
 *
 * @data FragmentType - FragmentType inherited from Entity it is a specific type of a LevelGraphNode
 *
 * @field id: number - ID of the NodeType inherited from Entity
 * @field name: name - Name of the Repository inherited from Entity
 * @field icon: String - Path of the icon for representation inherited from Entity
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class FragmentType extends Entity {

  constructor(name: string) {
    super(name);
  }

}
