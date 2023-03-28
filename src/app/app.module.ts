import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component'; 
import { BulkComponent } from '@app/bulkOnBoarding/bulk.component';
import {MerchantComponent } from '@app/merchantSettlement/merchantSettlement.component';
import {SetMerchantPlanDialogComponent} from '@app/merchantSettlement/create-merchant/set-merchant-plan-dialog.component'
import {RegistrationUserComponent} from '@app/RegistrationUsers/RegistrationUsers.component';
import {RegisterNewUserDialogComponent} from '@app/RegistrationUsers/create-new-user/register-new-user-dialog.component'
import {DueTransactionComponent} from '@app/dueTransactions/dueTransactions.component';
import {ClaimsDialogComponent} from '@app/dueTransactions/add-claims/claims-dialog.component';
import {MessageTypeComponent} from '@app/messageType/messageType.component';
import {CreateMessageTypeDialogComponent} from '@app/messageType/create-message-type/create-message-type-dialog.component';
import {MessageTemplateComponent} from '@app/messageTemplate/messageTemplate.component';
import {CreateMessageTemplateDialogComponent} from '@app/messageTemplate/create-message-template/create-message-template-dialog.component';
import {EmailTypeComponent} from '@app/emailType/emailType.component';
import {CreateEmailTypeDialogComponent} from '@app/emailType/create-email-type/create-email-type-dailog.component';
import {EmailContentComponent} from '@app/emailContent/email-content.component';
import {CreateEmailContentDialogComponent} from '@app/emailContent/create-email-conent/create-email-content-dailog.component';
import {CreateEmailContentComponent} from '@app/emailContent/email-content/create-email-content.component';
//-------------risk ----------
import {UsersListApprovalComponent} from '@app/riskProtal/users-approval/users-list-approval.component';
import {UsersListHardRejectedComponent} from '@app/riskProtal/users-rejected/users-hard-reject/users-list-hardRejected.component';
import {UsersListRejectedComponent} from '@app/riskProtal/users-rejected/users-soft-reject/users-list-rejected.component';
import {UsersListSystemRejectedComponent} from '@app/riskProtal/users-rejected/users-system-reject/users-list-systemRejected.component';
import {LimitReviewComponent} from '@app/riskProtal/limit-review/limit-review.component';
import {UserItemComponent} from '@app/riskProtal/users-approval/user-item/user-item.component';
import {UserItemHardRejectComponent} from '@app/riskProtal/users-rejected/users-hard-reject/user-item/user-item-hard.component';
import {UserItemSoftRejectComponent} from '@app/riskProtal/users-rejected/users-soft-reject/user-item/user-item.component';
import {UserItemSystemRejectComponent} from '@app/riskProtal/users-rejected/users-system-reject/user-item/user-itemsystemReject.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core/public_api';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgSelect2Module } from 'ng-select2';
import { ClipboardModule } from '@angular/cdk/clipboard';
 import{acceptDialogComponent} from './riskProtal/users-approval/accept-application/accept-dailog.component';
 import{rejectDialogComponent} from './riskProtal/users-approval/reject-application/reject-dailog.component';
 import{editDialogComponent} from './riskProtal/users-approval/edit-application/edit-dailog.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        BulkComponent,
        MerchantComponent,
        SetMerchantPlanDialogComponent,
        RegistrationUserComponent,
        RegisterNewUserDialogComponent,
        DueTransactionComponent,
        ClaimsDialogComponent,
        MessageTypeComponent, 
        CreateMessageTypeDialogComponent,
        MessageTemplateComponent,
        CreateMessageTemplateDialogComponent,
        EmailTypeComponent,
        CreateEmailTypeDialogComponent,
        EmailContentComponent,
        CreateEmailContentDialogComponent,
        CreateEmailContentComponent,
        rejectDialogComponent,
        editDialogComponent,
        //risk
        UsersListApprovalComponent,
        UsersListRejectedComponent,
        UsersListSystemRejectedComponent,
        UsersListHardRejectedComponent, 
        LimitReviewComponent,
        UserItemComponent,
        UserItemHardRejectComponent,
        UserItemSoftRejectComponent,
        UserItemSystemRejectComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        acceptDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent
    ],
    imports: [ 

CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
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
    providers: []
})
export class AppModule {}

export function createTranslateLoader(http:HttpClient){
    return new TranslateHttpLoader(http, './../assets/i18n/','.json')
}
 