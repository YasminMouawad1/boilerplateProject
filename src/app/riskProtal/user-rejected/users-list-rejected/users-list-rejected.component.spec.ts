import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListRejectedComponent } from './users-list-rejected.component';

describe('UsersListComponent', () => {
  let component: UsersListRejectedComponent;
  let fixture: ComponentFixture<UsersListRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
