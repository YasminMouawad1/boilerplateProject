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
import { editMerchantPlanDialogComponent } from './edit-merchant/edit-merchant-dailog.component';
import { SpinnerService } from '@shared/services/endpoints/spinner.service';

 
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
    private _spinnerService:SpinnerService,
    private _modalService: BsModalService
  ) {
    //super(injector);

  }

   

  ngOnInit() {
    this._spinnerService.requestStarted();
    this.getSettlementPlan();
 }

 getSettlementPlan( ){
   debugger
 
 this.isTableLoading = true;
  this._spinnerService.requestStarted();

   this._usersService.getMerchantSettlementPlan().subscribe(res => {
    
     if(res != null)
       {
        this.MerchantPlans = res.result.data ; 
        this.showTable = true;
      }else
         this.showTable = false;
  
   })

 
   this.isTableLoading = false;
 }

 

  createPlan() {
    this.showCreatePlanDialog();
  }

  editPlan(merchantCode:any) {
    this.showEditPlanDialog(merchantCode);
  }

  

 
 

  private showCreatePlanDialog(): void {
    let createOrEditUserDialog: BsModalRef;
    createOrEditUserDialog = this._modalService.show(
        SetMerchantPlanDialogComponent,
        {
          class: 'modal-lg',
        }
      );
  
  }

  private showEditPlanDialog(merchantCode:any): void {
    let EditPlanDialog: BsModalRef;

    const initialState = {
      init_merchantCode: merchantCode, 
    };
    
      EditPlanDialog = this._modalService.show(
        editMerchantPlanDialogComponent,
        {class: 'modal-lg', initialState }
      );
 

    
  }
}
