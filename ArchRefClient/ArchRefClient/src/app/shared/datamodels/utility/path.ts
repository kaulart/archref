import { Point } from './point';

/*******************************************************************************************************************************************************************************************************
 *
 * @data Path - A Collection of Points used for drawing relations/paths in a view
 *
 * @field id: number - ID of a path in a view
 * @field pathDataString: string - Specific representation of a path as a string so that SVG Path/Line elements can interpret the data
 * @field points: Point[] - Array of all point in a path
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Path {

  id: number;
  pathDataString: string;
  points: Point[];

  constructor(points: Point[]) {
    this.points = points;
    this.createPath(points);
  }

  createPath(points: Point[]) {
    this.pathDataString = '';
    for (let point of points) {
      this.pathDataString = this.pathDataString + point.x + ',' + point.y + ' ';
    }
  }

  addPointToPath(point: Point) {
    this.pathDataString = this.pathDataString + point.x + ',' + point.y + ' ';
  }

  updatePath() {
    this.pathDataString = '';
    for (let point of this.points) {
      this.pathDataString = this.pathDataString + point.x + ',' + point.y + ' ';
    }
  }

}
