import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOnBoradingListComponent } from './bulk-on-borading-list.component';

describe('BulkOnBoradingListComponent', () => {
  let component: BulkOnBoradingListComponent;
  let fixture: ComponentFixture<BulkOnBoradingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOnBoradingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkOnBoradingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
