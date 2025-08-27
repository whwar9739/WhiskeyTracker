import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskeyListComponent } from './whiskey-list.component';

describe('WhiskeyListComponent', () => {
  let component: WhiskeyListComponent;
  let fixture: ComponentFixture<WhiskeyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiskeyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhiskeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
