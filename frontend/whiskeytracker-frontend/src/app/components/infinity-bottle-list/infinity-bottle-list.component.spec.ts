import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityBottleListComponent } from './infinity-bottle-list.component';

describe('InfinityBottleListComponent', () => {
  let component: InfinityBottleListComponent;
  let fixture: ComponentFixture<InfinityBottleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfinityBottleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfinityBottleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
