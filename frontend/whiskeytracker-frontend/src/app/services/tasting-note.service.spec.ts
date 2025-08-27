import { TestBed } from '@angular/core/testing';

import { TastingNoteService } from './tasting-note.service';

describe('TastingNoteService', () => {
  let service: TastingNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastingNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
