import { Logger } from '../../../../logger/logger';
import { Repository } from '../../../shared/datamodels/repository';
import { RepositoryService } from '../../../shared/dataservices/repository.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-repositorydetails',
  templateUrl: './repositorydetails.component.html',
  styleUrls: ['./repositorydetails.component.css']
})

/*****************************************************************************************************************************
 *
 * @component AdministrationComponent - Lazy loaded component as wrapper for all other components in the
 *                                      AdministrationComponent
 *
 * @author Arthur Kaul
 *
 ****************************************************************************************************************************/
export class RepositoryDetailsComponent implements OnInit {

  currentRepository: Repository = new Repository('');

  repositoryName: string;
  repositoryId: number;

  public flashMessage = new FlashMessage();
  private sub: any;

  constructor(private route: ActivatedRoute,
    private router: Router, private repositoryService: RepositoryService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    Logger.info('Iniitalize RepositoryDetails Component', RepositoryDetailsComponent.name);
    this.sub = this.route.queryParams.subscribe(params => {
      this.repositoryName = params['name'] || 'Unnamed';
    });

    this.sub = this.route.queryParams.subscribe(params => {
      this.repositoryId = params['id'] || null;
    });

    this.retrieveRepositoryData(this.repositoryId);

  }

  /****************************************************************************************************************
  *
  * Retrieve Repository Data - Load Repository with id from the database
  * @param id: number - ID of the Repository witch should be loaded
  *
  ****************************************************************************************************************/
  retrieveRepositoryData(id: number) {
    Logger.info('Retrieve Repository Data', RepositoryDetailsComponent.name);
    this.repositoryService.getRepository(id)
      .subscribe(repositoryResponse => {
        this.currentRepository = repositoryResponse;
        this.flashMessage.message = 'Repository with id: ' + repositoryResponse.id + ' and name: ' + repositoryResponse.name + ' retrieved sucessfully. ';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Repositories sucessfully retrieved.', RepositoryDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
