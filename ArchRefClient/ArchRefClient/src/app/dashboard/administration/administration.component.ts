import {Logger} from '../../../logger/logger';
import {LevelGraph} from '../../shared/datamodels/levelgraph/levelgraph';
import {ExpectedProperty} from '../../shared/datamodels/metrics/expectedproperty';
import {Property} from '../../shared/datamodels/metrics/property';
import {ProvidedProperty} from '../../shared/datamodels/metrics/providedproperty';
import {Repository} from '../../shared/datamodels/repository/repository';
import {TopologyTemplate} from '../../shared/datamodels/topology/topologytemplate';
import {NodeType} from '../../shared/datamodels/types/nodetype';
import {RelationshipType} from '../../shared/datamodels/types/relationshiptype';
import {LevelGraphService} from '../../shared/dataservices/levelgraph/levelgraph.service';
import {RepositoryService} from '../../shared/dataservices/repository/repository.service';
import {TopologyTemplateService} from '../../shared/dataservices/topologytemplate/topologytemplate.service';
import { NodeTypeService } from '../../shared/dataservices/types/nodetype.service';
import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';
import {FileUploader} from 'ng2-file-upload';

// URL for XML Import
const URL_IMPORT = '/api/import/definition';

// URL for XML Export
const URL_EXPORT = '/api/export/definitions';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/*****************************************************************************************************************************
 *
 * @component - AdministrationComponent - Lazy loaded component as wrapper for all other components in the AdministrationComponent
 *
 * @author - Arthur Kaul
 *
 ****************************************************************************************************************************/
export class AdministrationComponent implements OnInit {

  public flashMessage = new FlashMessage();
  public uploader: FileUploader = new FileUploader({});

  constructor(private repositoryService: RepositoryService,
    private topologyTemplateService: TopologyTemplateService,
    private levelGraphService: LevelGraphService,
    private nodeTypeService: NodeTypeService,
    private flashMessageService: FlashMessageService) {};

  ngOnInit() {}


  //TODO
  importXml() {
    this.uploader.setOptions({url: URL_IMPORT});
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };
  }

  //TODO
  exportXml() {

  }
}
