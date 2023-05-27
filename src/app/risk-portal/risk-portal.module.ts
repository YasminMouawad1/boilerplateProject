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
 
 

import {PendingListComponent} from './pending/pending-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {DetailsItemComponent} from './details/detailsItem.component';
import {SetonlineAgainstComponent} from './online-against/set-online-against.component';
import {SubmitPendingDialogComponent} from './details/submitPending/submit-pending-dialog.component';
import{SubmitApprovalDialogComponent} from './details/submitApproval/submit-approval-dialog.component';
import{IncomeComponent} from './scoring-parameters/income/income.component';
import{RestrictedIscoreComponent} from './scoring-parameters/restricted-iscore/restricted-iscore.component';
import {RestrictedProfissionComponent} from './scoring-parameters/restricted-profission/restricted-profission.component';
import {addRestrictedIScoreDialogComponent} from './scoring-parameters/restricted-iscore/add-dailog/add-dailog.component';
import {TimeLineDialogComponent} from './details/timeLine/time-line-dialog.component';
import{EditCommentDialogComponent} from './details/edit-comment/edit-comment-dialog.component';
import{Program1Component} from './program1/program1.component';
import { Program2Component } from './program2/program2.component';
import{DetailsItemConfirmationComponent} from './details-confirmation/detailsItem.component';
import{SubmitApprovalConfirmationDialogComponent} from './details-confirmation/submitApproval/submit-approval-dialog.component';
import {EditCommentConfirmationDialogComponent} from './details-confirmation/edit-comment/edit-comment-dialog.component';
import {TimeLineConfirmationDialogComponent} from './details-confirmation/timeLine/time-line-dialog.component';


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
        PendingListComponent,
        ConfirmationComponent,
        DetailsItemComponent,
        SetonlineAgainstComponent,
        SubmitPendingDialogComponent,
        SubmitApprovalDialogComponent,
        IncomeComponent,
        RestrictedIscoreComponent,
        RestrictedProfissionComponent,
        addRestrictedIScoreDialogComponent,
        TimeLineDialogComponent,
        EditCommentDialogComponent,
        Program1Component,
        Program2Component,
        DetailsItemConfirmationComponent,
        SubmitApprovalConfirmationDialogComponent,
        EditCommentConfirmationDialogComponent,
        TimeLineConfirmationDialogComponent
    ]
})
export class RiskPortalModule {

}
