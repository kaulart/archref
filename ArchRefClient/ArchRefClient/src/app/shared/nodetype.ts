import { DeploymentArtifact } from './deploymentartifact';
import { InstanceState } from './instancestate';
import { Interface } from './interface';
import { Policy } from './policy';


export class NodeType {

      iconPath: string;
      interfaces: Interface[];
      private name: string;
      private id: string;
      isAbstractNodeType: boolean;
      isFinalNodeType: boolean;
      instanceStates: InstanceState[];
      derivedFrom: string;
      policies: Policy[];
      deploymentArtifacts: DeploymentArtifact[];

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
