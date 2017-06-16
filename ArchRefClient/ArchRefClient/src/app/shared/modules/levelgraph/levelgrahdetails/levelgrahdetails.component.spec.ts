import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelgrahdetailsComponent } from './levelgrahdetails.component';

describe('LevelgrahdetailsComponent', () => {
  let component: LevelgrahdetailsComponent;
  let fixture: ComponentFixture<LevelgrahdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelgrahdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelgrahdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
