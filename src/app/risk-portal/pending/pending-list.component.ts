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
  BulkOnBoardingServiceProxy, 
  ApplicationsOnBoardingDto,
  RiskServiceProxy
} from '@shared/service-proxies/service-proxies';

import{ Router} from '@angular/router';
import {UsersService} from '@shared/services/endpoints/users.service'
import { SpinnerService } from '@shared/services/endpoints/spinner.service';

class PagedApplicationsOnBoardingDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './pending-list.component.html',
  styleUrls:['./pending-list.component.css'],
  animations: [appModuleAnimation()],
})
export class PendingListComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
 users:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;

 isShowRiskSoftReject = abp.auth.isGranted("Pages.Risk.SoftRejected");
 
  constructor( 
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getUserSoftRejectList();
 }

 getUserSoftRejectList(page :number = 1 ,pageSize :number = 10  ){
  
this._SpinnerService.requestStarted();
this.isTableLoading = true;
   this._userService.getRiskRejectedProfileList(page, pageSize).subscribe(res => {
    
     if(res.result.data != null)
       {
        this.users = res.result.data ; 
        this.showTable = true;
      }else
         this.showTable = false;

       this._SpinnerService.requestEnded();
   })

   this._SpinnerService.requestEnded();
   this.isTableLoading = false;
 }
 

viewDetails(phoneNum:string): void {
this._Router.navigate(['/app/risk-portal/details-item/'+ phoneNum])
}



  

 

 

 

}