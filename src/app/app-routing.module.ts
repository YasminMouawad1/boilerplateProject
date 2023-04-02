import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component'; 

import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
  

  import { MessageTypeComponent } from './messageType/messageType.component';
import { MessageTemplateComponent } from './messageTemplate/messageTemplate.component';
import {EmailTypeComponent} from './emailType/emailType.component';
import { EmailContentComponent } from './emailContent/email-content.component';
import { CreateEmailContentComponent } from './emailContent/email-content/create-email-content.component';  


@NgModule({
    imports: [

    RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                   // { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                   
                    { path: 'message-type', component: MessageTypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'message-template', component: MessageTemplateComponent, canActivate: [AppRouteGuard] },
                    { path: 'email-type', component: EmailTypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'email-content', component: EmailContentComponent, canActivate: [AppRouteGuard] },
                    { path: 'create-email', component: CreateEmailContentComponent, canActivate: [AppRouteGuard] },
                    
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                 
                   
             
           ]
            },
            {
                path: 'operation-portal',
                loadChildren: () => import('app/operation-portal/operation-portal.module').then(m => m.OperationPortalModule), // Lazy load operation module
                data: { preload: true }
            }
            ,
            {
                path: 'risk-portal',
                loadChildren: () => import('app/risk-portal/risk-portal.module').then(m => m.RiskPortalModule), // Lazy load operation module
                data: { preload: true }
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
