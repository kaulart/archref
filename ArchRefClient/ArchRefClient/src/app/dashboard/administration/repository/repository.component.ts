import { NodeTypeService } from '../../../shared/dataservices/nodetype.service';
import { RelationTypeService } from '../../../shared/dataservices/relationtype.service';
import { NodeType } from '../../../shared/nodetype';
import { RelationType } from '../../../shared/relationtype';
import { Repository } from '../../../shared/repository';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  nodeTypeList: NodeType[] = [];

  relationTypeList: RelationType[] = [];
  currentRepository: Repository = new Repository('');
  name: string;
  private sub: any;

  constructor(  private route: ActivatedRoute,
    private router: Router, private nodeTypeService: NodeTypeService, private relationTypeService: RelationTypeService) { }

  ngOnInit() {

     this.sub = this.route.queryParams.subscribe(params => {
        this.name = params['name'] || 'Unnamed';
      });

    this.currentRepository.name = this.name;

    this.loadNodeTypes();
    this.loadRelationTypes();
  }

  private loadNodeTypes() {
      this.nodeTypeService.getNodeTypes().subscribe(nodeTypes => this.nodeTypeList = nodeTypes);
  }

   private addNodeType(id: string) {

  }

   private importNodeType(id: string) {

  }

   private editNodeType(id: string) {

  }

  private exportNodeType(id: string) {

  }

  private deleteNodeType(id: string) {

  }
  
  private loadRelationTypes() {
        this.relationTypeService.getRelationTypes().subscribe(relationTypes => this.relationTypeList = relationTypes);
  }

   private editRelationType(id: string) {

  }

  private exportRelationType(id: string) {

  }

  private deleteRelationType(id: string) {

  }

}
