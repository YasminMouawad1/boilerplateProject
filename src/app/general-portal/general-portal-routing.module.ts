import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 
 
import { GeneralPortalComponent } from './general-portal.component';
import { ClientInquiryComponent } from './client-inquiry/client-inquiry.component';
 

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: GeneralPortalComponent,
                children: [
                    { path: 'client-inquiry', component: ClientInquiryComponent, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class GeneralPortalRoutingModule { }
