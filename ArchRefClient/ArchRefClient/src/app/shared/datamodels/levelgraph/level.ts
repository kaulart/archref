import { Constants } from '../../constants/constants';
import { LevelGraph } from './levelgraph';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Level - Level for the Level Graph Model for display the levels in the LevelGraphModellerComponent
 *
 * @field - id: number - ID of the level
 * @field - depth: number - Depth of the level in the LevelGraph
 * @field - visible: boolean - Indicates if a level should be displayed or not in the LevelGraphModellerComponent
 * @field - y: number - Y-Position of the level layer in the LevelGraphModellerComponent
 * @field - height: number - Height of the level layer in the LevelGraphModellerComponent
 * @field - levelGraph: LevelGraph height: number - Corresponding LevelGraph for the Level
 * @field - levelGraphId: number - ID of the corresponding LevelGraph
 *
 * //hint: You may decide to decouple level data from data which is only be used for display reasons in the LevelGraphModellerComponent
 * //hint: You may decide to add list for the nodes and relations which are in a level for faster access
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Level {

  id: number;
  depth: number;
  visible: boolean;
  y: number;
  height: number;
  levelGraph: LevelGraph;
  levelGraphId: number;

  constructor(depth: number, y: number, levelGraphId: number) {
    this.depth = depth;
    this.y = y;
    this.height = Constants.LEVELHEIGHT;
    this.visible = true;
    this.levelGraphId = levelGraphId;
  }

}
