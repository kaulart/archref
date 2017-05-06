import { Relation } from './relation';

export class Node {

  name: string;
  nodeType: string;
  id: string;
  pos_x: number;
  pos_y: number;
  height: number;
  width: number;
  outRelation: Relation[];
  inRelation: Relation[];

  constructor(name: string, id: string, nodeType: string, pos_x: number, pos_y: number, height: number, width: number) {
    this.name = name;
    this.id = id;
    this.nodeType = nodeType;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = width;
    this.height = height;
  };

  public getName() {
    return this.name;
  }

  public getID() {
    return this.id;
  }

  public getNodeType() {
    return this.nodeType;
  }

  public getPos_X() {
    return this.pos_x;
  }

  public getPos_Y() {
    return this.pos_y;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public setPos_X(pos_x: number) {
    this.pos_x = pos_x;
  }

  public setPos_Y(pos_y: number) {
    this.pos_y = pos_y;
  }

   public setHeight(height: number) {
    this.height = height;
  }

  public setWidth(width: number) {
    this.width = width;
  }

}
