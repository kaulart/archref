import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshiptemplateComponent } from './relationshiptemplate.component';

describe('RelationshiptemplateComponent', () => {
  let component: RelationshiptemplateComponent;
  let fixture: ComponentFixture<RelationshiptemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshiptemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshiptemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
