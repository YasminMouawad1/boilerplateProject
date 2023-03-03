import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApprovalRoutingModule } from './users-approval-routing.module';
import { UsersApprovalComponent } from './users-approval.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListRejectedComponent } from './users-list-rejected/users-list-rejected.component'; 
import { MyPipesModule } from '../../../shared/pipe/PipesModule.module';



@NgModule({
  declarations: [
    UsersApprovalComponent,
    UsersListComponent,
    UserItemComponent,
    UsersListRejectedComponent 
  ],
  imports: [
    CommonModule,
    UsersApprovalRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MyPipesModule
  ]
})
export class UsersApprovalModule { }
