import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedpropertyComponent } from './expectedproperty.component';

describe('ExpectedpropertyComponent', () => {
  let component: ExpectedpropertyComponent;
  let fixture: ComponentFixture<ExpectedpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
