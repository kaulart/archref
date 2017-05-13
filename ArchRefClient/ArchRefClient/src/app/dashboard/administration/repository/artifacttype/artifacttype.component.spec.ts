import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifacttypeComponent } from './artifacttype.component';

describe('ArtifacttypeComponent', () => {
  let component: ArtifacttypeComponent;
  let fixture: ComponentFixture<ArtifacttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifacttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifacttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
