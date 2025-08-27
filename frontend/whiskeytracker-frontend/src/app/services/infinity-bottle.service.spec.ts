import { TestBed } from '@angular/core/testing';

import { InfinityBottleService } from './infinity-bottle.service';

describe('InfinityBottleService', () => {
  let service: InfinityBottleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfinityBottleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
