import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorydetailsComponent } from './repositorydetails.component';

describe('RepositorydetailsComponent', () => {
  let component: RepositorydetailsComponent;
  let fixture: ComponentFixture<RepositorydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
