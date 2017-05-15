import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologytemplateComponent } from './topologytemplate.component';

describe('TopologytemplateComponent', () => {
  let component: TopologytemplateComponent;
  let fixture: ComponentFixture<TopologytemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologytemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologytemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
