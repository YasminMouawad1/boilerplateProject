import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  UserServiceProxy, 
  UserDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  ApplicationsOnBoardingDtoPagedResultDto,
  UserDto
} from '@shared/service-proxies/service-proxies'; 
import { UserItemComponent } from './user-item/user-item.component';
import{ Router} from '@angular/router';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './users-list-approval.component.html',
  styleUrls:['./users-list-approval.component.css'],
  animations: [appModuleAnimation()]
})
export class UsersListApprovalComponent extends PagedListingComponentBase<UserDto> {
  //users: UserApprovalDto[] = [];
  users:any;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,
    private _Router:Router,
    private _modalService: BsModalService
  ) {
    super(injector);

    this.users = [
      {name:'yasmin1',email:'yasmin@gmail',phoneNumber:'0111111',nationalID:'98760123',age:28,addresss:'minia',submitedDate:'15/03/2023'},
      {name:'yasmin2',email:'yasmin@gmail',phoneNumber:'0122222',nationalID:'98760123',age:28,addresss:'minia',submitedDate:'15/03/2023'},
 ]

  }


  

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    // this._userService
    //   .getAll(
    //     request.keyword,
    //     request.isActive,
    //     request.skipCount,
    //     request.maxResultCount
    //   )
    //   .pipe(
    //     finalize(() => {
    //       finishedCallback();
    //     })
    //   )
    //   .subscribe((result: UserDtoPagedResultDto) => {
    //     this.users = result.items;
    //     this.showPaging(result, pageNumber);
    //   });

   

  }




  protected delete(user: UserDto): void {
    // abp.message.confirm(
    //   this.l('UserDeleteWarningMessage', user.fullName),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this._userService.delete(user.id).subscribe(() => {
    //         abp.notify.success(this.l('SuccessfullyDeleted'));
    //         this.refresh();
    //       });
    //     }
    //   }
    // );
  }

  viewDetails(phoneNum:string): void {
    this._Router.navigate(['/app/user-item/'+ phoneNum])
  }

 
  
}
