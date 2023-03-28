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
import { SetMerchantPlanDialogComponent } from './create-merchant/set-merchant-plan-dialog.component';
import { UsersService } from '@shared/services/endpoints/users.service';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './merchantSettlement.component.html',
  styleUrls:['./merchantSettlement.component.css'],
  animations: [appModuleAnimation()]
})
export class MerchantComponent implements OnInit{
  //users: UserDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

MerchantPlans:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _usersService:UsersService,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,

    private _modalService: BsModalService
  ) {
    //super(injector);

  }

   

  ngOnInit() {
    this.getSettlementPlan();
 }

 getSettlementPlan( ){
   
this.isTableLoading = true;
   this._usersService.getMerchantSettlementPlan().subscribe(res => {
    
     if(res.result.data != null)
       {
        this.MerchantPlans = res.result.data ; 
        this.showTable = true;
      }else
         this.showTable = false;
 
         console.log(this.MerchantPlans)
   })
 
   this.isTableLoading = false;
 }

  createUser(): void {
    this.showCreateOrEditUserDialog();
  }

  editUser(user: UserDto): void {
    this.showCreateOrEditUserDialog(user.id);
  }

  

 
 

  private showCreateOrEditUserDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        SetMerchantPlanDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }  

    // createOrEditUserDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }
}
