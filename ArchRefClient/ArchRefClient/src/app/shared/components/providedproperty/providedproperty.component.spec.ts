import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidedpropertyComponent } from './providedproperty.component';

describe('ProvidedpropertyComponent', () => {
  let component: ProvidedpropertyComponent;
  let fixture: ComponentFixture<ProvidedpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidedpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidedpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
