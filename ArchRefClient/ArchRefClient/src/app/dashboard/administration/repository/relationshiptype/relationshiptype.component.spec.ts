import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshiptypeComponent } from './relationshiptype.component';

describe('RelationshiptypeComponent', () => {
  let component: RelationshiptypeComponent;
  let fixture: ComponentFixture<RelationshiptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshiptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshiptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
