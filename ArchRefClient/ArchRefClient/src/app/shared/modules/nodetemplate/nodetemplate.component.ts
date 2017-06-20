import { Logger } from '../../../../logger/logger';
import { TopologyTemplate } from '../../datamodels/topology/topologytemplate';
import { LevelGraphNodeComponent } from '../levelgraphnode/levelgraphnode.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nodetemplate',
  templateUrl: './nodetemplate.component.html',
  styleUrls: ['./nodetemplate.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - NodeTemplateComponent - Lazy loaded component as wrapper for all other components in the NodeTemplateComponent
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTemplateComponent implements OnInit {

  @Input()
  currentTopologyTemplate: TopologyTemplate;

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
