import {Logger} from '../../../../logger/logger';
import {Repository} from '../../datamodels/repository/repository';
import {RepositoryService} from '../../dataservices/repository/repository.service';
import {Utility} from '../../../utility';
import {Constants} from '../../constants/constants';
import {ExportXmlService} from '../../dataservices/exportxml.service';
import {Component, OnInit, Input} from '@angular/core';
import {FlashMessageService} from 'angular2-flash-message';
import {FlashMessage} from 'angular2-flash-message';
import * as FileSaver from 'file-saver';
import {FileUploader} from 'ng2-file-upload';

// URL for XML Import
const URL_IMPORT = '/api/import/repository';

// URL for XML Export
const URL_EXPORT = '/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})

/**********************************************************************************************************************************************************************************************************
 *
 * @component - RepositoryComponent Class - The component retrieve all available repositories in the database and list them. You can
 *                                          delete, import, export or edit the repository. Also you can select a repository and
 *                                          call the RepositoryDetailComponent where you can see all data which are included in a repository.
 *
 * @field - repositories: Repository[] - List of all available Repositories in the database
 * @field - createdRepository: Repository -  Repository which should be created
 * @field - editedRepository: Repository - Repository which should be edit
 * @field - flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may
 *                                       cause a "Over Flash" for the user experience
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RepositoryComponent implements OnInit {

  @Input()
  public repositories: Repository[] = [];

  public createdRepository: Repository = new Repository();
  public editedRepository: Repository = new Repository();
  public flashMessage = new FlashMessage();

  public uploader: FileUploader = new FileUploader({});

  constructor(private xmlExportSerivce: ExportXmlService,
    private repositoryService: RepositoryService,
    private flashMessageService: FlashMessageService) {}

  /********************************************************************************************************************************************************************************************************
   *
   * @method - ngOnInit - Is called when the component is initialized
   *
   *******************************************************************************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Initialize Repository Component', RepositoryComponent.name);
    this.flashMessage.timeoutInMS = Constants.FLASHMESSAGETIMEOUT;
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - createRepository - Call the RepositoryService for creating a new Repository in the database and subscribe for a callback
   *
   *******************************************************************************************************************************************************************************************************/
  createRepository() {
    Logger.info('Create Repository', RepositoryComponent.name);
    this.repositoryService.createRepository(this.createdRepository)
      .subscribe(repositoryResponse => {
        this.repositories.push(repositoryResponse);
        Logger.info('Repository with name: ' + repositoryResponse.name + ' was created sucessfully with id: ' + repositoryResponse.id, RepositoryComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - retrieveRepositories - Call the RepositoryService for loading all repositories from database into the application and subscribe
   *                                  for a callback. Currently no pagination/streaming of data is supported
   *
   *******************************************************************************************************************************************************************************************************/
  retrieveRepositories() {
    Logger.info('Retrieve Repository Data', RepositoryComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        Logger.info('Repositories sucessfully retrieved.', RepositoryComponent.name);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - updateRepository - Call the RepositoryService for updating the repository in the database and subscribe for a callback.
   *
   * @param - name: string - New name of the Repository
   *
   *******************************************************************************************************************************************************************************************************/
  updateRepository(name: string) {
    Logger.info('Update Repository', RepositoryComponent.name);
    this.editedRepository.name = name;
    this.repositoryService.updateRepository(this.editedRepository)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.updateElementInArry(repositoryResponse, this.repositories);
        Logger.info('Repository with id: ' + repositoryResponse.id + ' and name:' + repositoryResponse.name + ' was updated sucessfully.', RepositoryComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - deleteRepository - Call the RepositoryService for delete a repository from the database and subscribe for a callback.
   *
   * @param - id: number - ID of the repository witch should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  deleteRepository(id: string, event) {
    Logger.info('Delete Repository', RepositoryComponent.name);
    this.repositoryService.deleteRepository(id)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.deleteElementFromArryS(id, this.repositories);
        Logger.info('Repository with id: ' + id + ' was deleted sucessfully.', RepositoryComponent.name);
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
  importRepository() {
    this.uploader.setOptions({url: URL_IMPORT});
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let rep: Repository = new Repository();
      rep = JSON.parse(response);
      this.repositories.push(rep);
    };
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - exportRepository - Call the ExportService for retrieve a repository in XML data structure and export the data of the body as XML file to Client/Bowser
   *
   * @param - repository: Repository - Repository which should be exported from the database
   *
   *******************************************************************************************************************************************************************************************************/
  exportRepository(repository: Repository) {
    this.xmlExportSerivce.getXmlFile(URL_EXPORT + '/' + repository.id).subscribe(
      res => {
        FileSaver.saveAs(res, repository.name + '.xml');
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @method - setEditRepositoryData - Set the edit Repository Data
   *
   * @param - repository - The repository witch should be edit
   *
   *******************************************************************************************************************************************************************************************************/
  setEditRepositoryData(repository) {
    Logger.info('Set Edit Repository Data', RepositoryComponent.name);
    this.editedRepository = repository;
  }
}
