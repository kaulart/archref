import { TestBed, inject } from '@angular/core/testing';

import { LevelgraphService } from './levelgraph.service';

describe('LevelgraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelgraphService]
    });
  });

  it('should ...', inject([LevelgraphService], (service: LevelgraphService) => {
    expect(service).toBeTruthy();
  }));
});
