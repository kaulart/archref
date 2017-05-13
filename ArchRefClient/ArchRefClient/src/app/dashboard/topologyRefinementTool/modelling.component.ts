import { NodeType } from '../../shared/datamodel/topologymodel/nodetype';
import { RelationshipType } from '../../shared/datamodel/topologymodel/relationshiptype';
import { TopologyTemplate } from '../../shared/datamodel/topologymodel/topologytemplate';
import { Component, OnInit } from '@angular/core';
import { NodeTypeService} from '../../shared/dataservices/nodetype.service';


@Component({
  selector: 'app-modelling',
  templateUrl: './modelling.component.html',
  styleUrls: ['./modelling.component.css'],
  providers: [NodeTypeService]
})

export class ModellingComponent implements OnInit {

  private currentTopologie: TopologyTemplate;
  private currentDragData: any;

  private nodeTypes: NodeType[] = [];
  private relationshipTypes: RelationshipType[] = [];

  nodes: Node[] = [];
  private mousedown = false;

  constructor(private nodeTypeService: NodeTypeService) { }

  moveNode(event: MouseEvent, node: Node) {

    if (this.mousedown === true) {
//       node.setPos_X(event.offsetX - node.getWidth() / 2);
//       node.setPos_Y(event.offsetY - node.getHeight() / 2);
    }

  }

  mouseUp(event, node: Node) {
     this.mousedown = false;
  }

  startMovingNode(event: MouseEvent, node: Node) {
      this.mousedown = true;
  }

  onDragOver(event) {
      event.preventDefault();

  }

  onDrag(event, dragData: any) {
      this.currentDragData = dragData;
  }

  onDrop(event) {
//      let newTempnode: Node = new Node("dummy", "dummy", "dummy",   event.offsetX,    event.offsetY, 50, 50);
//      this.nodes.push(newTempnode);
  }

  ngOnInit() {

  }

}
