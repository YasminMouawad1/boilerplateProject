import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { SystemConfigurationRoutingModule } from './system-configuration-routing.module';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { SystemCoreConfigurationComponent } from './system-core-configuration/system-core-configuration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SystemConfigurationProfessionsComponent } from './system-configuration-professions/system-configuration-professions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditSystemConfigurationProfessionsComponent } from './edit-system-configuration-professions/edit-system-configuration-professions.component';
import { SystemRejectionReasonsComponent } from './system-rejection-reasons/system-rejection-reasons.component';

@NgModule({
  declarations: [
    SystemConfigurationComponent,
    SystemCoreConfigurationComponent,
    SystemConfigurationProfessionsComponent,
    EditSystemConfigurationProfessionsComponent,
    SystemRejectionReasonsComponent
  ],
  imports: [
  CommonModule,
    SystemConfigurationRoutingModule,
    TranslateModule,
    FormsModule,
     ReactiveFormsModule,
     NgxPaginationModule 
  ]
})
export class SystemConfigurationModule { }
