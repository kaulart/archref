import { AdministrationService } from '../../shared/dataservices/administration.service';
import { Repository } from '../../shared/repository';
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

  private importRepository() {
    alert("IMportNewRepository");
  }

  private addRepository(name: string) {
    alert("AddNewRepository");
    let repository: Repository = new Repository(name);
    this.administrationDataService.addRepository(repository).subscribe(repositories => this.repositories.push(repositories));
  }

  private editRepository(id: string) {
    //this.administrationDataService.addRepository(name).subscribe(repositories => this.repositories.push(repositories));
  }

  private exportRepository(id: string) {
    alert("ExportNewRepository");
  }

  private deleteRepository(name: string, event) {

    alert("DeleteNewRepository"); alert(name);
      // event.stopPropagation();
    this.administrationDataService.deleteRepository(name).subscribe(res =>  this.repositories = this.deleteElementFromArry(new Repository(name), this.repositories));
  }

  private loadAdministrationData() {
      this.administrationDataService.getRepositories().subscribe(repositories => this.repositories = repositories);
  }

  ngOnInit() {
      this.loadAdministrationData();
  }

  deleteElementFromArry(element: Repository, array: any[]) {

      array =  array.filter(function( obj ) {
         return obj.name !== element.name;
      });

    return array;

  }

}
