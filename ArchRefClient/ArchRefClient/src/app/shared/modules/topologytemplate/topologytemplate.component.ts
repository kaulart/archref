import {Logger} from '../../../../logger/logger';
import {TopologyTemplate} from '../../datamodels/topology/topologytemplate';
import {LevelGraphService} from '../../dataservices/levelgraph/levelgraph.service';
import {TopologyTemplateService} from '../../dataservices/topologytemplate/topologytemplate.service';
import {Component, OnInit, Input} from '@angular/core';
import {Utility} from '../../../utility';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';
import * as FileSaver from 'file-saver';
import {FileUploader} from 'ng2-file-upload';
import {ExportXmlService} from '../../dataservices/exportxml.service';

const URL_IMPORT = '/api/import/topologytemplate';

// URL for XML Export
const URL_EXPORT = '/topologytemplate';


@Component({
  selector: 'app-topologytemplate',
  templateUrl: './topologytemplate.component.html',
  styleUrls: ['./topologytemplate.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - TopologyTemplateComponent - The component retrieve all available TopologyTemplates in the database and list them. You can
 *                                          delete, import, export or edit the TopologyTemplate. Also you can select a TopologyTemplate and
 *                                          call the TopologyTemplateDetailComponent where you can see all data which are included in a
 *                                          TopologyTemplate.
 *
 * @fields - topologyTemplates: TopologyTemplate[] - List of all available TopologyTemplates in the database
 * @fields - createdTopologyTemplate: TopologyTemplate - TopologyTemplate which should be created
 * @fields - editTopologyTemplate: TopologyTemplate - TopologyTemplate which should be edit
 * @fields - flashMessage = new FlashMessage() - for display errors and warnings you can also use it for display success messages but this may a cause a "Over-Flashing" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class TopologyTemplateComponent implements OnInit {

  @Input()
  topologyTemplates: TopologyTemplate[] = [];

  createdTopologyTemplate: TopologyTemplate = new TopologyTemplate();
  editTopologyTemplate: TopologyTemplate = new TopologyTemplate();
  public flashMessage = new FlashMessage();

  public uploader: FileUploader = new FileUploader({});

  constructor(private xmlExportSerivce: ExportXmlService, private flashMessageService: FlashMessageService, private topologyTemplateService: TopologyTemplateService, private levelGraphService: LevelGraphService) {}

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Initialize TopologyTemplateComponent', TopologyTemplateComponent.name);
    this.flashMessage.timeoutInMS = 4000;
  }

  /********************************************************************************************************************************************************************************************************
   *
   *  @method - createTopologyTemplate - Call the TopologyTemplateService for creating a new TopologyTemplate in the database
   *                                     and subscribe for a callback
   *
   *******************************************************************************************************************************************************************************************************/
  createTopologyTemplate() {
    Logger.info('Create TopologyTemplate', TopologyTemplateComponent.name);
    this.createdTopologyTemplate.abstractionLevel = 0;
    this.topologyTemplateService.createTopologyTemplate(this.createdTopologyTemplate)
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates.push(topologyTemplateResponse);
        Logger.info('TopologyTemplate with name: ' + topologyTemplateResponse.name + ' was created sucessfully with id: ' + topologyTemplateResponse.id, TopologyTemplateComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   *  @method - retrieveTopologyTemplates - Call the TopologyTemplateService for loading all TopologyTemplates from database into the application
   *                                        and subscribe for a callback. Currently no pagination/streaming of data is supported
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveTopologyTemplates() {
    Logger.info('Retrieve TopologyTemplate Data', TopologyTemplateComponent.name);
    this.topologyTemplateService.getTopologyTemplates()
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = topologyTemplateResponse;
        Logger.info('Topology Template sucessfully retrieved.', TopologyTemplateComponent.name);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - updateTopologyTemplate - Call the TopologyTemplateService for updating the repository in the database and subscribe for a callback.
   *
   * @param - name: string - New name of the TopologyTemplate
   *
   *******************************************************************************************************************************************************************************************************/
  updateTopologyTemplate(name: string) {
    Logger.info('Update TopologyTemplate', TopologyTemplateComponent.name);
    this.editTopologyTemplate.name = name;
    this.topologyTemplateService.updateTopologyTemplate(this.editTopologyTemplate)
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = Utility.updateElementInArry(topologyTemplateResponse, this.topologyTemplates);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.id + ' and name:' + topologyTemplateResponse.name + ' was updated sucessfully.', TopologyTemplateComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - deleteTopologyTemplate - Call the TopologyTemplateService for delete a TopologyTemplate from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the TopologyTemplate witch should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  deleteTopologyTemplate(id: number) {
    Logger.info('Delete TopologyTemplate', TopologyTemplateComponent.name);
    this.topologyTemplateService.deleteTopologyTemplate(id)
      .subscribe(topologyTemplateResponse => {
        this.topologyTemplates = Utility.deleteElementFromArry(id, this.topologyTemplates);
        Logger.info('Topology Template with id: ' + id + ' was deleted sucessfully.', TopologyTemplateComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - importRepository - Call the ImportService for upload a XML file to the server component and import the data of the XML file
   *
   *******************************************************************************************************************************************************************************************************/
  importTopologyTemplate() {
    this.uploader.setOptions({url: URL_IMPORT});
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let topologyTemplate: TopologyTemplate = new TopologyTemplate();
      topologyTemplate = JSON.parse(response);
        this.topologyTemplateService.updateTopologyTemplate(topologyTemplate)
      .subscribe(topologyTemplateResponse => {
         this.topologyTemplates.push(topologyTemplateResponse);
        Logger.info('Topology Template with id: ' + topologyTemplateResponse.id + ' and name:' + topologyTemplateResponse.name + ' was updated sucessfully.', TopologyTemplateComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
    };
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - exportRepository - Call the ExportService for retrieve a repository in XML data structure and export the data of the body as XML file to Client/Bowser
   *
   * @param - repository: Repository - Repository which should be exported from the database
   *
   *******************************************************************************************************************************************************************************************************/
  exportTopologyTemplate(topologyTemplate: TopologyTemplate) {
    this.xmlExportSerivce.getXmlFile(URL_EXPORT + '/' + topologyTemplate.id).subscribe(
        res => {
        FileSaver.saveAs(res, topologyTemplate.name + '.xml');
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * Set the editable TopologyTemplate Data
   * @param - topologyTemplate: TopologyTemplate - The TopologyTemplate witch should be edit
   *
   *******************************************************************************************************************************************************************************************************/
  setEditTopologyTemplate(topologyTemplate: TopologyTemplate) {
    this.editTopologyTemplate = topologyTemplate;
  }

}
