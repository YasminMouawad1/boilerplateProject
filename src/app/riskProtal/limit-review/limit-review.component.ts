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
import { UsersService } from '@shared/services/endpoints/users.service';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './limit-review.component.html',
  styleUrls:['./limit-review.component.css'],
  animations: [appModuleAnimation()]
})
export class LimitReviewComponent implements OnInit {
  users: UserDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,

    private _modalService: BsModalService,
    private _usersService:UsersService
  ) {
    //super(injector);

  }

 
  ngOnInit() {
    this.getReviewProfilePlus();
 }

 getReviewProfilePlus(page :number = 1 ,pageSize :number = 10  ){
  

   this._usersService.getLimitReviw(page, pageSize).subscribe(res => {
    
     if(res.result.data != null)
       this.users = res.result.data ; 

   })
 }
 

  
}
