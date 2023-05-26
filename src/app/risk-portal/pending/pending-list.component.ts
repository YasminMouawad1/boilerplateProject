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
 
 ReExminedRequests:any;
 NewRequests:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;

 notifications:number = 14;
 displayNotifications:string= '';
 
  constructor( 
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getReExaminedList();
    this.getNewRequestsList();


    if(this.notifications > 9)
    this.displayNotifications = '9 +';
 else
    this.displayNotifications = '' + this.notifications;

 }

 getReExaminedList(){
   
this.isTableLoading = true;
   this._userService.RequestsDataGetAll(2003).subscribe(res => {
    
     if(res.result.items != null)
       {
        this.ReExminedRequests = res.result.items ; 
        this.showTable = true;
      }else
         this.showTable = false;
 
   })
 
   this.isTableLoading = false;
 }

 getNewRequestsList(){
   
  this.isTableLoading = true;
     this._userService.RequestsDataGetAll(2000).subscribe(res => {
      
       if(res.result.items != null)
         {
          this.NewRequests = res.result.items ; 
          this.showTable = true;
        }else
           this.showTable = false;
   
     })
   
     this.isTableLoading = false;
   }
 

viewDetails(publicId:string): void {
this._Router.navigate(['/app/risk-portal/details-item/'+ publicId])
}

 
 

}
