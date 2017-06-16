import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodetemplatedetailsComponent } from './nodetemplatedetails.component';

describe('NodetemplatedetailsComponent', () => {
  let component: NodetemplatedetailsComponent;
  let fixture: ComponentFixture<NodetemplatedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodetemplatedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodetemplatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
