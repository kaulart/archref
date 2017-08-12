import {Logger} from '../../../logger/logger';
import {LevelGraph} from '../../shared/datamodels/levelgraph/levelgraph';
import {ExpectedProperty} from '../../shared/datamodels/metrics/expectedproperty';
import {Property} from '../../shared/datamodels/metrics/property';
import {ProvidedProperty} from '../../shared/datamodels/metrics/providedproperty';
import {Repository} from '../../shared/datamodels/repository/repository';
import {TopologyTemplate} from '../../shared/datamodels/topology/topologytemplate';
import {NodeType} from '../../shared/datamodels/types/nodetype';
import {RelationshipType} from '../../shared/datamodels/types/relationshiptype';
import {ExportXmlService} from '../../shared/dataservices/exportxml.service';
import {LevelGraphService} from '../../shared/dataservices/levelgraph/levelgraph.service';
import {RepositoryService} from '../../shared/dataservices/repository/repository.service';
import {TopologyTemplateService} from '../../shared/dataservices/topologytemplate/topologytemplate.service';
import {NodeTypeService} from '../../shared/dataservices/types/nodetype.service';
import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';
import {FileUploader} from 'ng2-file-upload';
import * as FileSaver from 'file-saver';

// URL for XML Import
const URL_IMPORT = '/api/import/definition';

// URL for XML Export
const URL_EXPORT = '/definition';

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

  topologyTemplates: TopologyTemplate[] = [];
  levelGraphs: LevelGraph[] = [];
  repositories: Repository[] = [];

  constructor(private repositoryService: RepositoryService,
    private topologyTemplateService: TopologyTemplateService,
    private levelGraphService: LevelGraphService,
    private nodeTypeService: NodeTypeService,
    private flashMessageService: FlashMessageService,
    private xmlExportSerivce: ExportXmlService) {};

  ngOnInit() {
    this.retrieveTopologyTemplates();
    this.retrieveRepositories();
    this.retrieveLevelGraphs();
  }

  /********************************************************************************************************************************************************************************************************
   *
   *  @method - retrieveTopologyTemplates - Call the TopologyTemplateService for loading all TopologyTemplates from database into the application
   *                                        and subscribe for a callback. Currently no pagination/streaming of data is supported
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveTopologyTemplates() {
    Logger.info('Retrieve TopologyTemplate Data', AdministrationComponent.name);
    this.topologyTemplateService.getTopologyTemplates()
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = topologyTemplateResponse;
        Logger.info('Topology Template sucessfully retrieved.', AdministrationComponent.name);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveLevelGraphs - Call the LevelGraphService for loading all LevelGraphs from database into the application and subscribe
   *                                 for a callback. Currently no pagination/streaming of data is supported
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveLevelGraphs() {
    Logger.info('Retrieve LevelGraph Data', AdministrationComponent.name);
    this.levelGraphService.getLevelGraphs()
      .subscribe(levelGraphsResponse => {
        this.levelGraphs = levelGraphsResponse;
        Logger.info('Level Graphs sucessfully retrieved.', AdministrationComponent.name);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveRepositories - Call the RepositoryService for loading all repositories from database into the application and subscribe
   *                                  for a callback. Currently no pagination/streaming of data is supported
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveRepositories() {
    Logger.info('Retrieve Repository Data', AdministrationComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        Logger.info('Repositories sucessfully retrieved.', AdministrationComponent.name);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - importXml - Call the ImportService for upload a XML file to the server component and import the data of the XML file
   *
   *******************************************************************************************************************************************************************************************************/
  importDefinition() {
    this.uploader.setOptions({url: URL_IMPORT});
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      response = JSON.parse(response);
      for (let levelGraph of response.levelGraphs) {
        this.levelGraphService.updateLevelGraph(levelGraph)
          .subscribe(levelGraphResponse => {
             this.levelGraphs.push(levelGraphResponse);
          },
          (error) => {
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
          });
      }

      for (let topologyTemplates of response.topologyTemplates) {
        this.topologyTemplateService.updateTopologyTemplate(topologyTemplates)
          .subscribe(topologyTemplateResponse => {
             this.topologyTemplates.push(topologyTemplateResponse);
          },
          (error) => {
            this.flashMessage.message = error;
            this.flashMessage.isError = true;
            this.flashMessageService.display(this.flashMessage);
          });
      }

      this.repositories.push(response.repositories);

    };
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - exportLevelGraph - Call the ExportService for retrieve a repository in XML data structure and export the data of the body as XML file to Client/Bowser
   *
   * @param - levelGraph: LevelGraph - LevelGraph which should be exported from the database
   *
   *******************************************************************************************************************************************************************************************************/
  exportDefinition() {
    this.xmlExportSerivce.getXmlFile(URL_EXPORT).subscribe(
      res => {
        FileSaver.saveAs(res, 'ArchRefDefinition.xml');
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }
}
