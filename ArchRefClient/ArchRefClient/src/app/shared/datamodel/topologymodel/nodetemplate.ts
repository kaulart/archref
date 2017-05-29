import { NodeType } from './nodetype';
import { Property } from './property';
import { TopologyTemplate } from './topologytemplate';

export class NodeTemplate {

  id: number = null;
  name: string;
  nodeType: NodeType;

  topologyTemplate: TopologyTemplate;

  expectedProperties: Property[];

  x: number;
  y: number;
  width: number;
  height: number;

  constructor(name: string, nodeType: NodeType, x: number, y: number, width: number, height: number) {
    this.name = name;
    this.nodeType = nodeType;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
