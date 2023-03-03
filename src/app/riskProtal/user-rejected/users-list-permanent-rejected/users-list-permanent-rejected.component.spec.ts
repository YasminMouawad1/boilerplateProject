import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListPermanentRejectedComponent } from './users-list-permanent-rejected.component';

describe('UsersListPermanentRejectedComponent', () => {
  let component: UsersListPermanentRejectedComponent;
  let fixture: ComponentFixture<UsersListPermanentRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListPermanentRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListPermanentRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
