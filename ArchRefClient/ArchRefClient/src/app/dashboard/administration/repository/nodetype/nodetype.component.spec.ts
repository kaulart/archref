import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodetypeComponent } from './nodetype.component';

describe('NodetypeComponent', () => {
  let component: NodetypeComponent;
  let fixture: ComponentFixture<NodetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
