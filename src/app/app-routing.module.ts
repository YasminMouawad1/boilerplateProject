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
 
import { LimitReviewComponent } from './riskProtal/limit-review/limit-review.component'; 
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
import { BulkOnBoradingListComponent } from './riskProtal/bulk-on-borading/bulk-on-borading-list.component';
import { bulkOnBoradingITemComponent } from './riskProtal/bulk-on-borading/bulk-on-borading-item/bulk-on-borading-item.component';
import { CoporatesListComponent } from './riskProtal/coporates/coporates.component';
import { CustmersComponent } from './riskProtal/customers/customers.component';
import { CustomerItemComponent } from './riskProtal/customers/customer-item/customer-item.component';
import { AcceptClaimsListComponent } from './acceptClaims/accept-claims-list.component';
import { AcceptedClaimsComponent } from './acceptClaims/accepted-claims/accepted-claims.component';


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
                    { path: 'accept-claims', component: AcceptClaimsListComponent, canActivate: [AppRouteGuard] },
                    { path: 'accepted-claims', component: AcceptedClaimsComponent, canActivate: [AppRouteGuard] },
                  //  { path: 'accepted-claims', component: , canActivate: [AppRouteGuard] },


                    // risk poratl
                  
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
                    { path: 'bulk-onborading', component: BulkOnBoradingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulkonborading-item/:id', component: bulkOnBoradingITemComponent, canActivate: [AppRouteGuard] },
                    { path: 'coporates', component: CoporatesListComponent, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustmersComponent, canActivate: [AppRouteGuard] },
                    { path: 'customer-item/:id', component: CustomerItemComponent, canActivate: [AppRouteGuard] },
           ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
