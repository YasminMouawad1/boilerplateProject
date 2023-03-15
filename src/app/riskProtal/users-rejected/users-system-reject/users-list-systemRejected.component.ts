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
  UserApprovalDto,
  UserDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  ApplicationsOnBoardingDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'; 
import { Router } from '@angular/router';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './users-list-systemRejected.component.html',
  styleUrls:['./users-list-systemRejected.component.css'],
  animations: [appModuleAnimation()]
})
export class UsersListSystemRejectedComponent extends PagedListingComponentBase<UserApprovalDto> {
  users: UserApprovalDto[] = [];
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

    this.users = []

  }




  protected delete(user: UserApprovalDto): void {
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
    this._Router.navigate(['/app/user-itemsystemReject/'+ phoneNum])
  }
  
}
