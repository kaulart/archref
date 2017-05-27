import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologmodellerComponent } from './topologmodeller.component';

describe('TopologmodellerComponent', () => {
  let component: TopologmodellerComponent;
  let fixture: ComponentFixture<TopologmodellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologmodellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologmodellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
