import { TestBed } from '@angular/core/testing';

import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let service: ParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
