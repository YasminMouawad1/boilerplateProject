import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersApprovalComponent } from './users-approval.component';

describe('UsersApprovalComponent', () => {
  let component: UsersApprovalComponent;
  let fixture: ComponentFixture<UsersApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
