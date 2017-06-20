import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgraphdetailsComponent } from './levelgraphdetails.component';

describe('LevelgraphdetailsComponent', () => {
  let component: LevelgraphdetailsComponent;
  let fixture: ComponentFixture<LevelgraphdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgraphdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgraphdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
