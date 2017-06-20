import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphrelationComponent } from './levelgraphrelation.component';

describe('LevelgraphrelationComponent', () => {
  let component: LevelgraphrelationComponent;
  let fixture: ComponentFixture<LevelgraphrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphrelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
