import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshiptypedetailsComponent } from './relationshiptypedetails.component';

describe('RelationshiptypedetailsComponent', () => {
  let component: RelationshiptypedetailsComponent;
  let fixture: ComponentFixture<RelationshiptypedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshiptypedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshiptypedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
