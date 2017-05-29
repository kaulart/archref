import { Logger } from '../../../logger/logger';
import { LevelGraph } from '../../shared/datamodel/levelgraphmodel/levelgraph';
import { TopologyTemplate } from '../../shared/datamodel/topologymodel/topologytemplate';
import { TopologyTemplateService } from '../../shared/dataservices/topologytemplate.service';

import { LevelGraphService } from '../../shared/dataservices/levelgraph.service';
import { Component, OnInit } from '@angular/core';
import { Utility } from '../../utility';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-topologytool',
  templateUrl: './topologytool.component.html',
  styleUrls: ['./topologytool.component.css']
})
export class TopologyToolComponent implements OnInit {

  topologyTemplates: TopologyTemplate[] = [];
  topologyTemplate: TopologyTemplate = new TopologyTemplate('Unnamed');
  levelGraphs: LevelGraph[] = [];

  public flashMessage = new FlashMessage();

  constructor(private flashMessageService: FlashMessageService, private topologyTemplateService: TopologyTemplateService, private levelGraphService: LevelGraphService) { }

  ngOnInit() {
    this.flashMessage.timeoutInMS = 4000;
    this.retrieveTopologyTemplates();
    this.retrieveLevelGraphs();
  }

  /****************************************************************************************************************
   *
   *  Create Level Graph
   *  @param name: string - Name of the TopologyTemplate
   *
   ****************************************************************************************************************/
  createTopologyTemplate() {

    this.topologyTemplateService.createTopologyTemplate(this.topologyTemplate)
      .subscribe(topologyTemplateResponse => {

        this.topologyTemplates.push(topologyTemplateResponse);
        this.flashMessage.message = 'Info: TopologyTemplate with name: ' + topologyTemplateResponse.getName() + ' was created sucessfully with id: ' + topologyTemplateResponse.getId();
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('TopologyTemplate with name: ' + topologyTemplateResponse.getName() + ' was created sucessfully with id: ' + topologyTemplateResponse.getId(), TopologyToolComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });

  }

  /****************************************************************************************************************
   *
   *  Retrieve Topology Template
   *
   ****************************************************************************************************************/
  retrieveLevelGraphs() {
    this.levelGraphService.getLevelGraphs()
      .subscribe(levelGraphResponse => {
        this.levelGraphs = levelGraphResponse;
        this.flashMessage.message = 'Level Graphs retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Level Graphs retrieved sucessfully.', TopologyToolComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   *  Retrieve Topology Template
   *
   ****************************************************************************************************************/
  retrieveTopologyTemplates() {
    this.topologyTemplateService.getTopologyTemplates()
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = topologyTemplateResponse;
        this.flashMessage.message = 'Topology Template  retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Topology Template sucessfully retrieved.', TopologyToolComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************
   *
   * Update Topology Template - Update the Topology Template data
   * @param name - New name of the Level Graph
   *
   *****************************************************************************************************************/
  updateTopologyTemplate() {

    this.topologyTemplateService.updateTopologyTemplate(this.topologyTemplate)
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = Utility.updateElementInArry(topologyTemplateResponse, this.topologyTemplates);
        this.flashMessage.message = 'Topology Template with id: ' + topologyTemplateResponse.getId() + ' and name: ' + topologyTemplateResponse.getName() + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.getId() + ' and name:' + topologyTemplateResponse.getName() + ' was updated sucessfully.', TopologyToolComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /****************************************************************************************************************
   *
   * Delete Topology Template
   * @param id: number - ID of the topology template witch should be deleted from the database
   *
   ****************************************************************************************************************/
  deleteTopologyTemplate(id: number) {

    this.topologyTemplateService.deleteTopologyTemplate(id)
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = Utility.deleteElementFromArry(id, this.topologyTemplates);
        this.flashMessage.message = 'Topology Template with id: ' + id + ' was deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Topology Template with id: ' + id + ' was deleted sucessfully.', TopologyToolComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /*****************************************************************************************************************
   *
   * Set the editable LevelGraph Data
   * @param repository - The levelGraph witch should be edit
   *
   ****************************************************************************************************************/
  setEditTopologyTemplate(topologyTemplate: TopologyTemplate) {
    this.topologyTemplate = topologyTemplate;
  }

}
