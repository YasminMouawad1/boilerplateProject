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


import {OperationPortalComponent} from './operation-portal.component';
import {OperationPortalRoutingModule} from './operation-portal-routing.module';
import { MerchantComponent } from './merchantSettlement/merchantSettlement.component';
import { editMerchantPlanDialogComponent } from './merchantSettlement/edit-merchant/edit-merchant-dailog.component';
import { SetMerchantPlanDialogComponent } from './merchantSettlement/create-merchant/set-merchant-plan-dialog.component';
import { AcceptClaimsListComponent } from './acceptClaims/accept-claims-list.component';
import { AcceptedClaimsComponent } from './acceptClaims/accepted-claims/accepted-claims.component';
import { ActivationPointComponent } from './activationPoint/activation-point.component';
import { AddActivationPointDialogComponent } from './activationPoint/add-activation-point/add-activation-point-dailog.component';
import { EditActivationPointDialogComponent } from './activationPoint/edit-activation-point/edit-activation-point-dailog.component';
import { BulkComponent } from './bulkOnBoarding/bulk.component';
import { DueTransactionComponent } from './dueTransactions/dueTransactions.component';
import { ClaimsDialogComponent } from './dueTransactions/add-claims/claims-dialog.component';
import { RegistrationUserComponent } from './RegistrationUsers/RegistrationUsers.component';
import { RegisterNewUserDialogComponent } from './RegistrationUsers/create-new-user/register-new-user-dialog.component';




@NgModule({
    imports: [
//layout
       AppModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        OperationPortalRoutingModule,
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
        OperationPortalComponent,
        AcceptClaimsListComponent,
        AcceptedClaimsComponent,
        ActivationPointComponent,
        AddActivationPointDialogComponent,
        EditActivationPointDialogComponent,
        BulkComponent,
        DueTransactionComponent,
        ClaimsDialogComponent,
        MerchantComponent,
        editMerchantPlanDialogComponent,
        SetMerchantPlanDialogComponent,
        RegistrationUserComponent,
        RegisterNewUserDialogComponent
    ]
})
export class OperationPortalModule {

}
