import { Entity } from '../entity/entity';


/*******************************************************************************************************************************************************************************************************
 *
 * @data RelationshipTypeFragment - RelationshipTypeFragment inherited from Entity is a special Type of a LevelGraphNode which is used for refinement it points to a collection of
 *                                  RelationshipTypes and NodeTypes
 *
 * Entity
 * @superFields - id: number - ID of the RelationshipTypeFragment
 * @superFields - name: string - Name of the RelationshipTypeFragment
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the RelationshipTypeFragment
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the RelationshipTypeFragment
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class RelationshipTypeFragment extends Entity {

  constructor() {
    super();
  }

}
