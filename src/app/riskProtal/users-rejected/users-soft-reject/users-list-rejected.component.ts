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
import { Router } from '@angular/router';

import {UsersService} from '@shared/services/endpoints/users.service'


class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './users-list-rejected.component.html',
  styleUrls:['./users-list-rejeced.component.css'],
  animations: [appModuleAnimation()]
})
export class UsersListRejectedComponent implements OnInit {
  //users: UserDto[] = [];

  users :any;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,
    private _Router:Router,
    private _modalService: BsModalService, 
    private _usersService:UsersService
  ) {
    //super(injector);

   

  }

  ngOnInit() {
    this.getUserSoftRejectedList();
 }


  getUserSoftRejectedList(page :number = 1 ,pageSize :number = 10  ){
  

    this._usersService.getRiskRejectedProfileList(page, pageSize).subscribe(res => {
     
      if(res.result.data != null)
        this.users = res.result.data ; 
 
    })
  }
  
  viewDetails(phoneNum:string): void {
    this._Router.navigate(['/app/user-itemHSoftreject/'+ phoneNum])
  }
  

  
}
