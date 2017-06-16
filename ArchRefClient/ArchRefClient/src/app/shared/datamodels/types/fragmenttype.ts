import { Entity } from '../entity/entity';

/*******************************************************************************************************************************************************************************************************
 *
 * @data FragmentType - FragmentType inherited from Entity it is a specific type of a LevelGraphNode
 *
 * Entity
 * @superFields - id: number - ID of the FragmentType
 * @superFields - name: string - Name of the FragmentType
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the FragmentType
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the FragmentType
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class FragmentType extends Entity {

  constructor() {
    super();
  }

}
