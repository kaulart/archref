import { Property } from '../topologymodel/property';
import { ConstraintType } from './constrainttype';
export class PropertyConstraint {

  id: number;
  name: string;
  property: Property;
  contraintType: ConstraintType;

  constructor(property: Property, constraintType: ConstraintType) {
    this.property = property;
    this.contraintType = constraintType;
  }

  public getProperty(): Property {
    return this.getProperty;
  }

  public getConstraintType(): ConstraintType {
    return this.contraintType;
  }

  public setProperty(property: Property): void {
    this.property = property;
  }

  public setConstraintType(constraintType: ConstraintType): void {
    this.contraintType = constraintType;
  }

}
