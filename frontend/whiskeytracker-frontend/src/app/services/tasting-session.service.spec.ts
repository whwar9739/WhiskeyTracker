import { TestBed } from '@angular/core/testing';

import { TastingSessionService } from './tasting-session.service';

describe('TastingSessionService', () => {
  let service: TastingSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
