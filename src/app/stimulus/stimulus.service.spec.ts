import { TestBed, inject } from '@angular/core/testing';

import { StimulusService } from './stimulus.service';

describe('StimulusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StimulusService]
    });
  });

  it('should be created', inject([StimulusService], (service: StimulusService) => {
    expect(service).toBeTruthy();
  }));
});
