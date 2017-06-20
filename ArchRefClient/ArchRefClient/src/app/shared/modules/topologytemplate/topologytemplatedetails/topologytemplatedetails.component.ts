import { Logger } from '../../../../../logger/logger';
import { TopologyTemplate } from '../../../datamodels/topology/topologytemplate';
import { TopologyTemplateService } from '../../../dataservices/topologytemplate/topologytemplate.service';
import { LevelGraphDetailsComponent } from '../../levelgraph/levelgrahdetails/levelgrahdetails.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-topologytemplatedetails',
  templateUrl: './topologytemplatedetails.component.html',
  styleUrls: ['./topologytemplatedetails.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component TopologyTemplateDetailsComponent - Lazy loaded component as wrapper for all other components in the
 *                                               TopologyTemplateDetailsComponent
 *
 * @author Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class TopologyTemplateDetailsComponent implements OnInit {

  currentTopologyTemplate: TopologyTemplate = new TopologyTemplate();
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private topologyTemplateService: TopologyTemplateService,
    private flashMessageService: FlashMessageService) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize LevelGraphDetailsComponent', LevelGraphDetailsComponent.name);

    this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplate.id = params['id'] || null;
    });

    this.retrieveTopologyTemplate(this.currentTopologyTemplate.id);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method retrieveRepositoryData - Call the RepositoryService for loading repository from database into the application and subscribe
   *                                  for a callback.
   *
   * @param id: number - ID of the Repository which should be loaded from the database
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveTopologyTemplate(id: number) {
    Logger.info('Retrieve LevelGraph Data', LevelGraphDetailsComponent.name);
    this.topologyTemplateService.getTopologyTemplate(id)
      .subscribe(levelGraphResponse => {
        this.currentTopologyTemplate = levelGraphResponse;
        Logger.info('LevelGraph sucessfully retrieved.', LevelGraphDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
