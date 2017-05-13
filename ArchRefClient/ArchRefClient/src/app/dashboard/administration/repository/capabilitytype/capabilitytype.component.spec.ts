import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitytypeComponent } from './capabilitytype.component';

describe('CapabilitytypeComponent', () => {
  let component: CapabilitytypeComponent;
  let fixture: ComponentFixture<CapabilitytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilitytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
