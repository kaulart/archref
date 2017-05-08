import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphtoolComponent } from './levelgraphtool.component';

describe('LevelgraphtoolComponent', () => {
  let component: LevelgraphtoolComponent;
  let fixture: ComponentFixture<LevelgraphtoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphtoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
