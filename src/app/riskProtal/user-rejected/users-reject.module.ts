import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { UsersRejectComponent } from './users-reject.component';
import { UserRejectRoutingModule } from './users-reject-routing.module';
import { UserRejectedItemComponent } from './user-item/user-item.component';
import { UsersRejectedListComponent } from './users-list-rejected/users-list-rejected.component';
import { UsersListPermanentRejectedComponent } from './users-list-permanent-rejected/users-list-permanent-rejected.component';
import { UserListSystemRejectedComponent } from './user-list-system-rejected/user-list-system-rejected.component';
import { SystemUserItemComponent } from './system-user-item/system-user-item.component'; 
import { MyPipesModule } from '../../../shared/pipe/PipesModule.module';
import { PersonalInformationsComponent } from '../../../shared/components/personal-informations/personal-informations.component';
import { ClipboardModule } from '@angular/cdk/clipboard';



@NgModule({
    declarations: [
        UsersRejectComponent,
        UserRejectedItemComponent,
        UsersRejectedListComponent,
        UsersListPermanentRejectedComponent,
        UserListSystemRejectedComponent,
        SystemUserItemComponent,
    ],
    imports: [
        CommonModule,
        UserRejectRoutingModule,
        SharedModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MyPipesModule, 
        ClipboardModule
    ]
})
export class UsersRejectModule { }
