import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRejectComponent } from './users-reject.component';

describe('UsersApprovalComponent', () => {
  let component: UsersRejectComponent;
  let fixture: ComponentFixture<UsersRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
