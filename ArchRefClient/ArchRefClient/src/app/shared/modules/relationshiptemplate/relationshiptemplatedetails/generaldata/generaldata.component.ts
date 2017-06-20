import { Logger } from '../../../../../../logger/logger';
import { RelationshipTemplate } from '../../../../datamodels/topology/relationshiptemplate';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/**********************************************************************************************************************************************************************************************************
*
* @component - GeneralDataComponent Class - The component displays the general data of a LevelGraphRelation Object.
*
* @field - currentLevelGraphRelation: LevelGraphRelation -  LevelGraphRelation which is currently selected
*
* @author - Arthur Kaul
*
*********************************************************************************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentRelationshipTemplate: RelationshipTemplate;

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
