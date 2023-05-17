import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 

import { RiskPortalComponent } from './risk-portal.component';
import { UsersListApprovalComponent } from './users-approval/users-list-approval.component';
import { bulkOnBoradingITemComponent } from './bulk-on-borading/bulk-on-borading-item/bulk-on-borading-item.component';
import { BulkOnBoradingListComponent } from './bulk-on-borading/bulk-on-borading-list.component';
import { CoporatesListComponent } from './coporates/coporates.component';
import { CustomerItemComponent } from './customers/customer-item/customer-item.component';
import { CustmersComponent } from './customers/customers.component';
import { LimitReviewComponent } from './limit-review/limit-review.component';
import { UserItemLimitReviewComponent } from './limit-review/user-item/user-item.component';
import { UserItemComponent } from './users-approval/user-item/user-item.component';
import { UsersListHardRejectedComponent } from './users-rejected/users-hard-reject/users-list-hardRejected.component';
import { UserItemSoftRejectComponent } from './users-rejected/users-soft-reject/user-item/user-item.component';
import { UsersListRejectedComponent } from './users-rejected/users-soft-reject/users-list-rejected.component';
import { UsersListSystemRejectedComponent } from './users-rejected/users-system-reject/users-list-systemRejected.component';
import { UserItemSystemRejectComponent } from './users-rejected/users-system-reject/user-item/user-itemsystemReject.component';
import { PendingListComponent } from './pending/pending-list.component';
import { ApprovalListComponent } from './approval/approval-list.component';
import { DetailsItemComponent } from './details/detailsItem.component';
import { SetonlineAgainstComponent } from './online-against/set-online-against.component';
 

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RiskPortalComponent,
                children: [
                    { path: 'users-approval', component: UsersListApprovalComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-item/:id', component: UserItemComponent, canActivate: [AppRouteGuard] },
                    { path: 'users-soft-rejected', component: UsersListRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-item-soft-reject/:id', component: UserItemSoftRejectComponent, canActivate: [AppRouteGuard] },
                    { path: 'users-hard-rejected', component: UsersListHardRejectedComponent, canActivate: [AppRouteGuard] }, 
                    { path: 'users-system-rejected', component: UsersListSystemRejectedComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-items-system-reject/:id', component: UserItemSystemRejectComponent, canActivate: [AppRouteGuard] },
                    { path: 'limit-review', component: LimitReviewComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-itemLimit/:id', component: UserItemLimitReviewComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulk-onborading', component: BulkOnBoradingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'bulk-on-borading-item/:id', component: bulkOnBoradingITemComponent, canActivate: [AppRouteGuard] },
                    { path: 'coporates', component: CoporatesListComponent, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustmersComponent, canActivate: [AppRouteGuard] },
                    { path: 'customer-item/:id', component: CustomerItemComponent, canActivate: [AppRouteGuard] },

                    { path: 'pending-requests', component: PendingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'approval-requests', component: ApprovalListComponent, canActivate: [AppRouteGuard] },
                    { path: 'details-item/:id', component: DetailsItemComponent, canActivate: [AppRouteGuard] },
                    { path: 'set-online-against', component: SetonlineAgainstComponent, canActivate: [AppRouteGuard] },

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RiskPortalRoutingModule { }
