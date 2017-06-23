import { Logger } from '../../../../../logger/logger';
import { NodeTemplate } from '../../../datamodels/topology/nodetemplate';
import { NodeTemplateService } from '../../../dataservices/topologytemplate/nodetemplate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nodetemplatedetails',
  templateUrl: './nodetemplatedetails.component.html',
  styleUrls: ['./nodetemplatedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - NodeTemplateDetailsComponent - Lazy loaded component as wrapper for all other components in the NodeTemplateDetailsComponent
 *
 * @field - currentNodeTemplate: NodeTemplate - NodeTemplate which is currently displayed
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                       cause a "Over Flash" for the user experience
 *
 * @author Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class NodeTemplateDetailsComponent implements OnInit {

  currentNodeTemplate: NodeTemplate = new NodeTemplate();
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private nodeTemplateService: NodeTemplateService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize NodeTemplateDetailsComponent', NodeTemplateDetailsComponent.name);
    this.route.queryParams.subscribe(params => {
      this.currentNodeTemplate.id = params['id'] || null;
    });

    this.retrieveNodeTemplate(this.currentNodeTemplate.id);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveNodeTemplate - Call the NodeTemplateService for loading NodeTemplate from database into the application and subscribe for a callback.
   *
   * @param - id: number - ID of the NodeTemplate which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveNodeTemplate(id: number) {
    Logger.info('Retrieve NodeTemplate Data', NodeTemplateDetailsComponent.name);
    this.nodeTemplateService.getNodeTemplate(id)
      .subscribe(nodeTemplateResponse => {
        this.currentNodeTemplate = nodeTemplateResponse;
        Logger.info('NodeTemplate sucessfully retrieved.', NodeTemplateDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
