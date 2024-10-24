import { TestBed } from '@angular/core/testing';

import { ChallanService } from './challan.service';

describe('ChallanService', () => {
  let service: ChallanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
