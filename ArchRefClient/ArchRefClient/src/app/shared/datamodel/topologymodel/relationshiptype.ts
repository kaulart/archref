
import { Repository } from '../repository';
import { Interface } from './interface';
import { NodeType } from './nodetype';
export class RelationshipType {

  name: string;
  id: number = null;
  targetnamespace: string;
  repositoryRelationshipType: Repository;
  abstractNodeType: boolean;
  finalNodeType: boolean;
  derivedFromRelationType: RelationshipType;
  validdSources: NodeType[];
  validTargets: NodeType[];
  // instancesStates: InstanceState[] = [];
  interfaces: Interface[] = [];

  constructor(name: string, repository: Repository) {
    this.name = name;
    this.repositoryRelationshipType = repository;
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
    return this.repositoryRelationshipType;
  }

  public getDerivedFromNodeType(): RelationshipType {
    return this.derivedFromRelationType;
  }

  public getAbstractNodeType(): boolean {
    return this.abstractNodeType;
  }

  public getFinalNodeType(): boolean {
    return this.finalNodeType;
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

  public setRepository(repositoryRelationshipType: Repository) {
    this.repositoryRelationshipType = repositoryRelationshipType;
  }

  public setDerivedFromRelationType(derivedFromRelationType: RelationshipType) {
    this.derivedFromRelationType = derivedFromRelationType;
  }

  public setAbstractNodeType(abstractNodeType: boolean) {
    this.abstractNodeType = abstractNodeType;
  }

  public setFinalNodeType(finalNodeType: boolean) {
    this.finalNodeType = finalNodeType;
  }

  public setInterfaces(interfaces: Interface[]) {
    this.interfaces = interfaces;
  }

//  public setInstanceStates(instanceStates: InstanceState[]) {
//    this.instancesStates = instanceStates;
//  }

}
