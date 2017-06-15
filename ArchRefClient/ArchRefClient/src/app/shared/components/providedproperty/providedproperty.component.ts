import { Utility } from '../../../utility';
import { Entity } from '../../datamodels/entity/entity';
import { ProvidedProperty } from '../../datamodels/metrics/providedproperty';
import { ProvidedPropertyService } from '../../dataservices/metrics/providedpropertyservice.service';
import { RelationshipTypeService } from '../../dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-providedproperty',
  templateUrl: './providedproperty.component.html',
  styleUrls: ['./providedproperty.component.css']
})

export class ProvidedPropertyComponent implements OnInit {

  @Input()
  entity: Entity;

  createdProvidedProperty: ProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');
  editProvidedProperty: ProvidedProperty = new ProvidedProperty('Unnamed', 'Undefined');

  constructor(private relationshipTypeService: RelationshipTypeService,
               private providedPropertyService: ProvidedPropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.createdProvidedProperty.entityProvided = this.entity;
    this.providedPropertyService.createProvidedProperty(this.createdProvidedProperty).subscribe(responseProperty =>
      this.entity.providedProperties.push(responseProperty));
  }

  updateProperty() {
    this.providedPropertyService.updateProvidedProperty(this.editProvidedProperty).subscribe(responseProperty =>
      this.entity.providedProperties = Utility.updateElementInArry(responseProperty, this.entity.providedProperties));
  }

  deleteProperty(id: number) {
    this.providedPropertyService.deleteProvidedProperty(id).subscribe(response =>
      this.entity.providedProperties = Utility.deleteElementFromArry(id, this.entity.providedProperties));
  }

  setProperty(providedProperty: ProvidedProperty) {
    this.editProvidedProperty = providedProperty;
  }

}
