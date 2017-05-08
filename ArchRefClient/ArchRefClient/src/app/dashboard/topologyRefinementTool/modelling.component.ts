import { Node } from '../../shared/node';
import { Component, OnInit } from '@angular/core';
import { NodeTypeService} from '../../shared/dataservices/nodetype.service';
import { Topology} from '../../shared/topology';
import { RelationType } from '../../shared/relationtype';
import { NodeType } from '../../shared/nodetype';


@Component({
  selector: 'app-modelling',
  templateUrl: './modelling.component.html',
  styleUrls: ['./modelling.component.css'],
  providers: [NodeTypeService]
})

export class ModellingComponent implements OnInit {

  private currentTopologie: Topology;
  private currentDragData: any;

  node1: NodeType = new NodeType('test', "0");
  node2: NodeType = new NodeType('test', "0");
  node3: NodeType = new NodeType('test', "0");
  
  relation1: RelationType = new RelationType('test', "0");
  relation2: RelationType = new RelationType('test', "0");
  relation3: RelationType = new RelationType('test', "0");

  private nodeTypes: NodeType[] = [this.node1, this.node2, this.node3];
  private relationTypes: RelationType[] = [];


  nodes: Node[] = [];
  private mousedown = false;

  constructor(private nodeTypeService: NodeTypeService) { }

  moveNode(event: MouseEvent, node: Node) {

    if (this.mousedown === true) {
       node.setPos_X(event.offsetX - node.getWidth() / 2);
       node.setPos_Y(event.offsetY - node.getHeight() / 2);
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
      let newTempnode: Node = new Node("dummy", "dummy", "dummy",   event.offsetX,    event.offsetY, 50, 50);
      this.nodes.push(newTempnode);
  }

  ngOnInit() {

  }

}
