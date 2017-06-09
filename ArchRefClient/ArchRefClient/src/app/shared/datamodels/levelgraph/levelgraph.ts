import { Entity } from '../entity/entity';
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
export class LevelGraph extends Entity {

  levels: Level[];
  levelGraphNodes: LevelGraphNode[];
  levelGraphRelations: LevelGraphRelation[];
  topologyTemplates: TopologyTemplate[];

  constructor() {
    super('Unnamed');
    this.levels = [];
    this.levelGraphRelations = [];
    this.levelGraphNodes = [];
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * Getter Methods
   *
   ******************************************************************************************************************************************************************************************************/
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(levelId: number) {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].id === levelId) {
        return this.levels[i];
      }
    }
    return null;
  }

  public getLevels(): Level[] {
    return this.levels;
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

  public getLevelGraphRelations(): LevelGraphRelation[] {
    return this.levelGraphRelations;
  }

  public getLevelGraphNodes(): LevelGraphNode[] {
    return this.levelGraphNodes;
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
  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setLevel(level: Level) {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].id === level.id) {
        this.levels[i] = level;
      }
    }
  }

  public setLevels(levels: Level[]) {
    this.levels = levels;
  }

  public setLevelGraphNodes(levelGraphNodes: LevelGraphNode[]) {
    this.levelGraphNodes = levelGraphNodes;
  }

  public setLevelGraphRelations(levelGraphRelations: LevelGraphRelation[]) {
    this.levelGraphRelations = levelGraphRelations;
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

