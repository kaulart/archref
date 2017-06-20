import { Logger } from '../../../../logger/logger';
import { LevelGraphRelation } from '../../datamodels/levelgraph/levelgraphrelation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levelgraphrelation',
  templateUrl: './levelgraphrelation.component.html',
  styleUrls: ['./levelgraphrelation.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - LevelGraphRelationComponent - Lazy loaded component as wrapper for all other components in the LevelGraphRelationComponent
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class LevelGraphRelationComponent implements OnInit {

  @Input()
  currentLevelGraphRelations: LevelGraphRelation[];
 // currentLevelGraph: LevelGraph;

  constructor() { }
  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphRelationComponent', LevelGraphRelationComponent.name);
  }

}
