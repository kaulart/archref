import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphComponent } from './levelgraph.component';

describe('LevelgraphComponent', () => {
  let component: LevelgraphComponent;
  let fixture: ComponentFixture<LevelgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
