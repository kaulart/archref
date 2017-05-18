import { TestBed, inject } from '@angular/core/testing';

import { FragmentnodeService } from './fragmentnode.service';

describe('FragmentnodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FragmentnodeService]
    });
  });

  it('should ...', inject([FragmentnodeService], (service: FragmentnodeService) => {
    expect(service).toBeTruthy();
  }));
});
