import { AdministrationService } from '../../../shared/dataservices/administration.service';
import { NodeTypeService } from '../../../shared/dataservices/nodetype.service';
import { RelationshipTypeService } from '../../../shared/dataservices/relationshiptype.service';

import { NodeType } from '../../../shared/nodetype';
import { RelationshipType } from '../../../shared/relationshiptype';

import { Repository } from '../../../shared/repository';
import { Utility } from '../../../utility';
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

  constructor(  private route: ActivatedRoute,
    private router: Router, private nodeTypeService: NodeTypeService, private administrationService: AdministrationService, private relationshipTypeService: RelationshipTypeService) { }

  ngOnInit() {

     this.sub = this.route.queryParams.subscribe(params => {
        this.repositoryName = params['name'] || 'Unnamed';
      });

     this.sub = this.route.queryParams.subscribe(params => {
        this.repositoryId = params['id'] || null;
      });

     this.loadRepositoryData( this.repositoryId);

  }

  loadRepositoryData(id: number) {
      this.administrationService.getRepository(id).subscribe(repository => this.setRepositoryData(repository));
  }

  setRepositoryData(repository: Repository){
    this.currentRepository = repository;
  }

//  private loadNodeTypes() {
//      this.nodeTypeService.getNodeTypes().subscribe(nodeTypes => this.nodeTypeList = nodeTypes);
//  }

   private createNodeType(name: string) {
       alert("AddNewNodeType: name = " + name);
       let nodeType: NodeType = new NodeType(name, this.currentRepository);
       this.nodeTypeService.createNodeType(nodeType).subscribe(createdNodeType => this.currentRepository.nodeTypeList.push(createdNodeType));
  }

  private deleteNodeType(id: string) {
      alert("DeleteNodeType");
      event.stopPropagation();
      this.nodeTypeService.deleteNodeType(id).subscribe(res =>  this.currentRepository.nodeTypeList = Utility.deleteElementFromArry(id, this.currentRepository.nodeTypeList));
  }


//  private loadRelationTypes() {
//        this.relationshipTypeService.getRelationshipTypes().subscribe(relationTypes => this.relationshipTypeList = relationTypes);
//  }

   private createRelationshipType(name: string) {
       alert("AddNewRelationshipType: name = " + name);
       let relationshipType: RelationshipType = new RelationshipType(name, this.currentRepository);
       this.relationshipTypeService.createRelationshipType(relationshipType).subscribe(createdRelationshipType => this.currentRepository.relationshipTypeList.push(createdRelationshipType));
  }
  
   private editRelationType(id: string) {

  }

  private exportRelationType(id: string) {

  }

  private deleteRelationshipType(id: string) {
      alert("DeleteRelationType");
      event.stopPropagation();
      this.relationshipTypeService.deleteRelationshipType(id).subscribe(res =>  this.currentRepository.relationshipTypeList = Utility.deleteElementFromArry(id, this.currentRepository.relationshipTypeList));
  }

}
