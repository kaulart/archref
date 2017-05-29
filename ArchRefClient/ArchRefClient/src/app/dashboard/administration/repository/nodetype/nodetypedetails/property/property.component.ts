import { NodeType } from '../../../../../../shared/datamodel/topologymodel/nodetype';
import { Property } from '../../../../../../shared/datamodel/topologymodel/property';
import { PropertyService } from '../../../../../../shared/dataservices/property.service';
import { NodeTypeService } from '../../../../../../shared/dataservices/nodetype.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  @Input()
  currentNodeType: NodeType;

  submitted = false;

  property: Property = new Property('Unnamed', 'Undefined');

  constructor(private nodeTypeService: NodeTypeService, private propertyService: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {

    this.propertyService.createProperty(this.property).subscribe(responseProperty =>
    this.nodeTypeService.getNodeType(this.currentNodeType.id).subscribe(responseNodeType => this.currentNodeType = responseNodeType));

  }

  deleteProperty(id: number) {
    this.propertyService.deleteProperty(id).subscribe();
  }

  updateProperty() {
    //TODO
  }

}
