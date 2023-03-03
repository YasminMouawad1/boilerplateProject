import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemConfigurationProfessionsComponent } from './edit-system-configuration-professions.component';

describe('EditSystemConfigurationProfessionsComponent', () => {
  let component: EditSystemConfigurationProfessionsComponent;
  let fixture: ComponentFixture<EditSystemConfigurationProfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSystemConfigurationProfessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSystemConfigurationProfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
