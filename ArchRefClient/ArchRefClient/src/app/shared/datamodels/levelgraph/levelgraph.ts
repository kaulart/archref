import { TopologyTemplate } from '../topology/topologytemplate';
import { Level } from './level';
import { LevelGraphNode } from './levelgraphnode';
import { LevelGraphRelation } from './levelgraphrelation';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraph Data Model - LevelGraph Model is used for the refinement of TopologyTemplate Data Models
 *
 * @fields - id: number - ID of the LevelGraph
 * @fields - name: string - Name of the LevelGraph
 * @fields - levels: Level[] - Array of the different levels of a LevelGraph
 * @fields - levelGraphNodes: LevelGraphNode[] - Array of all LevelGraphNodes in the LevelGraph
 * @fields - levelGraphRelations: LevelGraphRelation[] - Array of all LevelGraphRelations in the LevelGraph
 * @fields - topologyTemplates: TopologyTemplate[] - Array of all TopologyTemplates which were created/generated with the LevelGraph
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

  checked = false;

  constructor() {
    this.name = 'Unnamed';
    this.levels = [];
    this.levelGraphRelations = [];
    this.levelGraphNodes = [];
    this.topologyTemplates = [];
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


//  public getLevelGraphRelation(levelGraphRelationId: number): LevelGraphRelation {
//    for (let i = 0; i < this.levelGraphRelations.length; i++) {
//      if (this.levelGraphRelations[i].id === levelGraphRelationId) {
//        return this.levelGraphRelations[i];
//      }
//    }
//    return null;
//  }
//
//  public getLevelGraphNode(levelGraphNodeId: number): LevelGraphNode {
//    for (let i = 0; i < this.levelGraphNodes.length; i++) {
//      if (this.levelGraphNodes[i].id === levelGraphNodeId) {
//        return this.levelGraphNodes[i];
//      }
//    }
//    return null;
//  }

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

