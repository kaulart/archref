import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodetemplateComponent } from './nodetemplate.component';

describe('NodetemplateComponent', () => {
  let component: NodetemplateComponent;
  let fixture: ComponentFixture<NodetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
