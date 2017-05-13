import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicytypeComponent } from './policytype.component';

describe('PolicytypeComponent', () => {
  let component: PolicytypeComponent;
  let fixture: ComponentFixture<PolicytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
