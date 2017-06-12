import { ExpectedProperty } from '../../../../../../shared/datamodels/metrics/expectedproperty';
import { RelationshipType } from '../../../../../../shared/datamodels/types/relationshiptype';
import { ExpectedPropertyService } from '../../../../../../shared/dataservices/metrics/expectedproperty.service';
import { RelationshipTypeService } from '../../../../../../shared/dataservices/types/relationshiptype.service';
import { Utility } from '../../../../../../utility';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expectedproperty',
  templateUrl: './expectedproperty.component.html',
  styleUrls: ['./expectedproperty.component.css']
})
export class ExpectedPropertyComponent implements OnInit {

  @Input()
  currentRelationshipType: RelationshipType;

  createdExpectedProperty: ExpectedProperty = new ExpectedProperty();
  editExpectedProperty: ExpectedProperty = new ExpectedProperty();

  constructor(private relationshipTypeService: RelationshipTypeService, private expectedPropertyService: ExpectedPropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.createdExpectedProperty.entityExpected = this.currentRelationshipType;
    this.expectedPropertyService.createExpectedProperty(this.createdExpectedProperty).subscribe(responseExpectedProperty =>
      this.currentRelationshipType.expectedProperties.push(responseExpectedProperty));
  }

  updateProperty() {
    this.expectedPropertyService.updateExpectedProperty(this.editExpectedProperty).subscribe(responseExpectedProperty =>
      this.currentRelationshipType.expectedProperties = Utility.updateElementInArry(responseExpectedProperty, this.currentRelationshipType.expectedProperties));
  }

  deleteProperty(id: number) {
    this.expectedPropertyService.deleteExpectedProperty(id).subscribe(response =>
      this.currentRelationshipType.expectedProperties = Utility.updateElementInArry(id, this.currentRelationshipType.expectedProperties));
  }

  setProperty(expectedProperty: ExpectedProperty) {
    this.editExpectedProperty = expectedProperty;
  }
}
