import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodetypedetailsComponent } from './nodetypedetails.component';

describe('NodetypedetailsComponent', () => {
  let component: NodetypedetailsComponent;
  let fixture: ComponentFixture<NodetypedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodetypedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodetypedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
