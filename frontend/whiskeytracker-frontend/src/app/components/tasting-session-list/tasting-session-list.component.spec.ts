import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastingSessionListComponent } from './tasting-session-list.component';

describe('TastingSessionListComponent', () => {
  let component: TastingSessionListComponent;
  let fixture: ComponentFixture<TastingSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastingSessionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TastingSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
