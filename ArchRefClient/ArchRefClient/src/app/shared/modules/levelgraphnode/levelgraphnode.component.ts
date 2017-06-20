
import { Logger } from '../../../../logger/logger';
import { LevelGraph } from '../../datamodels/levelgraph/levelgraph';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levelgraphnode',
  templateUrl: './levelgraphnode.component.html',
  styleUrls: ['./levelgraphnode.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphNodeComponent - Lazy loaded component as wrapper for all other components in the LevelGraphNodeComponent
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphNodeComponent implements OnInit {

  @Input()
  currentLevelGraph: LevelGraph;

  constructor() { }
  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphNodeComponent', LevelGraphNodeComponent.name);
  }

}
