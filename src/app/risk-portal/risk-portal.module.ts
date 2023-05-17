import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module'; 
import { AppModule } from '@app/app.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelect2Module } from 'ng-select2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core'; 
 
import {RiskPortalComponent} from './risk-portal.component';
import { RiskPortalRoutingModule } from './risk-portal-routing.module'; 

import { BulkOnBoradingListComponent } from './bulk-on-borading/bulk-on-borading-list.component';
import {acceptBulkDialogComponent} from './bulk-on-borading/accept-application/accept-dailog.component';
import { rejectBulkDialogComponent } from './bulk-on-borading/reject-application/reject-dailog.component';
import { bulkOnBoradingITemComponent } from './bulk-on-borading/bulk-on-borading-item/bulk-on-borading-item.component';
import {CoporatesListComponent} from './coporates/coporates.component';
import {CustmersComponent} from './customers/customers.component';
import { CustomerItemComponent } from './customers/customer-item/customer-item.component';
import { LimitReviewComponent } from './limit-review/limit-review.component';
import {UserItemLimitReviewComponent} from './limit-review/user-item/user-item.component';
import {rejectLimitReviewDialogComponent } from './limit-review/reject-application/reject-dailog.component';
 
import { UsersListApprovalComponent } from './users-approval/users-list-approval.component';
import {UserItemComponent} from './users-approval/user-item/user-item.component';
import {acceptDialogComponent} from './users-approval/accept-application/accept-dailog.component';
import { rejectDialogComponent } from './users-approval/reject-application/reject-dailog.component';
import { editDialogComponent } from './users-approval/edit-application/edit-dailog.component';
import { UsersListRejectedComponent } from './users-rejected/users-soft-reject/users-list-rejected.component';
import {UserItemSoftRejectComponent} from './users-rejected/users-soft-reject/user-item/user-item.component';
import {acceptSoftRejectDialogComponent} from './users-rejected/users-soft-reject/accept-application/accept-dailog.component';
import {rejectSoftRejectDialogComponent} from './users-rejected/users-soft-reject/reject-application/reject-dailog.component';
import {editSoftRejectDialogComponent} from './users-rejected/users-soft-reject/edit-application/edit-dailog.component';
import {UsersListHardRejectedComponent} from './users-rejected/users-hard-reject/users-list-hardRejected.component';
import {UserItemHardRejectComponent} from './users-rejected/users-hard-reject/user-item/user-item-hard.component';
import {UsersListSystemRejectedComponent} from './users-rejected/users-system-reject/users-list-systemRejected.component';
import {UserItemSystemRejectComponent} from './users-rejected/users-system-reject/user-item/user-itemsystemReject.component';
import { acceptSystemRejectDialogComponent } from './users-rejected/users-system-reject/accept-application/accept-dailog.component';
import { editSystemRejectDialogComponent } from './users-rejected/users-system-reject/edit-application/edit-dailog.component';
import { rejectSystemRejectDialogComponent } from './users-rejected/users-system-reject/reject-application/reject-dailog.component';


import {PendingListComponent} from './pending/pending-list.component';
import { ApprovalListComponent } from './approval/approval-list.component';
import {DetailsItemComponent} from './details/detailsItem.component';
import {SetonlineAgainstComponent} from './online-against/set-online-against.component';
import {SubmitPendingDialogComponent} from './details/submitPending/submit-pending-dialog.component';
import{SubmitApprovalDialogComponent} from './details/submitApproval/submit-approval-dialog.component';

@NgModule({
    imports: [ 
    AppModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule, 
        RiskPortalRoutingModule,
        NgxPaginationModule, 
        ModalModule.forChild(),  
        ReactiveFormsModule, 
        BsDropdownModule,
        CollapseModule,
        TabsModule,  
        MatSlideToggleModule,
        NgSelect2Module,
        ClipboardModule,
         FormsModule,
        TranslateModule.forRoot({
            // loader:{
            //     provide:TranslateLoader,
            //     useFactory:createTranslateLoader,
            //     deps:[HttpClient]
            // }
        }),
    ],
    declarations: [
        RiskPortalComponent,
        BulkOnBoradingListComponent,
        acceptBulkDialogComponent,
        rejectBulkDialogComponent,
        bulkOnBoradingITemComponent,
        CoporatesListComponent,
        CustmersComponent,
        CustomerItemComponent,
        LimitReviewComponent,
        UserItemLimitReviewComponent,
        rejectLimitReviewDialogComponent,
        UsersListApprovalComponent,
        UserItemComponent,
        acceptDialogComponent,
        rejectDialogComponent,
        editDialogComponent,
        UsersListRejectedComponent,
        UserItemSoftRejectComponent,
        acceptSoftRejectDialogComponent,
        rejectSoftRejectDialogComponent,
        editSoftRejectDialogComponent,
        UsersListHardRejectedComponent,
        UserItemHardRejectComponent,
        UsersListSystemRejectedComponent,
        UserItemSystemRejectComponent,
        acceptSystemRejectDialogComponent,
        editSystemRejectDialogComponent,
        rejectSystemRejectDialogComponent,
        PendingListComponent,
        ApprovalListComponent,
        DetailsItemComponent,
        SetonlineAgainstComponent,
        SubmitPendingDialogComponent,
        SubmitApprovalDialogComponent
    ]
})
export class RiskPortalModule {

}
