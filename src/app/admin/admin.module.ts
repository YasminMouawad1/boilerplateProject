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

import {AdminRoutingModule} from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { TenantsComponent } from './tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CreateUserDialogComponent } from './users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from './users/edit-user/edit-user-dialog.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { RolesComponent } from './roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';


@NgModule({
    imports: [   
        AppModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,  
        NgxPaginationModule, 
        AdminRoutingModule,
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
       AdminComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent, 
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
    ]
})
export class AdminModule {

}
