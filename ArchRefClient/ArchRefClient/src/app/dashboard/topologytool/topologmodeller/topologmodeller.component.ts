import { TopologyTemplate } from '../../../shared/datamodel/topologymodel/topologytemplate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopologyTemplateService } from '../../../shared/dataservices/topologytemplate.service';

@Component({
  selector: 'app-topologmodeller',
  templateUrl: './topologmodeller.component.html',
  styleUrls: ['./topologmodeller.component.css']
})
export class TopologmodellerComponent implements OnInit {

  currentTopologyTemplate = new TopologyTemplate('');
  currentTopologyTemplateId: number;
  currentTopologyTemplateName: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private topologyTemplateService: TopologyTemplateService) { }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplateName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.currentTopologyTemplateId = params['id'] || '';
    });

    this.loadTopologyTemplate(this.currentTopologyTemplateId);

  }


  loadTopologyTemplate(id: number) {
    this.topologyTemplateService.getTopologyTemplate(id).subscribe(topologyTemplateResponse => this.currentTopologyTemplate = topologyTemplateResponse);
  }
}
