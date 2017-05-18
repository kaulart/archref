
import { LevelGraphNode } from '../levelgraphmodel/levelgraphnode';
import { Repository } from '../repository';
import { CapabilityDefinition } from '../sharedmodel/capabilitydefinition';
import { RequirementDefinition } from '../sharedmodel/requirementdefinition';
import { Interface } from './interface';
export class NodeType {

  name: string;
  id: number = null;
  targetnamespace: string;
  repositoryNodeType: Repository;
  abstractNodeType: boolean;
  finalNodeType: boolean;
  derivedFromNodeType: NodeType;
  requirementDefinitions: RequirementDefinition[] = [];
  capabilityDefinitions: CapabilityDefinition[] = [];
  //instancesStates: InstanceState[] = [];
  interfaces: Interface[] = [];

  constructor(name: string, repositoryNodeType: Repository) {
    this.name = name;
    this.repositoryNodeType = repositoryNodeType;
  }
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTargetNamespace(): string {
    return this.targetnamespace;
  }

  public getRepository(): Repository {
    return this.repositoryNodeType;
  }

  public getDerivedFromNodeType(): NodeType {
    return this.derivedFromNodeType;
  }

  public getAbstractNodeType(): boolean {
    return this.abstractNodeType;
  }

  public getFinalNodeType(): boolean {
    return this.finalNodeType;
  }

  public getRequirementsDefinitions(): RequirementDefinition[] {
    return this.requirementDefinitions;
  }

  public getCapabiliyDefinitions(): CapabilityDefinition[] {
    return this.capabilityDefinitions;
  }

  public getInterfaces(): Interface[] {
    return this.interfaces;
  }

//  public getInstanceStates(): InstanceState[] {
//    return this.instancesStates;
//  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setTargetNamespace(targetNamespace: string) {
    this.targetnamespace = targetNamespace;
  }

  public setRepository(repository: Repository) {
    this.repositoryNodeType = repository;
  }

  public setDerivedFromNodeType(derivedFrom: NodeType) {
    this.derivedFromNodeType = derivedFrom;
  }

  public setAbstractNodeType(abstractNodeType: boolean) {
    this.abstractNodeType = abstractNodeType;
  }

  public setFinalNodeType(finalNodeType: boolean) {
    this.finalNodeType = finalNodeType;
  }

  public setRequirementsDefinitions(requirementsDefinitions: RequirementDefinition[]) {
    this.requirementDefinitions = requirementsDefinitions;
  }

  public setCapabiliyDefinitions(capabilityDefinitions: CapabilityDefinition[]) {
    this.capabilityDefinitions = capabilityDefinitions;
  }

  public setInterfaces(interfaces: Interface[]) {
    this.interfaces = interfaces;
  }

//  public setInstanceStates(instanceStates: InstanceState[]) {
//    this.instancesStates = instanceStates;
//  }

}
