import { ConstraintType } from './constrainttype';
import { RequirementType } from './requirementtype';
export class RequirementDefinition {

  id: number;
  name: string;
  requirementType: RequirementType;
  loweBound: number;
  upperBound: number;
  constraints: ConstraintType[];

  constructor(name: string, requirementType: RequirementType) {
    this.name = name;
    this.requirementType = requirementType;
  };

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRequirementType(): RequirementType {
    return this.requirementType;
  }

  public getLowerBound(): number {
    return this.loweBound;
  }

  public getUpperBound(): number {
    return this.upperBound;
  }

  public getConstraints(): ConstraintType[] {
    return this.constraints;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRequirementType(requirementType: RequirementType) {
    this.requirementType = requirementType;
  }

  public setLowerBound(lowerBound: number) {
    return this.loweBound;
  }

  public setUpperBound(upperBound: number) {
    return this.upperBound;
  }

  public setConstraints(constraints: ConstraintType[]) {
    return this.constraints = constraints;
  }

}
