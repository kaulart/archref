import { Capability } from '../sharedmodel/capability';

import { Policy } from '../sharedmodel/policy';
import { PropertyConstraint } from '../sharedmodel/propertyconstraint';
import { Requirement } from '../sharedmodel/requirement';
import { NodeType } from './nodetype';
import { Property } from './property';
export class NodeTemplate {

  id: number;
  name: string;
  nodeType: NodeType;
  minInstances = 1;
  maxInstances = 1;
  properties: Property[] = [];
  propertyConstraints: PropertyConstraint[] = [];
  capabilities: Capability[] = [];
  requirements: Requirement[] = [];
  policies: Policy[] = [];
  // deploymentArtifacts: DeploymentArtifact[] = [];

  constructor(name: string, nodeType: NodeType) {
    this.name = name;
    this.nodeType = nodeType;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getMinInstances(): number {
    return this.minInstances;
  }

  public getMaxInstances(): number {
    return this.maxInstances;
  }

  public getProperties(): Property[] {
    return this.properties;
  }

  public getPropertyConstrains(): PropertyConstraint[] {
    return this.propertyConstraints;
  }

  public getRequirements(): Requirement[] {
    return this.requirements;
  }

  public getCapabilities(): Capability[] {
    return this.capabilities;
  }

  public getPolicies(): Policy[] {
    return this.policies;
  }

//  public getDeploymentArtifacts(): DeploymentArtifact[] {
//    return this.deploymentArtifacts;
//  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setMinInstances(minInstances: number) {
    this.minInstances = minInstances;
  }

  public setMaxInstances(maxInstances: number) {
    this.maxInstances = maxInstances;
  }

  public setProperties(properties: Property[]) {
    this.properties = properties;
  }

  public setPropertyConstrains(propertyConstraints: PropertyConstraint[]) {
    this.propertyConstraints = propertyConstraints;
  }

  public setRequirements(requirements: Requirement[]) {
    this.requirements = requirements;
  }

  public setCapabilities(capabilities: Capability[]) {
    this.capabilities = capabilities;
  }

  public setPolicies(policies: Policy[]) {
    this.policies = policies;
  }

//  public setDeploymentArtifacts(deploymentArtifacts: DeploymentArtifact[]) {
//    this.deploymentArtifacts = deploymentArtifacts;
//  }
}
