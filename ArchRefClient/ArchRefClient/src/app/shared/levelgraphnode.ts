import { LevelGraphNodeType } from './levelgraphnodetype';
import { TopologyNodeType } from './topologynodetype';
import { TopologyRelationType } from './topologyrelationtype';


export class LevelGraphNode {

  private type: LevelGraphNodeType;
  private name: string;
  private id: string;
  private topologyNodeType: TopologyNodeType;
  private topologyRelationType: TopologyRelationType;

  constructor() {

  }

}
