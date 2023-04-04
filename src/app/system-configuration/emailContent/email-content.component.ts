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
import { CreateEmailContentDialogComponent } from './create-email-conent/create-email-content-dailog.component';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './email-content.component.html',
  styleUrls:['./email-content.component.css'],
  animations: [appModuleAnimation()]
})
export class EmailContentComponent extends PagedListingComponentBase<UserDto> {
  users: UserDto[] = [];
  emailContents:any;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  isShowEmailContentList = abp.auth.isGranted("Pages.SystemConfiguration.CreateEmail ");
  isShowEmailContentCreate = abp.auth.isGranted("Pages.SystemConfiguration.CreateEmail.Add");
  isShowEmailContentEdit = abp.auth.isGranted("Pages.SystemConfiguration.CreateEmail.Edit");

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,

    private _modalService: BsModalService
  ) {
    super(injector);

  }

  createContent(): void {
    this.showCreateOrEditUserDialog();
  }

  editCntent(user: UserDto): void {
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
        CreateEmailContentDialogComponent,
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
