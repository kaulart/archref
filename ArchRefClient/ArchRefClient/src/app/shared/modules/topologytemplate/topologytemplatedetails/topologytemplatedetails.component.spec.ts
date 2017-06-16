import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologytemplatedetailsComponent } from './topologytemplatedetails.component';

describe('TopologytemplatedetailsComponent', () => {
  let component: TopologytemplatedetailsComponent;
  let fixture: ComponentFixture<TopologytemplatedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologytemplatedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologytemplatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
