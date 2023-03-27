import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  RoleServiceProxy, 
  ApplicationsOnBoardingDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  LookUpServiceProxy,
  LookupCorporateDto,
  CreateBulkOnBoardingConfigDto,
  ApplicationOnBoardingServiceProxy,
  ApplicationsOnBoardingDto,
  RiskServiceProxy
} from '@shared/service-proxies/service-proxies';

import{ Router} from '@angular/router';
import {UsersService} from '@shared/services/endpoints/users.service'

class PagedApplicationsOnBoardingDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './users-list-approval.component.html',
  styleUrls:['./users-list-approval.component.css'],
  animations: [appModuleAnimation()],
})
export class UsersListApprovalComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
 users:any;

  constructor(injector: Injector, 
    private _BulkOnBoardingServiceProxy:BulkOnBoardingServiceProxy,
    private _RiskServiceProxy:RiskServiceProxy,
    private _Router:Router,
    private _userService:UsersService,
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getUserApprovalList();
 }

 getUserApprovalList(page :number = 1 ,pageSize :number = 10  ){
  

   this._userService.getWaitingRiskApprovalList(false,page, pageSize).subscribe(res => {
    
     if(res.result.data != null)
       this.users = res.result.data ; 

   })
 }
 

viewDetails(phoneNum:string): void {
this._Router.navigate(['/app/user-item/'+ phoneNum])
}



  

 

 

 

}
