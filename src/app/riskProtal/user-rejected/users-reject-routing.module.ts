import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemUserItemComponent } from './system-user-item/system-user-item.component';
import { UserRejectedItemComponent } from './user-item/user-item.component';
import { UserListSystemRejectedComponent } from './user-list-system-rejected/user-list-system-rejected.component';
import { UsersListPermanentRejectedComponent } from './users-list-permanent-rejected/users-list-permanent-rejected.component';


import { UsersRejectedListComponent } from './users-list-rejected/users-list-rejected.component';
import { UsersRejectComponent } from './users-reject.component';


const routes: Routes = [
    { path: '', component: UsersRejectComponent  , children: [
     { path: '', component: UsersRejectedListComponent },
     //{ path: '**', component: UsersRejectedListComponent },
    { path: 'user-item/:id', component: UserRejectedItemComponent },
    { path: 'system-user-item/:id', component: SystemUserItemComponent },
    { path: 'permanent-rejected', component: UsersListPermanentRejectedComponent },
    { path: 'system-rejected', component: UserListSystemRejectedComponent },

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRejectRoutingModule { }
