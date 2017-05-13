import { Property } from '../topologymodel/property';
import { PropertyConstraint } from './propertyconstraint';
import { RequirementType } from './requirementtype';


export class Requirement {
  id: number;
  name: string;
  requirementType: RequirementType;
  properties: Property[] = [];
  propertyConstraints: PropertyConstraint[] = [];

  constructor(name: string, requirementType: RequirementType) {
    this.name = name;
    this.requirementType = requirementType;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getProperties(): Property[] {
    return this.properties;
  }

  public getRequirementType(): RequirementType {
    return this.requirementType;
  }

  public getPropertyConstraints(): PropertyConstraint[] {
    return this.propertyConstraints;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setProperties(properties: Property[]) {
    this.properties = properties;
  }

  public setRequirementType(requirementType: RequirementType[]) {
    this.requirementType = RequirementType;
  }

  public setPropertyConstraints(propertyConstraints: PropertyConstraint[]) {
    this.propertyConstraints = propertyConstraints;
  }

}
