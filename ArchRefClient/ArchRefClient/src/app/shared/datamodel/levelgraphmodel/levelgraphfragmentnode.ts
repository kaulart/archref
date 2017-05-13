import { Level } from './level';
import { LevelGraphRefineToRelation } from './levelgraphrefinetorelation';
export class LevelGraphFragmentNode {

  id: number;
  level: Level;

  x: number;
  y: number;
  width: number;
  height: number;

  refineRelationOut: LevelGraphRefineToRelation[] = [];
  refineRelationIn: LevelGraphRefineToRelation[] = [];

  constructor(x: number, y: number, width: number, height: number, level:Level) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.level = level;
  };

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

}
