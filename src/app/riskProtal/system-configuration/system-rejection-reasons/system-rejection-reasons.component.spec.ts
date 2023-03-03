import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRejectionReasonsComponent } from './system-rejection-reasons.component';

describe('SystemRejectionReasonsComponent', () => {
  let component: SystemRejectionReasonsComponent;
  let fixture: ComponentFixture<SystemRejectionReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemRejectionReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRejectionReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
