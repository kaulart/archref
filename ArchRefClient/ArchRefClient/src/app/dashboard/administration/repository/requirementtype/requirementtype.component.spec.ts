import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementtypeComponent } from './requirementtype.component';

describe('RequirementtypeComponent', () => {
  let component: RequirementtypeComponent;
  let fixture: ComponentFixture<RequirementtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
