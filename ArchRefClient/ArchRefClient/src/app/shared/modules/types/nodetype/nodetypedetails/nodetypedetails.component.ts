import { Logger } from '../../../../../../logger/logger';
import { NodeType } from '../../../../../shared/datamodels/types/nodetype';
import { NodeTypeService } from '../../../../../shared/dataservices/types/nodetype.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-nodetypedetails',
  templateUrl: './nodetypedetails.component.html',
  styleUrls: ['./nodetypedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - NodeTypeDetailsComponent Class - The component displays the details of a NodeType Object.
 *
 *
 * @field - currentNodeType: NodeType -  NodeType which is currently selected
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTypeDetailsComponent implements OnInit {

  currentNodeType: NodeType = new NodeType();

  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router, private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize NodeTypeDetails Component', NodeTypeDetailsComponent.name);
    this.route.queryParams.subscribe(params => {
      this.currentNodeType.id = params['id'] || null;
    });

    this.retrieveNodeType(this.currentNodeType.id);

  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveNodeType - Load NodeType with id from the database
   *
   * @param - id: number - ID of the NodeType witch should be loaded
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveNodeType(id: number) {
    Logger.info('Retrieve Node Type Data', NodeTypeDetailsComponent.name);
    this.nodeTypeService.getNodeType(id)
      .subscribe(nodeTypeResponse => {
        this.currentNodeType = nodeTypeResponse;
        Logger.info('Node Type sucessfully retrieved.', NodeTypeDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
