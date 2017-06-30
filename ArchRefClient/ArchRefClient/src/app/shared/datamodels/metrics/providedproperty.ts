import { Entity } from '../entity/entity';
import { Property } from './property';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - ProvidedProperty - ProvidedProperties are name value pairs which are provided through the owner. Inherited from Property
 *
 * @superclass - Property
 * @superField - id: number - Id of the Property
 * @superField - name: string - Name of the Property
 * @superField - value: string - Value of the Property
 *
 * @field - entityProvided: Entity - owner of the Property
 * @field - entityProvidedId: number - ID of the owner of the Property
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class ProvidedProperty extends Property {

  entityProvided: Entity;
  entityProvidedId: number;

  constructor(name: string, value: string) {
    super(name, value);
  }
}
