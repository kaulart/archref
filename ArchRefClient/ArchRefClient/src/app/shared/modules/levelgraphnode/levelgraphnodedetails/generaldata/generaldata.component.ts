import { Logger } from '../../../../../../logger/logger';
import { LevelGraphNode } from '../../../../datamodels/levelgraph/levelgraphnode';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - GeneralDataComponent Class - The component displays the general data of a LevelGraphNode Object.
 *
 * @field - currentLevelGraphNode: LevelGraphNode -  LevelGraphNode which is currently selected
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentLevelGraphNode: LevelGraphNode;

  constructor() { }

  /********************************************************************************************************************************************************************************************************
  *
  * @method - ngOnInit - Is called when the component is initialized
  *
  *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize GeneralDataComponent Component', GeneralDataComponent.name);
  }

}
