import { Entity } from '../entity/entity';

/*******************************************************************************************************************************************************************************************************
 *
 * @data NodeTypeFragment - NodeTypeFragment inherited from Entity is a special Type of a LevelGraphNode which is used for refinement it points to a sub of
 *                          RelationshipTypes and NodeTypes
 *
 * Entity
 * @superFields - id: number - ID of the NodeTypeFragment
 * @superFields - name: string - Name of the NodeTypeFragment
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeTypeFragment
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeTypeFragment
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class NodeTypeFragment extends Entity {

  constructor() {
    super();
  }

}
