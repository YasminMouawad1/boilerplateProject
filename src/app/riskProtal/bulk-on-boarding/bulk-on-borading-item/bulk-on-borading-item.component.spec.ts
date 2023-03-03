import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOnBoradingItemComponent } from './bulk-on-borading-item.component';

describe('BulkOnBoradingItemComponent', () => {
  let component: BulkOnBoradingItemComponent;
  let fixture: ComponentFixture<BulkOnBoradingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOnBoradingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkOnBoradingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
