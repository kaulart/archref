import { TopologyNode } from './topologynode';
import { TopologyRelation } from './topologyrelation';

export class Topology {

  private topologyNodeList: TopologyNode[];
  private relationNodeList: TopologyRelation[];

  constructor(topologyNodeList:  TopologyNode[], relationNodeList: TopologyRelation[]) {
    this.topologyNodeList = topologyNodeList;
    this.relationNodeList = relationNodeList;
  }

  public getNodeList() {
      return this.relationNodeList;
  }

  public getRelationList() {
      return this.topologyNodeList;
  }

  public addNode() {

  }

  public addRelation() {

  }

}
