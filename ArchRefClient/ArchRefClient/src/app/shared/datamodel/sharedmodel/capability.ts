import { Property } from '../topologymodel/property';
import { CapabilityType } from './capabilitytype';
import { PropertyConstraint } from './propertyconstraint';

export class Capability {
  id: number;
  name: string;
  capabilityType: CapabilityType;
  properties: Property[] = [];
  propertyConstraints: PropertyConstraint[] = [];

  constructor(name: string, capabilityType: CapabilityType) {
    this.name = name;
    this.capabilityType = capabilityType;
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

  public getCapabilityType(): CapabilityType {
    return this.capabilityType;
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

  public setCapabilityType(capabilityType: CapabilityType[]) {
    this.capabilityType = CapabilityType;
  }

  public setPropertyConstraints(propertyConstraints: PropertyConstraint[]) {
    this.propertyConstraints = propertyConstraints;
  }
}
