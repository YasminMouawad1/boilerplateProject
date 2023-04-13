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
import { PortalUserDialogComponent } from '../create-portal-user/create-portal-user-dialog.component'; 

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './portal-users-list.component.html',
  styleUrls:['./portal-users.component.css'],
  animations: [appModuleAnimation()]
})
export class PortalUsersComponent extends AppComponentBase implements OnInit{
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

 
 

 

  createPortalUserDialog(): void {
    let creatUserDialog: BsModalRef;
    
    creatUserDialog = this._modalService.show(
        PortalUserDialogComponent,
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
