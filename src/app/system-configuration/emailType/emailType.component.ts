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
  UserDto,
  UserDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  ApplicationsOnBoardingDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'; 
import { CreateEmailTypeDialogComponent } from './create-email-type/create-email-type-dailog.component';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './emailType.component.html',
  styleUrls:['./emailType.component.css'],
  animations: [appModuleAnimation()]
})
export class EmailTypeComponent extends PagedListingComponentBase<UserDto> {
  users: UserDto[] = [];
  types:any;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  isShowEmailTypeList = abp.auth.isGranted("Pages.SystemConfiguration.EmailType ");
  isShowEmailTypeCreate = abp.auth.isGranted("Pages.SystemConfiguration.EmailType.Add");
  isShowEmailTypeEdit = abp.auth.isGranted("Pages.SystemConfiguration.EmailType.Edit");


  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,

    private _modalService: BsModalService
  ) {
    super(injector);

  }

  createType(): void {
    this.showCreateOrEditUserDialog();
  }

  editType(user: UserDto): void {
    this.showCreateOrEditUserDialog(user.id);
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

    this._userService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: UserDtoPagedResultDto) => {
        this.users = result.items;
        this.showPaging(result, pageNumber);
      });

  }




  protected delete(user: UserDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._userService.delete(user.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
 

  private showCreateOrEditUserDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateEmailTypeDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }  

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
