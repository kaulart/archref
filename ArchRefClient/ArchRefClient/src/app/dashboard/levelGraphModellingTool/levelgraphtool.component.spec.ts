import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphmodellingComponent } from './levelgraphmodelling.component';

describe('LevelgraphmodellingComponent', () => {
  let component: LevelgraphmodellingComponent;
  let fixture: ComponentFixture<LevelgraphmodellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphmodellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphmodellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
