import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshiptemplatedetailsComponent } from './relationshiptemplatedetails.component';

describe('RelationshiptemplatedetailsComponent', () => {
  let component: RelationshiptemplatedetailsComponent;
  let fixture: ComponentFixture<RelationshiptemplatedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshiptemplatedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshiptemplatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
