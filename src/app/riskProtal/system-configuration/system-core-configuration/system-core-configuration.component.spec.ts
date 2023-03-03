import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCoreConfigurationComponent } from './system-core-configuration.component';

describe('SystemCoreConfigurationComponent', () => {
  let component: SystemCoreConfigurationComponent;
  let fixture: ComponentFixture<SystemCoreConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCoreConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCoreConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
