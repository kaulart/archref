import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataadministrationComponent } from './dataadministration.component';

describe('DataadministrationComponent', () => {
  let component: DataadministrationComponent;
  let fixture: ComponentFixture<DataadministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataadministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataadministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
