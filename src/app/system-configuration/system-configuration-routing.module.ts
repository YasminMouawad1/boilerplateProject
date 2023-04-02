import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 


import { SystemConfigurationComponent } from './system-configuration.component';
 
 

@NgModule({
    imports: [
    
    RouterModule.forChild([
            {
                path: '',
                component: SystemConfigurationComponent,
                children: [
                    
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SystemConfigurationRoutingModule { }
