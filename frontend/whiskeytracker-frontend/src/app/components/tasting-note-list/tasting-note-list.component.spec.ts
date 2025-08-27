import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastingNoteListComponent } from './tasting-note-list.component';

describe('TastingNoteListComponent', () => {
  let component: TastingNoteListComponent;
  let fixture: ComponentFixture<TastingNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastingNoteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TastingNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
