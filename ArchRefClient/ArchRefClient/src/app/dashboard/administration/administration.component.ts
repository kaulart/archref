import { Logger } from '../../../logger/logger';
import { Repository } from '../../shared/datamodel/repository';
import { AdministrationService } from '../../shared/dataservices/administration.service';
import { Utility } from '../../utility';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

export class AdministrationComponent implements OnInit {

  public repositories: Repository[] = [];
  public createdRepository: Repository;
  public editedRepository: Repository = new Repository('');

  constructor(private administrationDataService: AdministrationService) { }

  ngOnInit() {
    Logger.info('Iniitalize Administration Component', AdministrationComponent.name);
    this.loadAdministrationData();
  }

  private createRepository(name: string) {
    Logger.info('Create Repository', AdministrationComponent.name);
    let repository: Repository = new Repository(name);
    Logger.data(JSON.stringify(repository), AdministrationComponent.name);
    this.administrationDataService.addRepository(repository).subscribe(repositoryCreated => this.repositories.push(repositoryCreated));
  }

  private deleteRepository(id: number, event) {
    Logger.info('Delete Repository', AdministrationComponent.name);
    this.administrationDataService.deleteRepository(id).subscribe(res => this.repositories = Utility.deleteElementFromArry(id, this.repositories));
  }

  private updateRepository(name: string) {
    Logger.info('Update Repository', AdministrationComponent.name);
    this.editedRepository.name = name;
    this.administrationDataService.updateRepository(this.editedRepository).subscribe(res => this.repositories = Utility.updateElementInArry(res, this.repositories));
  }

  private loadAdministrationData() {
    Logger.info('Load Repository Data', AdministrationComponent.name);
    this.administrationDataService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

  private setEditRepositoryData(repository) {
    Logger.info('Set Edit Repository Data', AdministrationComponent.name);
    this.editedRepository = repository;
  }

}
