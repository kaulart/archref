import { Logger } from '../../../../../../../logger/logger';
import { NodeType } from '../../../../../../shared/datamodels/types/nodetype';
import { NodeTypeService } from '../../../../../../shared/dataservices/types/nodetype.service';
import { Component, OnInit, Input } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.css']
})

/*********************************************************************************************************************************************
 *
 * @component GeneralDataComponent Class - The component displays the general data of a NodeType Object.
 *
 *
 * @field currentNodeType: NodeType -  NodeType which is currently selected
 * @field flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 *
 * @author Arthur Kaul
 *
 ********************************************************************************************************************************************/
export class GeneralDataComponent implements OnInit {

  @Input()
  currentNodeType: NodeType;

  public flashMessage = new FlashMessage();

  constructor(private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
     Logger.info('Iniitalize GeneralDataComponent Component', GeneralDataComponent.name);
  }

}
