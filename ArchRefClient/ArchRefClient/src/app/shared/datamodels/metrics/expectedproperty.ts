import { Entity } from '../entity/entity';
import { Property } from './property';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - ExpectedProperty Data Model - ExpectedProperties are name value pairs which should be fulfilled by a specific kind of the owner
 *
 * @Property
 * @superField - id: number - Id of the ExpectedProperty
 * @superField - name: string - Name of the ExpectedProperty
 * @superField - value: string - Value of the ExpectedProperty
 *
 * @field - entityProvided: Entity - owner of the ExpectedProperty
 * @field - entityProvidedId: number - ID of the owner of the ExpectedProperty
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class ExpectedProperty extends Property {

  entityExpected: Entity;
  entityExpectedId: number;

  constructor(name: string, value: string) {
    super(name, value);
  }

}
