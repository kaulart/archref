import { Entity } from '../entity/entity';
import { Property } from './property';

export class ExpectedProperty extends Property {

  entityExpected: Entity;
  entityExpectedId: number;

  constructor(name: string, value: string) {
    super(name, value);
  }

}
