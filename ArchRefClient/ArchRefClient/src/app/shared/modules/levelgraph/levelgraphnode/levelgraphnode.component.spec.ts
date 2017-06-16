import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphnodeComponent } from './levelgraphnode.component';

describe('LevelgraphnodeComponent', () => {
  let component: LevelgraphnodeComponent;
  let fixture: ComponentFixture<LevelgraphnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
