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
  templateUrl: './coporates.component.html',
  styleUrls:['./coporates.component.css'],
  animations: [appModuleAnimation()],
})
export class CoporatesListComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
  corpList:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;
 
  constructor( 
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getAllCoporates();
 }

 getAllCoporates(page :number = 1 ,pageSize :number = 10  ){
   
this.isTableLoading = true;
   this._userService.getBulkBoradingList(page, pageSize).subscribe(res => {
    
     if(res.result.data != null)
       {
        this.corpList = res.result.data ; 
        this.showTable = true;
      }else
         this.showTable = false;
 
   })
 
   this.isTableLoading = false;
 }
 

viewDetails(phoneNum:string): void {
this._Router.navigate(['/app/user-item/'+ phoneNum])
}



  

 

 

 

}
