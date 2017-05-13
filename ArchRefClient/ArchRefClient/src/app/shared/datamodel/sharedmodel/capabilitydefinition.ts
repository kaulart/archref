import { CapabilityType } from './capabilitytype';
import { ConstraintType } from './constrainttype';
export class CapabilityDefinition {

  id: number;
  name: string;
  capabilityType: CapabilityType;
  loweBound: number;
  upperBound: number;
  constraints: ConstraintType[];

  constructor(name: string, capabilityType: CapabilityType) {
    this.name = name;
    this.capabilityType = capabilityType;
  };

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRequirementType(): CapabilityType {
    return this.capabilityType;
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

  public setCapabilityType(capabilityType: CapabilityType) {
    this.capabilityType = capabilityType;
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
