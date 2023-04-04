import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  UserServiceProxy,
  UserDto,
  UserDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  ApplicationsOnBoardingDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'; 
import { RegisterNewUserDialogComponent } from './create-new-user/register-new-user-dialog.component';
import { AppComponentBase } from '@shared/app-component-base';
import { UsersService } from '@shared/services/endpoints/users.service';
import { EditUserDialogComponent } from './../../admin/users/edit-user/edit-user-dialog.component';
import { editUserDialogComponent } from './edit_user/edit-user-dailog.component';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './RegistrationUsers.component.html',
  styleUrls:['./RegistrationUsers.component.css'],
  animations: [appModuleAnimation()]
})
export class RegistrationUserComponent extends AppComponentBase implements OnInit{
  users: UserDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  portalUsers:any;
  PurchaseUsers:any;
  Activators:any;

 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
  showTablePortal:boolean = true;
  showTablePurchase:boolean = true;
  showTableActivators:boolean = true;

isShowUsersList = abp.auth.isGranted('Pages.Operation.RegistrationUsers');
isShowRegisterUserAddBtn = abp.auth.isGranted('Pages.Operation.RegistrationUsers.Add');
isShowRegisterUserEditBtn = abp.auth.isGranted('Pages.Operation.RegistrationUsers.Edit');

  constructor(
    injector: Injector,
    private _UsersServices:UsersService,
    private _modalService: BsModalService
  ) {
    super(injector);

  }


  ngOnInit(): void {
    this.getPortalUsers();
    this.getPurchaseUsers();
    this.getActivators();
  }

  getPortalUsers(){
    this.isTableLoading = true;

       this._UsersServices.getMerchantPortalUsers().subscribe((res) =>{
           if(res)
              this.portalUsers = res.result.data;

              if(this.portalUsers.length > 0)
                  this.showTablePortal = true;
              else
                  this.showTablePortal = false;
       })
       this.isTableLoading = false;
  }

  getPurchaseUsers(){
    this.isTableLoading = true;
    this._UsersServices.getMerchantPurchaseUsers().subscribe((res) =>{
        if(res)
           this.PurchaseUsers = res.result.data;

           if(this.PurchaseUsers.length > 0)
               this.showTablePurchase = true;
           else
               this.showTablePurchase = false;
    });
    this.isTableLoading = false;
}

getActivators(){
  this.isTableLoading = true;

  this._UsersServices.getMerchantActivators().subscribe((res) =>{
      if(res)
         this.Activators = res.result.data;

         if(this.Activators.length > 0)
             this.showTableActivators = true;
         else
             this.showTableActivators = false;
  });
  this.isTableLoading = false;
}

  createUser(): void {
    this.showCreateUserDialog();
  }

  editUser(userID: any): void {
    this.showCEditUserDialog(userID);
  }


  private showCreateUserDialog(): void {
    let createOrEditUserDialog: BsModalRef;
    
      createOrEditUserDialog = this._modalService.show(
        RegisterNewUserDialogComponent,
        {
          class: 'modal-lg',
        }
      );
   

   
  }

  private showCEditUserDialog(id: any): void {
    let createOrEditUserDialog: BsModalRef;
     
      createOrEditUserDialog = this._modalService.show(
        editUserDialogComponent,
        {
          class: 'modal-lg',
        }
      );
   

   
  }



}
