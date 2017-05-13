import { Logger } from '../../../../logger/logger';
import { Repository } from '../../../shared/datamodel/repository';
import { AdministrationService } from '../../../shared/dataservices/administration.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  currentRepository: Repository = new Repository('');

  repositoryName: string;
  repositoryId: number;
  private sub: any;

  constructor(private route: ActivatedRoute,
    private router: Router, private administrationService: AdministrationService) { }

  ngOnInit() {
    Logger.info('Iniitalize Repository Component', RepositoryComponent.name);
    this.sub = this.route.queryParams.subscribe(params => {
      this.repositoryName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.repositoryId = params['id'] || null;
    });

    this.loadRepositoryData(this.repositoryId);

  }

  loadRepositoryData(id: number) {
    Logger.info('Load Repository Data', RepositoryComponent.name);
    this.administrationService.getRepository(id).subscribe(repository => this.currentRepository = repository);
  }

}
