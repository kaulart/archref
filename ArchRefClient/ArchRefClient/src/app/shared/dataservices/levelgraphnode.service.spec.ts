import { TestBed, inject } from '@angular/core/testing';

import { LevelgraphnodeService } from './levelgraphnode.service';

describe('LevelgraphnodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelgraphnodeService]
    });
  });

  it('should ...', inject([LevelgraphnodeService], (service: LevelgraphnodeService) => {
    expect(service).toBeTruthy();
  }));
});
