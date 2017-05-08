import { AdministrationService } from '../../shared/dataservices/administration.service';
import { Repository } from '../../shared/repository';
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

  constructor(  private administrationDataService: AdministrationService) { }

  ngOnInit() {
      this.loadAdministrationData();
  }

  private addRepository(name: string) {

    let repository: Repository = new Repository(name);
    this.administrationDataService.addRepository(repository).subscribe(repositoryCreated => this.repositories.push(repositoryCreated));
  }

  private deleteRepository(id: string, event) {

    event.stopPropagation();
    this.administrationDataService.deleteRepository(id).subscribe(res =>  this.repositories = Utility.deleteElementFromArry(id, this.repositories));
  }

  private loadAdministrationData() {
      this.administrationDataService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

}
