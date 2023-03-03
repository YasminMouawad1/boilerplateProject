import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemConfigurationProfessionsComponent } from './system-configuration-professions/system-configuration-professions.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { SystemCoreConfigurationComponent } from './system-core-configuration/system-core-configuration.component';
import { SystemRejectionReasonsComponent } from './system-rejection-reasons/system-rejection-reasons.component';


const routes: Routes = [
  { path: '', component: SystemConfigurationComponent  , children: [
   { path: '', component: SystemCoreConfigurationComponent },
   //{ path: '**', component: SystemCoreConfigurationComponent },
  { path: 'system-core-configuration', component: SystemCoreConfigurationComponent },
  { path: 'system-configuration-professions', component: SystemConfigurationProfessionsComponent },
  { path: 'system-rejection-reasons', component: SystemRejectionReasonsComponent },


]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigurationRoutingModule { }
