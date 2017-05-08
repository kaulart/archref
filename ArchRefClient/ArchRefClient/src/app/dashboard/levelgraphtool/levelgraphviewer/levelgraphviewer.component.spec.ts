import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphviewerComponent } from './levelgraphviewer.component';

describe('LevelgraphviewerComponent', () => {
  let component: LevelgraphviewerComponent;
  let fixture: ComponentFixture<LevelgraphviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
