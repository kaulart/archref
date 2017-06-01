import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologytemplatetoolComponent } from './topologytemplatetool.component';

describe('TopologytemplatetoolComponent', () => {
  let component: TopologytemplatetoolComponent;
  let fixture: ComponentFixture<TopologytemplatetoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologytemplatetoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologytemplatetoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
