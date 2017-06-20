import { Logger } from '../../../../logger/logger';
import { RelationshipTemplate } from '../../datamodels/topology/relationshiptemplate';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-relationshiptemplate',
  templateUrl: './relationshiptemplate.component.html',
  styleUrls: ['./relationshiptemplate.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - RelationshipTemplateComponent - Lazy loaded component as wrapper for all other components in the RelationshipTemplateComponent
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RelationshipTemplateComponent implements OnInit {

  @Input()
  currentRelationshipTemplates: RelationshipTemplate[];

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  constructor() { }

  ngOnInit() {
    Logger.info('Iniitalize LevelGraphNodeComponent', RelationshipTemplateComponent.name);
  }

}
