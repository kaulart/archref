import {Logger} from '../../../logger/logger';
import {TopologyTemplate} from '../../shared/datamodels/topology/topologytemplate';
import {TopologyTemplateService} from '../../shared/dataservices/topologytemplate/topologytemplate.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-topologytemplatetool',
  templateUrl: './topologytemplatetool.component.html',
  styleUrls: ['./topologytemplatetool.component.css']
})

/****************************************************************************************************************************************
 *
 * @component - TopologyTemplateToolComponent - Lazy loaded component as wrapper for a better view result and for decoupling header
 *                                              from the data panel
 *
 * @author - Arthur Kaul
 *
 ***************************************************************************************************************************************/
export class TopologyTemplateToolComponent implements OnInit {

  topologyTemplates: TopologyTemplate[] = [];

  constructor(private topologyTemplateService: TopologyTemplateService
  ) {}

  ngOnInit() {
    this.retrieveTopologyTemplates();
  }

  /********************************************************************************************************************************************************************************************************
  *
  *  @method - retrieveTopologyTemplates - Call the TopologyTemplateService for loading all TopologyTemplates from database into the application
  *                                        and subscribe for a callback. Currently no pagination/streaming of data is supported
  *
  *******************************************************************************************************************************************************************************************************/
  retrieveTopologyTemplates() {
    Logger.info('Retrieve TopologyTemplate Data', TopologyTemplateToolComponent.name);
    this.topologyTemplateService.getTopologyTemplates()
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = topologyTemplateResponse;
        Logger.info('Topology Template sucessfully retrieved.', TopologyTemplateToolComponent.name);
      });
  }

}
