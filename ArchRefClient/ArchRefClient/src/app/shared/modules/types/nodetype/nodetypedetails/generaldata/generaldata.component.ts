import { Logger } from '../../../../../../../logger/logger';
import { NodeType } from '../../../../../../shared/datamodels/types/nodetype';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - GeneralDataComponent - The component displays the general data of a NodeType Object.
 *
 *
 * @field - currentNodeType: NodeType -  NodeType which is currently selected
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentNodeType: NodeType;

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
