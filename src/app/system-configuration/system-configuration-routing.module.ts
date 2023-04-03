import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 


import { SystemConfigurationComponent } from './system-configuration.component';
   
import {EmailTypeComponent} from './emailType/emailType.component'; 
import {MessageTemplateComponent} from './messageTemplate/messageTemplate.component'; 
import {MessageTypeComponent} from './messageType/messageType.component'; 
import { CreateEmailContentComponent } from './emailContent/email-content/create-email-content.component';


@NgModule({
    imports: [
    
    RouterModule.forChild([
            {
                path: '',
                component: SystemConfigurationComponent,
                children: [
                    { path: 'message-type', component: MessageTypeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'message-template', component: MessageTemplateComponent,  canActivate: [AppRouteGuard] },
                    { path: 'email-type', component: EmailTypeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'create-email', component: CreateEmailContentComponent,  canActivate: [AppRouteGuard] }, 
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SystemConfigurationRoutingModule { }
