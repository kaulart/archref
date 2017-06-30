import { TestBed, inject } from '@angular/core/testing';

import { ExportxmlService } from './exportxml.service';

describe('ExportxmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportxmlService]
    });
  });

  it('should ...', inject([ExportxmlService], (service: ExportxmlService) => {
    expect(service).toBeTruthy();
  }));
});
