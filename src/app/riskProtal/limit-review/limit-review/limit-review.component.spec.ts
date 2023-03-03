import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitReviewComponent } from './limit-review.component';

describe('LimitReviewComponent', () => {
  let component: LimitReviewComponent;
  let fixture: ComponentFixture<LimitReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
