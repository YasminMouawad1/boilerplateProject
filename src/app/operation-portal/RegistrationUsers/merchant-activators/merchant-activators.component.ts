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
import { AppComponentBase } from '@shared/app-component-base';
import { UsersService } from '@shared/services/endpoints/users.service'; 
import { editUserDialogComponent } from '../edit_user/edit-user-dailog.component'; 
import { ActivatorUserDialogComponent } from '../create-activator/create-activator-dailog.component';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './/merchant-activators.component.html',
  styleUrls:['./merchant-activators.component.css'],
  animations: [appModuleAnimation()]
})
export class MerchantActivatorsComponent extends AppComponentBase implements OnInit{
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
    this.getActivators();
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

   

createActivatorUserDialog(): void {
  let creatUserDialog: BsModalRef;
  
  creatUserDialog = this._modalService.show(
      ActivatorUserDialogComponent,
      {
        class: 'modal-lg',
      }
    );

}

  
  editUser(userID: any,type:any): void {
    this.showCEditUserDialog(userID,type);
  }


  private showCEditUserDialog(id: any,type:string): void {

    let initialState = {};

    if(type == 'portal'){
          initialState = {
          init_id: id, 
          merchantPortalSignUp:true,
          merchantSignUp:false,
          salesSignUp:false
       };
    }else if(type == 'purchase'){
      initialState = {
        init_id: id, 
        merchantPortalSignUp:false,
        merchantSignUp:true,
        salesSignUp:false
     };
    }else{
       initialState = {
        init_id: id, 
        merchantPortalSignUp:false,
        merchantSignUp:false,
        salesSignUp:true
     };
    }
    

    let EditUserDialog: BsModalRef;
     
    EditUserDialog = this._modalService.show(
        editUserDialogComponent,
        { class: 'modal-lg', initialState}
      );
   

   
  }



}
