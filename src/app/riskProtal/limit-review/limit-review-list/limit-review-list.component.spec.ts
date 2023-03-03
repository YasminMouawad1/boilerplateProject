import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitReviewListComponent } from './limit-review-list.component';

describe('LimitReviewListComponent', () => {
  let component: LimitReviewListComponent;
  let fixture: ComponentFixture<LimitReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitReviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
