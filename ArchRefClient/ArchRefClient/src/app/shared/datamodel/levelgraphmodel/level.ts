/**
 * New typescript file
 */
import { LevelGraph } from './levelgraph';
export class Level {

  name: string;
  value: number
  id: number;
  checked: boolean;
  y: number;
  height: number;
  levelGraph: LevelGraph;

  constructor(name: string, value: number, checked: boolean, y: number, height: number, levelGraph: LevelGraph) {
    this.name = name;
    this.value = value;
    this.checked = checked;
    this.y = y;
    this.height = height;
    this.levelGraph = levelGraph;
  }

}
