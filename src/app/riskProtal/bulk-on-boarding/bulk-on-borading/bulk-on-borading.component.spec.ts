import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOnBoradingComponent } from './bulk-on-borading.component';

describe('BulkOnBoradingComponent', () => {
  let component: BulkOnBoradingComponent;
  let fixture: ComponentFixture<BulkOnBoradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOnBoradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkOnBoradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
