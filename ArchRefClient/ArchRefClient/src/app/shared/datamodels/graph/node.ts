/*******************************************************************************************************************************************************************************************************
 *
 * Node Data Model
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
import { Entity } from '../entity/entity';

export class Node extends Entity {

  x: number;
  y: number;
  width: number;
  height: number;

  constructor(name: string, x: number, y: number, width: number, height: number) {
    super(name);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

}
