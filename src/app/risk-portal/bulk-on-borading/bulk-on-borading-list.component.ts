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
  templateUrl: './bulk-on-borading-list.component.html',
  styleUrls:['./bulk-on-borading-list.component.css'],
  animations: [appModuleAnimation()],
})
export class BulkOnBoradingListComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
 users:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;
 allDataCount:number = 0;

 term:string = '';
 CorpCode!:number;  
 corpList:any[] = [];

 isShowBulkListBtn = abp.auth.isGranted("Pages.Risk.BulkOnBorading");
 
  constructor(injector: Injector, 
    private _BulkOnBoardingServiceProxy:BulkOnBoardingServiceProxy,
    private _RiskServiceProxy:RiskServiceProxy,
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getBulkonBoarding(); 
 }


 getBulkonBoarding(page :number = 1 ,pageSize :number = 10 ){
 
  this._userService.getBulkBoradingList(page, pageSize).subscribe(res => {
    
    console.log(res)
    if(res != null)
      this.corpList = res.result.data ; 


      //this.showTable = this.corpList?.length == 0 ?false : true
      this.showTable = false;
       
      this.allDataCount = res.allDataCount;
 
  })
}

 
 

 Details(code:number){ 

   this._userService.getCorpProfilePlus(code).subscribe(res => {
     
     if(res != null)
       this.users = res.result.data ; 
      else
        this.users.length = 0;

       this.showTable = this.users?.length == 0 ?false : true

         
  })
}

viewDetails(phoneNum:string): void {
this._Router.navigate(['/app/risk-portal/bulk-on-borading-item/'+ phoneNum])
}



  

 

 

 

}
