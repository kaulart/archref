import { Logger } from '../../../logger/logger';
import { Repository } from '../../shared/datamodel/repository';
import { RepositoryService } from '../../shared/dataservices/repository.service';
import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})

export class RepositoryComponent implements OnInit {

  public repositories: Repository[] = [];
  public createdRepository: Repository;
  public editedRepository: Repository = new Repository('');
  public flashMessage = new FlashMessage();

  constructor(private repositoryService: RepositoryService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    Logger.info('Iniitalize Repository Component', RepositoryComponent.name);
    this.flashMessage.timeoutInMS = 4000;
    this.retrieveRepositoryData();
  }

  /****************************************************************************************************************
   *
   *  Create Repository
   *  @param name: string - Name of the repository
   *
   ****************************************************************************************************************/
  createRepository(name: string) {
    Logger.info('Create Repository', RepositoryComponent.name);
    let repository: Repository = new Repository(name);
    this.repositoryService.createRepository(repository)
      .subscribe(repositoryResponse => {
        this.repositories.push(repositoryResponse);
        this.flashMessage.message = 'Info: Repository with name: ' + repositoryResponse.name + ' was created sucessfully with id: ' + repositoryResponse.id;
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with name: ' + repositoryResponse.name + ' was created sucessfully with id: ' + repositoryResponse.id, RepositoryComponent.name);
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
    Logger.info('Retrieve Repository Data', RepositoryComponent.name);
    this.repositoryService.getRepositories()
      .subscribe(repositoriesResponse => {
        this.repositories = repositoriesResponse;
        this.flashMessage.message = 'Repositories retrieved sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repositories sucessfully retrieved.', RepositoryComponent.name);
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
    Logger.info('Update Repository', RepositoryComponent.name);
    this.editedRepository.name = name;
    this.repositoryService.updateRepository(this.editedRepository)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.updateElementInArry(repositoryResponse, this.repositories);
        this.flashMessage.message = 'Repository with id: ' + repositoryResponse.id + ' and name: ' + repositoryResponse.name + ' was updated sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with id: ' + repositoryResponse.id + ' and name:' + repositoryResponse.name + ' was updated sucessfully.', RepositoryComponent.name);
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
    Logger.info('Delete Repository', RepositoryComponent.name);
    this.repositoryService.deleteRepository(id)
      .subscribe(repositoryResponse => {
        this.repositories = Utility.deleteElementFromArry(id, this.repositories);
        this.flashMessage.message = 'Repository with id: ' + id + ' was deleted sucessfully.';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repository with id: ' + id + ' was deleted sucessfully.', RepositoryComponent.name);
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
    Logger.info('Set Edit Repository Data', RepositoryComponent.name);
    this.editedRepository = repository;
  }
}
