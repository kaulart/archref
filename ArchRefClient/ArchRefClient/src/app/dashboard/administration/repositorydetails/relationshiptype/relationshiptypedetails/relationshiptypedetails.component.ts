import { Logger } from '../../../../../../logger/logger';
import { RelationshipType } from '../../../../../shared/datamodels/types/relationshiptype';
import { RelationshipTypeService } from '../../../../../shared/dataservices/types/relationshiptype.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'angular2-flash-message';
import { FlashMessage } from 'angular2-flash-message';

@Component({
  selector: 'app-relationshiptypedetails',
  templateUrl: './relationshiptypedetails.component.html',
  styleUrls: ['./relationshiptypedetails.component.css']
})

export class RelationshipTypeDetailsComponent implements OnInit {

  currentRelationshipType: RelationshipType = new RelationshipType('', null);

  public flashMessage = new FlashMessage();

  constructor(private route: ActivatedRoute,
    private router: Router, private relationshipTypeService: RelationshipTypeService, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    Logger.info('Iniitalize RelationshipTypeDetails Component', RelationshipTypeDetailsComponent.name);
    this.route.queryParams.subscribe(params => {
      this.currentRelationshipType.name = params['name'] || 'Unnamed';
    });

    this.route.queryParams.subscribe(params => {
      this.currentRelationshipType.id = params['id'] || null;
    });

    this.retrieveNodeType(this.currentRelationshipType.id);

  }

  /****************************************************************************************************************
   *
   * Retrieve NodeType - Load NodeType with id from the database
   * @param id: number - ID of the NodeType witch should be loaded
   *
   ****************************************************************************************************************/
  retrieveNodeType(id: number) {

    this.relationshipTypeService.getRelationshipType(id)
      .subscribe(relationshipTypeResponse => {
        this.currentRelationshipType = relationshipTypeResponse;
        this.flashMessage.message = 'Relationship Type with id: ' + relationshipTypeResponse.id + ' and name: ' + relationshipTypeResponse.name + ' retrieved sucessfully. ';
        this.flashMessage.isSuccess = true;
        this.flashMessageService.display(this.flashMessage);
        Logger.info('Relationship Type sucessfully retrieved.', RelationshipTypeDetailsComponent.name);
      },
      (error) => {
        this.flashMessage.message = error;
        this.flashMessage.isError = true;
        this.flashMessageService.display(this.flashMessage);
      });
  }


}
