import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphmodellerComponent } from './levelgraphmodeller.component';

describe('LevelgraphmodellerComponent', () => {
  let component: LevelgraphmodellerComponent;
  let fixture: ComponentFixture<LevelgraphmodellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphmodellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphmodellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
