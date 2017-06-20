import { Logger } from '../../../../../../logger/logger';
import { NodeTemplate } from '../../../../datamodels/topology/nodetemplate';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - GeneralDataComponent Class - The component displays the general data of a NodeTemplate Object.
 *
 * @field - currentNodeTemplate: NodeTemplate -  NodeTemplate which is currently selected
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentNodeTemplate: NodeTemplate;

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
