import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologytoolComponent } from './topologytool.component';

describe('TopologytoolComponent', () => {
  let component: TopologytoolComponent;
  let fixture: ComponentFixture<TopologytoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologytoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologytoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
