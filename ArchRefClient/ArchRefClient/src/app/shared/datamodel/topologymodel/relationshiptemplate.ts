import { PropertyConstraint } from '../sharedmodel/propertyconstraint';
import { RelationshipConstraints } from '../sharedmodel/relationshipconstraints';
import { NodeTemplate } from './nodetemplate';
import { Property } from './property';
import { RelationshipType } from './relationshiptype';
export class RelationshipTemplate {

  id: number;
  name: string;
  relationType: RelationshipType;

  properties: Property[] = [];
  propertyConstraints: PropertyConstraint[] = [];
  sourceElement: NodeTemplate;
  targetElement: NodeTemplate;
  relationshipConstraints: RelationshipConstraints[] = [];

  constructor(name: string, relationType: RelationshipType) {
    this.name = name;
    this.relationType = relationType;
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

  public getPropertyConstrains(): PropertyConstraint[] {
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

  public setPropertyConstrains(propertyConstraints: PropertyConstraint[]) {
    this.propertyConstraints = propertyConstraints;
  }

}
