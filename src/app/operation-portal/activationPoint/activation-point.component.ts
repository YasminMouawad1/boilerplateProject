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
  ApplicationsOnBoardingDtoPagedResultDto,
  PortalRegistrationUsersServiceProxy
} from '@shared/service-proxies/service-proxies';  
import { AddActivationPointDialogComponent } from './add-activation-point/add-activation-point-dailog.component';
import { UsersService } from '@shared/services/endpoints/users.service';
import { EditActivationPointDialogComponent } from './edit-activation-point/edit-activation-point-dailog.component';

 
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './activation-point.component.html',
  styleUrls:['./activation-point.component.css'],
  animations: [appModuleAnimation()]
})
export class ActivationPointComponent extends PagedListingComponentBase<UserDto> implements OnInit{
  users: UserDto[] = [];
  points:any;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;
 
  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _BulkOnBoardingServiceProxy: BulkOnBoardingServiceProxy,
    private _PortalRegistrationUsersServiceProxy:PortalRegistrationUsersServiceProxy,
    private _modalService: BsModalService,
    private _usersService:UsersService,
  ) {
    super(injector);

  }

  ngOnInit(): void {
      this.getActivationPoints(); 
  }


  createPoint(): void {
    this.showAddActivationPointDialog();
  }
 
  editPoint(id:any){
     this.showEditActivationPointDialog();
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
 

  private showAddActivationPointDialog(id?: number): void {
    let createActivationPointDialog: BsModalRef;
    if (!id) {
      createActivationPointDialog = this._modalService.show(
        AddActivationPointDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }  

    createActivationPointDialog.content.onSave.subscribe(() => {
      this.refreshTab();
    });
  }

  private showEditActivationPointDialog(id?: number): void {


    const initialState = {
      init_pointID: id, 
    };

    let editActivationPointDialog: BsModalRef;
    if (!id) {
      editActivationPointDialog = this._modalService.show(
        EditActivationPointDialogComponent,
        {class: 'modal-lg', initialState }
      );
    }  

    editActivationPointDialog.content.onSave.subscribe(() => {
      this.refreshTab();
    });
  }

  refreshTab(){
    this.getActivationPoints();
  }
  getActivationPoints(){
        this._usersService.getActivationPoints().subscribe((res) => {
        
              this.points = res.result.data
             console.log(res)
        });
  }
}
