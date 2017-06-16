/*******************************************************************************************************************************************************************************************************
 *
 * @data Point - A point in a coordinate system used for drawing
 *
 * @field - x: number - X-Position in a Cartesian coordinate system
 * @field - y: number - Y-Position in a Cartesian coordinate system
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Point {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}
