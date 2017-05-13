/**
 * TopologyTemplate is a Collection of NodeTemplates and RelationshipTemplates
 *
 * @author Arthur Kaul
 *
 */
import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';
export class TopologyTemplate {

  id: number;
  name: string;
  nodeTemplates: NodeTemplate[] = [];
  relationshipTemplates: RelationshipTemplate[] = [];

  constructor(name) {
    this.name = name;
  }

  /**
   *
   *  Getter for TopologyTemplate
   *
   */
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNodeTemplates(): NodeTemplate[] {
    return this.nodeTemplates;
  }

  public getRelationshipTemplates(): RelationshipTemplate[] {
    return this.relationshipTemplates;
  }

  public getNodeTemplate(): NodeTemplate {
    //TODO
    return null;
  }

  public getRelationshipTemplate(): RelationshipTemplate {
    //TODO
    return null;
  }

  /**
   *
   * Setter for TopologyTemplate
   *
   */
  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setNodeTemplates(nodeTemplates: NodeTemplate[]) {
    this.nodeTemplates = nodeTemplates;
  }

  public setRelationshipTemplates(relationshipTemplates: RelationshipTemplate[]) {
    this.relationshipTemplates = relationshipTemplates;
  }

  public addNodeTemplate(nodeTemplate: NodeTemplate) {
    this.nodeTemplates.push(nodeTemplate);
  }

  public addRelationshipTemplate(relationshipTemplate: RelationshipTemplate) {
    this.relationshipTemplates.push(relationshipTemplate);
  }

}
