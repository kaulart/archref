import { TopologyTemplate } from '../topology/topologytemplate';
import { Level } from './level';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * LevelGraph Data Model for the refinement of TopologyTemplate Data Models
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class LevelGraph {

  id: number;
  name: string;
  levels: Level[];
  levelGraphNodes: LevelGraphNode[];
  levelGraphRelations: LevelGraphRelation[];
  topologyTemplates: TopologyTemplate[];

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

  public getVisibleLevels(): Level[] {

    let visibleLevels = [];

    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].visible) {
        visibleLevels.push(this.levels[i]);
      }
    }

    return visibleLevels;
  }

  public getLevelGraphRelation(levelGraphRelationId: number): LevelGraphRelation {
    for (let i = 0; i < this.levelGraphRelations.length; i++) {
      if (this.levelGraphRelations[i].id === levelGraphRelationId) {
        return this.levelGraphRelations[i];
      }
    }
    return null;
  }

  public getLevelGraphNode(levelGraphNodeId: number): LevelGraphNode {
    for (let i = 0; i < this.levelGraphNodes.length; i++) {
      if (this.levelGraphNodes[i].id === levelGraphNodeId) {
        return this.levelGraphNodes[i];
      }
    }
    return null;
  }

  public getNumberOfLevels(): number {
    return this.levels.length;
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
   * Add Methods
   *
   ******************************************************************************************************************************************************************************************************/
  public addLevel(level: Level) {
    this.levels.push(level);
  }

  public addLevelGraphRelation(levelGraphRelation: LevelGraphRelation) {
    this.levelGraphRelations.push(levelGraphRelation);
  }

  public addLevelGraphNode(levelGraphNode: LevelGraphNode) {
    this.levelGraphNodes.push(levelGraphNode);
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

