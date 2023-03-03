import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationProfessionsComponent } from './system-configuration-professions.component';

describe('SystemConfigurationProfessionsComponent', () => {
  let component: SystemConfigurationProfessionsComponent;
  let fixture: ComponentFixture<SystemConfigurationProfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemConfigurationProfessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemConfigurationProfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
