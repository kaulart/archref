import { TestBed, inject } from '@angular/core/testing';

import { NodetypeserviceService } from './nodetypeservice.service';

describe('NodetypeserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodetypeserviceService]
    });
  });

  it('should ...', inject([NodetypeserviceService], (service: NodetypeserviceService) => {
    expect(service).toBeTruthy();
  }));
});
