import { TestBed, inject } from '@angular/core/testing';

import { RelationtypeService } from './relationtype.service';

describe('RelationtypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationtypeService]
    });
  });

  it('should ...', inject([RelationtypeService], (service: RelationtypeService) => {
    expect(service).toBeTruthy();
  }));
});
