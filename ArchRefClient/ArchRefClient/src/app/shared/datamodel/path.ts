import { Point } from './point';
export class Path {

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
