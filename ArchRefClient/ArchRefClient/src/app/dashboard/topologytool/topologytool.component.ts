import { TopologyTemplate } from '../../shared/datamodel/topologymodel/topologytemplate';
import { TopologyTemplateService } from '../../shared/dataservices/topologytemplate.service';
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
  editedTopologyTemplate: TopologyTemplate;


  constructor(private topologyTemplateService: TopologyTemplateService) {

  }

  ngOnInit() {

    this.loadTopologyTemplates();
  }

  loadTopologyTemplates() {
    this.topologyTemplateService.getTopologyTemplates().subscribe(topologyTemplateResponse => this.topologyTemplates = topologyTemplateResponse);
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
