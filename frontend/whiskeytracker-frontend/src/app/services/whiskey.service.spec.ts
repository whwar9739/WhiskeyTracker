import { TestBed } from '@angular/core/testing';

import { WhiskeyService } from './whiskey.service';

describe('WhiskeyService', () => {
  let service: WhiskeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
