/*******************************************************************************************************************************************************************************************************
 *
 * @data - Node Data Model - Superclass for all models which should be displayed as rectangles in GraphModellerComponents. It extends the entity class.
 *
 * @Entity
 * @superFields - id: number - ID of the Node
 * @superFields - name: string - Name of the Node
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the Node
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the Node
 *
 * @fields - x: number - x Position of the left upper corner of a rectangle
 * @fields - y: number - y Position of the left upper corner of a rectangle
 * @fields - width: number - Width of the rectangle
 * @fields - height: number - Height of the rectangle
 *
 * //TODO Further improvement: You may decide to separate the view data fields as rectangle and model the rectangle as a child class of an super class view object
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

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

}
