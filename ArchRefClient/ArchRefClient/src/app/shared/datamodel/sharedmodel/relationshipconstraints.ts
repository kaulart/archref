import { ConstraintType } from './constrainttype';

export class RelationshipConstraints {
  id: number;
  name: string;
  contraintType: ConstraintType;

  constructor(constraintType: ConstraintType) {
    this.contraintType = constraintType;
  }

  public getConstraintType(): ConstraintType {
    return this.contraintType;
  }

  public setConstraintType(constraintType: ConstraintType): void {
    this.contraintType = constraintType;
  }
}
