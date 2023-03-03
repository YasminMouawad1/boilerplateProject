import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitReviewItemComponent } from './limit-review-item.component';

describe('LimitReviewItemComponent', () => {
  let component: LimitReviewItemComponent;
  let fixture: ComponentFixture<LimitReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitReviewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
