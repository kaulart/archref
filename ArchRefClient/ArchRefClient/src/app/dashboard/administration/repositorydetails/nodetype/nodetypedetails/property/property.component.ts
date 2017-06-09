import { Property } from '../../../../../../shared/datamodels/metrics/property';
import { NodeType } from '../../../../../../shared/datamodels/types/nodetype';
import { PropertyService } from '../../../../../../shared/dataservices/metrics/property.service';
import { NodeTypeService } from '../../../../../../shared/dataservices/types/nodetype.service';

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
  editProperty: Property = new Property('Unnamed', 'Undefined');

  constructor(private nodeTypeService: NodeTypeService, private propertyService: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {

    this.property.nodeType = this.currentNodeType;
    this.propertyService.createProperty(this.property).subscribe(responseProperty =>
      this.nodeTypeService.getNodeType(this.currentNodeType.id).subscribe(responseNodeType => this.currentNodeType = responseNodeType));

  }

  updateProperty() {

    this.propertyService.updateProperty(this.editProperty).subscribe(responseProperty =>
      this.nodeTypeService.getNodeType(this.currentNodeType.id).subscribe(responseNodeType => this.currentNodeType = responseNodeType));

  }

  deleteProperty(id: number) {
    this.propertyService.deleteProperty(id).subscribe(response =>
      this.nodeTypeService.getNodeType(this.currentNodeType.id).subscribe(responseNodeType => this.currentNodeType = responseNodeType));
  }

  setProperty(property: Property) {

    this.editProperty = new Property(property.name, property.value);
    this.editProperty.id = property.id;

    let nodeType = new NodeType(this.currentNodeType.name, this.currentNodeType.repository.id);
    nodeType.providedProperties = [];
    nodeType.id = this.currentNodeType.id;
    this.editProperty.nodeType = nodeType;


  }

}
