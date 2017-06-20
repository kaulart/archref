import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphrelationdetailsComponent } from './levelgraphrelationdetails.component';

describe('LevelgraphrelationdetailsComponent', () => {
  let component: LevelgraphrelationdetailsComponent;
  let fixture: ComponentFixture<LevelgraphrelationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphrelationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphrelationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
