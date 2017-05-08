import { CapabilityType } from './capabilitytype';
import { DeploymentArtifact } from './deploymentartifact';
import { InstanceState } from './instancestate';
import { Interface } from './interface';
import { NodeType } from './nodetype';
import { Policy } from './policy';
import { RequirementType } from './requirementtype';

export class RelationType {

      iconPath: string;
      sourceInterfaces: Interface[];
      targetInterfaces: Interface[];
      private name: string;
      private id: string;
      isAbstractNodeType: boolean;
      isFinalNodeType: boolean;
      instanceStates: InstanceState[];
      derivedFrom: string;
      policies: Policy[];
      deploymentArtifacts: DeploymentArtifact[];
      validSourceNodeType: NodeType;
      validTargeNodeType: NodeType;
      validTargetCapabilityType: CapabilityType;
      validSourceRequirementType: RequirementType;

      constructor(name: string, id: string) {
          this.name = name;
          this.id = id;
      }

      public getName() {
        return this.name;
      }

      public getID() {
         return this.id;
      }

}
