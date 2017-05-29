import { PropertyConstraintType } from './propertyconstraint';
export class Property {

  id: number;
  name: string;
  value: string;
  propertyConstraintType: PropertyConstraintType;
  constrainValues: string[];

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
