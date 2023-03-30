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

import { CoporatesComponent } from './riskProtal/bulk-on-boarding/coporates/coporates.component';
import { BulkOnBoradingListComponent } from './riskProtal/bulk-on-boarding/bulk-on-borading-list/bulk-on-borading-list.component';
import { CustomersListComponent } from './riskProtal/get-customers/customers-list/customers-list.component';
import { LimitReviewComponent } from './riskProtal/limit-review/limit-review.component';
import { SystemCoreConfigurationComponent } from './riskProtal/system-configuration/system-core-configuration/system-core-configuration.component';
import { SystemConfigurationProfessionsComponent } from './riskProtal/system-configuration/system-configuration-professions/system-configuration-professions.component';
import { SystemRejectionReasonsComponent } from './riskProtal/system-configuration/system-rejection-reasons/system-rejection-reasons.component';

// risk portal
import { UsersListApprovalComponent } from './riskProtal/users-approval/users-list-approval.component';
import { UsersListHardRejectedComponent } from './riskProtal/users-rejected/users-hard-reject/users-list-hardRejected.component';
import { UsersListSystemRejectedComponent } from './riskProtal/users-rejected/users-system-reject/users-list-systemRejected.component';
import { UsersListRejectedComponent } from './riskProtal/users-rejected/users-soft-reject/users-list-rejected.component';
import { UserItemComponent } from './riskProtal/users-approval/user-item/user-item.component';


import { MerchantComponent } from './merchantSettlement/merchantSettlement.component';
import { RegistrationUserComponent } from './RegistrationUsers/RegistrationUsers.component';
import { DueTransactionComponent } from './dueTransactions/dueTransactions.component';
import { UserItemHardRejectComponent } from './riskProtal/users-rejected/users-hard-reject/user-item/user-item-hard.component';
import { UserItemSoftRejectComponent } from './riskProtal/users-rejected/users-soft-reject/user-item/user-item.component';
import { UserItemSystemRejectComponent } from './riskProtal/users-rejected/users-system-reject/user-item/user-itemsystemReject.component';
import { MessageTypeComponent } from './messageType/messageType.component';
import { MessageTemplateComponent } from './messageTemplate/messageTemplate.component';
import {EmailTypeComponent} from './emailType/emailType.component';
import { EmailContentComponent } from './emailContent/email-content.component';
import { CreateEmailContentComponent } from './emailContent/email-content/create-email-content.component';
import { ActivationPointComponent } from './activationPoint/activation-point.component';
import { UserItemLimitReviewComponent } from './riskProtal/limit-review/user-item/user-item.component';


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
                    { path: 'activation-point', component: ActivationPointComponent, canActivate: [AppRouteGuard] },
                    { path: 'message-type', component: MessageTypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'message-template', component: MessageTemplateComponent, canActivate: [AppRouteGuard] },
                    { path: 'email-type', component: EmailTypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'email-content', component: EmailContentComponent, canActivate: [AppRouteGuard] },
                    { path: 'create-email', component: CreateEmailContentComponent, canActivate: [AppRouteGuard] },
                    { path: 'registration-users', component: RegistrationUserComponent, canActivate: [AppRouteGuard] },
                    { path: 'due-transactions', component: DueTransactionComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },

                    // risk poratl
                    { path: 'coporates', component: CoporatesComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulkOnBaording', component: BulkOnBoradingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustomersListComponent, canActivate: [AppRouteGuard] },
                    
                    { path: 'system-configuration', component: SystemCoreConfigurationComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-configuration-professions', component: SystemConfigurationProfessionsComponent, canActivate: [AppRouteGuard] },
                    { path: 'system-rejection-reasons', component: SystemRejectionReasonsComponent, canActivate: [AppRouteGuard] },
                    
                    { path: 'users-approval', component: UsersListApprovalComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-item/:id', component: UserItemComponent, canActivate: [AppRouteGuard] },
                    { path: 'users-softRejected', component: UsersListRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-itemHSoftreject/:id', component: UserItemSoftRejectComponent, canActivate: [AppRouteGuard] },
                    { path: 'users-hardRejected', component: UsersListHardRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-itemHardreject/:id', component: UserItemHardRejectComponent, canActivate: [AppRouteGuard] },
                    { path: 'users-systemRejected', component: UsersListSystemRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-itemsystemReject/:id', component: UserItemSystemRejectComponent, canActivate: [AppRouteGuard] },
                    { path: 'limit-review', component: LimitReviewComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-itemLimit/:id', component: UserItemLimitReviewComponent, canActivate: [AppRouteGuard] },
           ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
