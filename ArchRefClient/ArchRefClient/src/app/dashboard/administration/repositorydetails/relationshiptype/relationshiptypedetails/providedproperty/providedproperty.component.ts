import { ProvidedProperty } from '../../../../../../shared/datamodels/metrics/providedproperty';
import { RelationshipType } from '../../../../../../shared/datamodels/types/relationshiptype';
import { ProvidedPropertyService } from '../../../../../../shared/dataservices/metrics/providedpropertyservice.service';
import { RelationshipTypeService } from '../../../../../../shared/dataservices/types/relationshiptype.service';
import { Utility } from '../../../../../../utility';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-providedproperty',
  templateUrl: './providedproperty.component.html',
  styleUrls: ['./providedproperty.component.css']
})

export class ProvidedPropertyComponent implements OnInit {

  @Input()
  currentRelationshipType: RelationshipType;

  createdProvidedProperty: ProvidedProperty = new ProvidedProperty();
  editProvidedProperty: ProvidedProperty = new ProvidedProperty();

  constructor(private relationshipTypeService: RelationshipTypeService, private providedPropertyService: ProvidedPropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.createdProvidedProperty.entityProvided = this.currentRelationshipType;
    this.providedPropertyService.createProvidedProperty(this.createdProvidedProperty).subscribe(responseProperty =>
      this.currentRelationshipType.providedProperties.push(responseProperty));
  }

  updateProperty() {
    this.providedPropertyService.updateProvidedProperty(this.editProvidedProperty).subscribe(responseProperty =>
      this.currentRelationshipType.providedProperties = Utility.updateElementInArry(responseProperty, this.currentRelationshipType.providedProperties));
  }

  deleteProperty(id: number) {
    this.providedPropertyService.deleteProvidedProperty(id).subscribe(response =>
      this.currentRelationshipType.providedProperties = Utility.deleteElementFromArry(id, this.currentRelationshipType.providedProperties));
  }

  setProperty(providedProperty: ProvidedProperty) {
    this.editProvidedProperty = providedProperty;
  }

}
