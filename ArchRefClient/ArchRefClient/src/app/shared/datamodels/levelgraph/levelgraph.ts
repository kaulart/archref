import { Level } from './level';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraph - LevelGraph Model is used for the refinement of TopologyTemplate Data Models
 *
 * @field - id: number - ID of the LevelGraph
 * @field - name: string - Name of the LevelGraph
 * @field - levels: Level[] - Array of the different levels of a LevelGraph
 * @field - levelGraphNodes: LevelGraphNode[] - Array of all LevelGraphNodes in the LevelGraph
 * @field - levelGraphRelations: LevelGraphRelation[] - Array of all LevelGraphRelations in the LevelGraph
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraph {

  id: number;
  name: string;
  levels: Level[];
  levelGraphNodes: LevelGraphNode[];
  levelGraphRelations: LevelGraphRelation[];

  checked = false;

  constructor() {
    this.name = 'Unnamed';
    this.levels = [];
    this.levelGraphRelations = [];
    this.levelGraphNodes = [];
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * Getter Methods
   *
   ******************************************************************************************************************************************************************************************************/

  public getLevel(levelId: number) {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].id === levelId) {
        return this.levels[i];
      }
    }
    return null;
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * Setter Methods
   *
   ******************************************************************************************************************************************************************************************************/

  public setLevel(level: Level) {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].id === level.id) {
        this.levels[i] = level;
      }
    }
  }


  /*******************************************************************************************************************************************************************************************************
   *
   * Remove Methods
   *
   ******************************************************************************************************************************************************************************************************/
  public removeLevel(levelId) {
    this.levels = this.levels.filter(function(obj) {
      return obj.id !== levelId;
    });
  }

  public removeLevelGraphRelation(levelGraphRelationId) {
    this.levels = this.levels.filter(function(obj) {
      return obj.id !== levelGraphRelationId;
    });
  }

  public removeLevelGraphNode(levelGraphNodeId) {
    this.levels = this.levels.filter(function(obj) {
      return obj.id !== levelGraphNodeId;
    });
  }

}

