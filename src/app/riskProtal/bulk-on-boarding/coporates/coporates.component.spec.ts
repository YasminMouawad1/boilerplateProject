import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoporatesComponent } from './coporates.component';

describe('CoporatesComponent', () => {
  let component: CoporatesComponent;
  let fixture: ComponentFixture<CoporatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoporatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoporatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
