import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BulkComponent } from './bulkOnBoarding/bulk.component';

import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

// risk portal
import { CoporatesComponent } from './riskProtal/bulk-on-boarding/coporates/coporates.component';
import { BulkOnBoradingListComponent } from './riskProtal/bulk-on-boarding/bulk-on-borading-list/bulk-on-borading-list.component';
import { CustomersListComponent } from './riskProtal/get-customers/customers-list/customers-list.component';
import { LimitReviewListComponent } from './riskProtal/limit-review/limit-review-list/limit-review-list.component';
import { SystemCoreConfigurationComponent } from './riskProtal/system-configuration/system-core-configuration/system-core-configuration.component';
import { SystemConfigurationProfessionsComponent } from './riskProtal/system-configuration/system-configuration-professions/system-configuration-professions.component';
import { SystemRejectionReasonsComponent } from './riskProtal/system-configuration/system-rejection-reasons/system-rejection-reasons.component';
import { UsersRejectedListComponent } from './riskProtal/user-rejected/users-list-rejected/users-list-rejected.component';
import { UserListSystemRejectedComponent } from './riskProtal/user-rejected/user-list-system-rejected/user-list-system-rejected.component';
import { UsersListPermanentRejectedComponent } from './riskProtal/user-rejected/users-list-permanent-rejected/users-list-permanent-rejected.component';
import { UsersListComponent } from './riskProtal/users-approval/users-list/users-list.component';
import { MerchantComponent } from './merchantSettlement/merchantSettlement.component';
import { RegistrationUserComponent } from './RegistrationUsers/RegistrationUsers.component';



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
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulk-on-boarding', component: BulkComponent, canActivate: [AppRouteGuard] },
                    { path: 'merchant-settlement', component: MerchantComponent, canActivate: [AppRouteGuard] },
                    { path: 'registration-users', component: RegistrationUserComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },

                    // risk poratl
                    { path: 'coporates', component: CoporatesComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulkOnBaording', component: BulkOnBoradingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustomersListComponent, canActivate: [AppRouteGuard] },
                    { path: 'limit-review', component: LimitReviewListComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-configuration', component: SystemCoreConfigurationComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-configuration-professions', component: SystemConfigurationProfessionsComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-rejection-reasons', component: SystemRejectionReasonsComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-rejected', component: UsersRejectedListComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-rejected', component: UserListSystemRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'permanent-rejected', component: UsersListPermanentRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-approval', component: UsersListComponent, canActivate: [AppRouteGuard] },
           ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
