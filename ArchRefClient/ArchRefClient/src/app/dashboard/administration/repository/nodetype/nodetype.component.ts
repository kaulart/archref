import { Repository } from '../../../../shared/datamodel/repository';
import { NodeType } from '../../../../shared/datamodel/topologymodel/nodetype';
import { NodeTypeService } from '../../../../shared/dataservices/nodetype.service';
import { Utility } from '../../../../utility';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'api/icon';

@Component({
  selector: 'app-nodetype',
  inputs: ['currentRepository'],
  templateUrl: './nodetype.component.html',
  styleUrls: ['./nodetype.component.css']
})
export class NodeTypeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver:boolean = false;

  currentRepository: Repository = new Repository('');

  constructor(private nodeTypeService: NodeTypeService) { }

  ngOnInit() {
  }

  private createNodeType(name: string) {
    alert(this.currentRepository);
    let nodeType: NodeType = new NodeType(name, this.currentRepository);
    this.nodeTypeService.createNodeType(nodeType).subscribe(createdNodeType => this.currentRepository.nodeTypeList.push(createdNodeType));
  }

  private deleteNodeType(id: number) {

    event.stopPropagation();
    this.nodeTypeService.deleteNodeType(id).subscribe(res => this.currentRepository.nodeTypeList = Utility.deleteElementFromArry(id, this.currentRepository.nodeTypeList));
  }

    public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
