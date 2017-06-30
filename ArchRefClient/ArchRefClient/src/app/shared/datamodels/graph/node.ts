/*******************************************************************************************************************************************************************************************************
 *
 * @class - Node - Superclass for all models which should be displayed as rectangles in the GraphModellerComponents or in the TopologyTemplateModell. It extends the entity class.
 *
 * @superclass - Entity
 * @superField - id: number - ID of the Node
 * @superField - name: string - Name of the Node
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the Node
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the Node
 *
 * @field - x: number - x Position of the left upper corner of a rectangle
 * @field - y: number - y Position of the left upper corner of a rectangle
 * @field - width: number - Width of the rectangle
 * @field - height: number - Height of the rectangle
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
import { Constants } from '../../constants/constants';
import { Entity } from '../entity/entity';

export class Node extends Entity {

  x: number;
  y: number;
  width: number;
  height: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.width = Constants.NODEWIDTH;
    this.height = Constants.NODEHEIGHT;
  }

}
