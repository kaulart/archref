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
export class NodeTypeDetailsComponent implements OnInit {

  currentNodeType: NodeType = new NodeType('', null);

  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router, private nodeTypeService: NodeTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    Logger.info('Iniitalize NodeTypeDetails Component', NodeTypeDetailsComponent.name);
   this.route.queryParams.subscribe(params => {
      this.currentNodeType.name = params['name'] || 'Unnamed';
    });

    this.route.queryParams.subscribe(params => {
      this.currentNodeType.id = params['id'] || null;
    });

    this.retrieveNodeType(this.currentNodeType.id);

  }

  /****************************************************************************************************************
   *
   * Retrieve NodeType - Load NodeType with id from the database
   * @param id: number - ID of the NodeType witch should be loaded
   *
   ****************************************************************************************************************/
  retrieveNodeType(id: number) {
    Logger.info('Retrieve Node Type Data', NodeTypeDetailsComponent.name);
    this.nodeTypeService.getNodeType(id)
      .subscribe(nodeTypeResponse => {
        this.currentNodeType = nodeTypeResponse;
        this.flashMessage.message = 'Node Type with id: ' + nodeTypeResponse.id + ' and name: ' + nodeTypeResponse.name + ' retrieved sucessfully. ';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Node Type sucessfully retrieved.', NodeTypeDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }


}
