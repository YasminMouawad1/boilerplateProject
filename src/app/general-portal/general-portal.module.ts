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
 
import {GeneralPortalComponent} from './general-portal.component'; 
import { GeneralPortalRoutingModule } from './general-portal-routing.module';
import {ClientInquiryComponent} from './client-inquiry/client-inquiry.component';
 
  

@NgModule({
    imports: [ 
     AppModule,
        SharedModule,
        ServiceProxyModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        GeneralPortalRoutingModule,
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
        GeneralPortalComponent,
        ClientInquiryComponent
    ]
})
export class GeneralPortalModule {

}
