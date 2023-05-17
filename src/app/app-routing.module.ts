import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component'; 
 
  
  


@NgModule({
    imports: [

    RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                  
                   
           ]
            },
            {
                path: 'admin',
                loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), // Lazy load operation module
                data: { preload: true }
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
            {
                path: 'general-portal',
                loadChildren: () => import('app/general-portal/general-portal.module').then(m => m.GeneralPortalModule), // Lazy load operation module
                data: { preload: true }
            },
            {
                path: 'system-configuration',
                loadChildren: () => import('app/system-configuration/system-configuration.module').then(m => m.SystemConfigurationModule), // Lazy load operation module
                data: { preload: true }
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
