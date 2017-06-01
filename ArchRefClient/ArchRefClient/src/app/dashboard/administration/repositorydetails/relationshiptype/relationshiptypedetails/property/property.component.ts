import { Property } from '../../../../../../shared/datamodel/topologymodel/property';
import { RelationshipType } from '../../../../../../shared/datamodel/topologymodel/relationshiptype';
import { PropertyService } from '../../../../../../shared/dataservices/property.service';
import { RelationshipTypeService } from '../../../../../../shared/dataservices/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  @Input()
  currentRelationshipType: RelationshipType;

  submitted = false;

  property: Property = new Property('Unnamed', 'Undefined');
  editProperty: Property = new Property('Unnamed', 'Undefined');

  constructor(private relationshipTypeService: RelationshipTypeService, private propertyService: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {

    this.property.relationshipType = this.currentRelationshipType;
    this.propertyService.createProperty(this.property).subscribe(responseProperty =>
      this.relationshipTypeService.getRelationshipType(this.currentRelationshipType.id).subscribe(responseRelationshipType => this.currentRelationshipType = responseRelationshipType));

  }

  updateProperty() {
    this.propertyService.updateProperty(this.editProperty).subscribe(responseProperty =>
      this.relationshipTypeService.getRelationshipType(this.currentRelationshipType.id).subscribe(responseRelationshipType => this.currentRelationshipType = responseRelationshipType));
  }

  deleteProperty(id: number) {
    this.propertyService.deleteProperty(id).subscribe(response =>
      this.relationshipTypeService.deleteRelationshipType(this.currentRelationshipType.id).subscribe(responseRelationshipType => this.currentRelationshipType = responseRelationshipType));
  }

  setProperty(property: Property) {

    this.editProperty = new Property(property.name, property.value);
    this.editProperty.id = property.id;

    let relationshipType = new RelationshipType(this.currentRelationshipType.name, this.currentRelationshipType.getRepository());
    relationshipType.providedProperties = [];
    relationshipType.id = this.currentRelationshipType.id;
    this.editProperty.relationshipType = relationshipType;

  }

}
