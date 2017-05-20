import { TopologyTemplate } from '../../shared/datamodel/topologymodel/topologytemplate';
import { TopologyTemplateService } from '../../shared/dataservices/topologytemplate.service';

import { LevelGraphService } from '../../shared/dataservices/levelgraph.service';
import { Component, OnInit } from '@angular/core';
import { Utility } from '../../utility';

@Component({
  selector: 'app-topologytool',
  templateUrl: './topologytool.component.html',
  styleUrls: ['./topologytool.component.css']
})
export class TopologyToolComponent implements OnInit {

  topologyTemplates: TopologyTemplate[] = [];
  createdTopologyTemplate: TopologyTemplate;
  editedTopologyTemplate: TopologyTemplate = new TopologyTemplate('');

  constructor(private topologyTemplateService: TopologyTemplateService, private levelGraphService: LevelGraphService) {

  }

  ngOnInit() {

    this.loadTopologyTemplates();
    this.loadLevelGraphs();
  }

  loadTopologyTemplates() {
    this.topologyTemplateService.getTopologyTemplates().subscribe(topologyTemplateResponse => this.topologyTemplates = topologyTemplateResponse);
  }

  loadLevelGraphs() {

  }

  createTopologyTemplate(name: string) {

    let topologyTemplate: TopologyTemplate = new TopologyTemplate(name);
    this.topologyTemplateService.createTopologyTemplate(topologyTemplate).subscribe(topologyTemplateResponse => this.topologyTemplates.push(topologyTemplateResponse));

  }

  updateTopologyTemplate(name: string) {
    this.editedTopologyTemplate.setName(name);
    this.topologyTemplateService.updateTopologyTemplate(this.editedTopologyTemplate).subscribe(topologyTemplateResponse => this.topologyTemplates = Utility.updateElementInArry(topologyTemplateResponse, this.topologyTemplates));
  }

  deleteTopologyTemplate(id: number) {

    this.topologyTemplateService.deleteTopologyTemplate(id).subscribe(topologyTemplateResponse => this.topologyTemplates = Utility.deleteElementFromArry(id, this.topologyTemplates));
  }

  setEditTopologyTemplate(topologyTemplate: TopologyTemplate) {
    this.editedTopologyTemplate = topologyTemplate;
  }

}
