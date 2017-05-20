import { Logger } from '../../../logger/logger';
import { Repository } from '../../shared/datamodel/repository';
import { RepositoryService } from '../../shared/dataservices/repository.service';
import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/*****************************************************************************************************************
 *
 * AdministrationComponent Class - Overview of the repositories, levelgraphs and topologies data
 *
 *****************************************************************************************************************/
export class AdministrationComponent implements OnInit {

  public repositories: Repository[] = [];
  public createdRepository: Repository;
  public editedRepository: Repository = new Repository('');
  public flashMessage = new FlashMessage();

  constructor(private repositoryService: RepositoryService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    Logger.info('Iniitalize Administration Component', AdministrationComponent.name);
    this.retrieveRepositoryData();
    this.flashMessage.timeoutInMS = 4000;
  }

  /****************************************************************************************************************
   *
   *  Create Repository
   *  @param name: string - Name of the repository
   *
   ****************************************************************************************************************/
  createRepository(name: string) {
    Logger.info('Create Repository', AdministrationComponent.name);
    let repository: Repository = new Repository(name);
    this.repositoryService.createRepository(repository)
      .subscribe(repositoryResponse => {
        this.repositories.push(repositoryResponse);
        this.flashMessage.message = 'Info: Repository with name: ' + repositoryResponse.name + ' was created sucessfully with id: ' + repositoryResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with name: ' + repositoryResponse.name + ' was created sucessfully with id: ' + repositoryResponse.id, AdministrationComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        });
  }

  /****************************************************************************************************************
   *
   * Retrieve Repository Data - Load all data from database
   *
   ****************************************************************************************************************/
  private retrieveRepositoryData() {
    Logger.info('Retrieve Repository Data', AdministrationComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        this.flashMessage.message = 'Repositories retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repositories sucessfully retrieved.', AdministrationComponent.name);
      },
       (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        });
  }

  /*****************************************************************************************************************
  *
  * Update Repository - Update the repository data
  * @param name - New name of the Repository
  *
  *****************************************************************************************************************/
  updateRepository(name: string) {
    Logger.info('Update Repository', AdministrationComponent.name);
    this.editedRepository.name = name;
    this.repositoryService.updateRepository(this.editedRepository)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.updateElementInArry(repositoryResponse, this.repositories);
        this.flashMessage.message = 'Repository with id: ' + repositoryResponse.id + ' and name: ' + repositoryResponse.name + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with id: ' + repositoryResponse.id + ' and name:' + repositoryResponse.name + ' was updated sucessfully.', AdministrationComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        });
  }

  /****************************************************************************************************************
   *
   * Delete Repository
   * @param id: number - ID of the repository witch should be deleted from the database
   *
   ****************************************************************************************************************/
  deleteRepository(id: number, event) {
    Logger.info('Delete Repository', AdministrationComponent.name);
    this.repositoryService.deleteRepository(id)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.deleteElementFromArry(id, this.repositories);
        this.flashMessage.message = 'Repository with id: ' + id + ' was deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with id: ' + id + ' was deleted sucessfully.', AdministrationComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
        });
  }

  /*****************************************************************************************************************
   *
   * Set the editable Repository Data
   * @param repository - The repository witch should be edit
   *
   ****************************************************************************************************************/
  setEditRepositoryData(repository) {
    Logger.info('Set Edit Repository Data', AdministrationComponent.name);
    this.editedRepository = repository;
  }

}
