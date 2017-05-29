import { NodeTemplate } from './nodetemplate';
import { Property } from './property';
import { RelationshipType } from './relationshiptype';
export class RelationshipTemplate {

  id: number = null;
  name: string;
  relationType: RelationshipType;

  expectedProperties: Property[] = [];

  sourceElement: NodeTemplate;
  targetElement: NodeTemplate;

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

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

}
