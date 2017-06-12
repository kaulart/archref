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
 * @component RepositoryDetailsComponent - Lazy loaded component as wrapper for all other components in the
 *                                         RepositoryDetailsComponent
 *
 * @field currentRepository: Repository - Repository which is currently displayed
 * @field flashMessage: FlashMessage - For display errors and warnings you can also use it for display success messages but this may a
 *                                     cause a "Over Flash" for the user experience
 *
 * @author Arthur Kaul
 *
 ****************************************************************************************************************************/
export class RepositoryDetailsComponent implements OnInit {

  currentRepository: Repository = new Repository();
  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router, private repositoryService: RepositoryService, private flashMessageService: FlashMessageService) { }

  /*********************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   ********************************************************************************************************************************************/
  ngOnInit() {
    Logger.info('Iniitalize RepositoryDetailsComponent', RepositoryDetailsComponent.name);
    this.route.queryParams.subscribe(params => {
      this.currentRepository.name = params['name'] || 'Unnamed';
    });

    this.route.queryParams.subscribe(params => {
      this.currentRepository.id = params['id'] || null;
    });

    this.retrieveRepositoryData(this.currentRepository.id);

  }

  /*********************************************************************************************************************************************
   *
   * @method retrieveRepositoryData - Call the RepositoryService for loading repository from database into the application and subscribe
   *                                  for a callback.
   *
   * @param id: number - ID of the Repository which should be loaded from the database
   *
   ********************************************************************************************************************************************/
  retrieveRepositoryData(id: number) {
    Logger.info('Retrieve Repository Data', RepositoryDetailsComponent.name);
    this.repositoryService.getRepository(id)
      .subscribe(repositoryResponse => {
        this.currentRepository = repositoryResponse;
        Logger.info('Repositories sucessfully retrieved.', RepositoryDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }

}
