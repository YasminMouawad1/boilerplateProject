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
import { SystemConfigurationRoutingModule } from './system-configuration-routing.module';
 

import { SystemConfigurationComponent } from './system-configuration.component'; 
import { EmailContentComponent } from './emailContent/email-content.component';
import {CreateEmailContentDialogComponent} from './emailContent/create-email-conent/create-email-content-dailog.component';
import {CreateEmailContentComponent} from './emailContent/email-content/create-email-content.component';
import {EmailTypeComponent} from './emailType/emailType.component';
import { CreateEmailTypeDialogComponent } from './emailType/create-email-type/create-email-type-dailog.component';
import {MessageTemplateComponent} from './messageTemplate/messageTemplate.component';
import {CreateMessageTemplateDialogComponent} from './messageTemplate/create-message-template/create-message-template-dialog.component';
import {MessageTypeComponent} from './messageType/messageType.component';
import {CreateMessageTypeDialogComponent} from './messageType/create-message-type/create-message-type-dialog.component';

@NgModule({
    imports: [ 
    AppModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule, 
        SystemConfigurationRoutingModule,
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
        SystemConfigurationComponent,
        EmailContentComponent,
        CreateEmailContentDialogComponent,
        CreateEmailContentComponent,
        EmailTypeComponent,
        CreateEmailTypeDialogComponent,
        MessageTemplateComponent,
        CreateMessageTemplateDialogComponent,
        MessageTypeComponent,
        CreateMessageTypeDialogComponent
    ]
})
export class SystemConfigurationModule {

}
