/**
 * TopologyTemplate is a Collection of NodeTemplates and RelationshipTemplates
 *
 * @author Arthur Kaul
 *
 */
import { LevelGraph } from '../levelgraphmodel/levelgraph';
import { NodeTemplate } from './nodetemplate';
import { RelationshipTemplate } from './relationshiptemplate';

export class TopologyTemplate {

  private id: number;
  private name: string;
  private nodeTemplates: NodeTemplate[];
  private relationshipTemplates: RelationshipTemplate[];

  parentTopologyTemplate: TopologyTemplate;
  childTopologyTemplates: TopologyTemplate[];

  constructor(name) {
    this.name = name;
    this.nodeTemplates = [];
    this.relationshipTemplates = [];
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
