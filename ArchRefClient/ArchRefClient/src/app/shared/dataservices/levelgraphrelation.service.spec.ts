import { TestBed, inject } from '@angular/core/testing';

import { LevelgraphrelationService } from './levelgraphrelation.service';

describe('LevelgraphrelationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelgraphrelationService]
    });
  });

  it('should ...', inject([LevelgraphrelationService], (service: LevelgraphrelationService) => {
    expect(service).toBeTruthy();
  }));
});
