
import { Utility } from '../../../../utility';
import { Entity } from '../../../datamodels/entity/entity';
import { ExpectedProperty } from '../../../datamodels/metrics/expectedproperty';
import { ExpectedPropertyService } from '../../../dataservices/metrics/expectedproperty.service';
import { RelationshipTypeService } from '../../../dataservices/types/relationshiptype.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expectedproperty',
  templateUrl: './expectedproperty.component.html',
  styleUrls: ['./expectedproperty.component.css']
})
export class ExpectedPropertyComponent implements OnInit {

  @Input()
  entity: Entity;

  createdExpectedProperty: ExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');
  editExpectedProperty: ExpectedProperty = new ExpectedProperty('Unnamed', 'Undefined');

  constructor(private relationshipTypeService: RelationshipTypeService, private expectedPropertyService: ExpectedPropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.createdExpectedProperty.entityExpected = this.entity;
    this.expectedPropertyService.createExpectedProperty(this.createdExpectedProperty).subscribe(responseExpectedProperty =>
      this.entity.expectedProperties.push(responseExpectedProperty));
  }

  updateProperty() {
    this.expectedPropertyService.updateExpectedProperty(this.editExpectedProperty).subscribe(responseExpectedProperty =>
      this.entity.expectedProperties = Utility.updateElementInArry(responseExpectedProperty, this.entity.expectedProperties));
  }

  deleteProperty(id: number) {
    this.expectedPropertyService.deleteExpectedProperty(id).subscribe(response =>
      this.entity.expectedProperties = Utility.updateElementInArry(id, this.entity.expectedProperties));
  }

  setProperty(expectedProperty: ExpectedProperty) {
    this.editExpectedProperty = expectedProperty;
  }
}
