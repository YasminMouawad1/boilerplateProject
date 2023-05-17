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
  templateUrl: './set-online-against.component.html',
  styleUrls:['./set-online-against.component.css'],
  animations: [appModuleAnimation()],
})
export class SetonlineAgainstComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
 users:any;
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;
 
 
  constructor( 
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    ) {
    
  
  }

  ngOnInit() {
  
 }

 
 
 
 
 

}
