import { Entity } from '../entity/entity';

/*******************************************************************************************************************************************************************************************************
 *
 * Property Data Model
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Property extends Entity {

  value: string;

  entityExpected: Entity;
  entityExpectedId: number;

  entityProvided: Entity;
  entityProvidedId: number;

  constructor(name: string, value: string) {
    super(name);
    this.value = value;
  }
}
