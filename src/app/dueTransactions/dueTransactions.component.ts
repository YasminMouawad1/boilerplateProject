import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { LookUpServiceProxy,
   LookupDto, UserServiceProxy ,
   UserDto,UserDtoPagedResultDto, LookupCorporateDto, LookupMerchantsDto, DueTransactionsServiceProxy, MerchantLoansDto,} from '@shared/service-proxies/service-proxies';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ClaimsDialogComponent } from './add-claims/claims-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './dueTransactions.component.html',
  styleUrls:['./dueTransactions.component.css'],
  animations: [appModuleAnimation()],
})
export class DueTransactionComponent extends PagedListingComponentBase<UserDto> {

    merchantDueTransactions:any[]=[];

    masterSelected:boolean = false;

    public merchantList: Array<Select2OptionData>;
    public options: Options;
    merchantCode:string = '';

    users: UserDto[] = [];

  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;


  checkedList: any[] = [];
  listID: number[] = [];
  countDebtRecordCode :number = 0;
  sumLoanAmount:number = 0;
  sumCommissionAmount:number = 0;
  sumMerchantDiscount:number = 0;
  sumAdminFee:number = 0;
  SumofMerchantDue:number = 0;
  spWarning:boolean = false;
  disableconfirmBtn:boolean = false;

  countRows:number = 0;
  constructor(injector: Injector,  private _LookUpServiceProxy:LookUpServiceProxy, private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,private _userService: UserServiceProxy,
    private _modalService: BsModalService) {
    super(injector);


    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '300',
      placeholder: "Select a Merchant",
      allowClear: true
    };

this.getAllMerchant();
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




  checkUncheckAll(){
      for (var i = 0; i < this.merchantDueTransactions.length; i++) {
        this.merchantDueTransactions[i].isSelected = this.masterSelected;
      } 
      this.getCheckedItemList()
      }


  isAllSelected() {
        this.masterSelected = this.merchantDueTransactions.every(function(item:any) {
            return item.isSelected == true;
          })
        this.getCheckedItemList();
      }



 getAllMerchant(){
  debugger
  this._LookUpServiceProxy.getAllMerchants().subscribe((result: LookupMerchantsDto[] ) =>{
    debugger
    this.merchantList = result.map(item=>{

      return <Select2OptionData>
      {
            id : item.merchantCode.toString(),
            text: item.englishName
       };

    });


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

  getCheckedItemList() {
    this.checkedList = [];
    this.listID = [];


    for (var i = 0; i < this.merchantDueTransactions.length; i++) {
      if (this.merchantDueTransactions[i].isSelected) {
        debugger;
        this.checkedList.push(this.merchantDueTransactions[i]);
        this.listID.push(this.merchantDueTransactions[i].debtRecordCode);


      }
    }
  }

  createClaims(): void {
    debugger;
    abp.ui.setBusy()
    this.disableconfirmBtn = true;
    const data = { merchants: this.listID };
    this._DueTransactionsServiceProxy.createRequestClaim(this.listID).subscribe((result: boolean) =>{
       if(result){
        abp.notify.success(this.l('CreateRequestClaimSuccessfully'));
        abp.ui.clearBusy()
       }

      });
  }

  private showCreateClaimsDialog(list: any[]): void {
    let createClaimsDialog: BsModalRef;

    const initialState = {
      viewList: list

    };

      createClaimsDialog = this._modalService.show(ClaimsDialogComponent,{class: 'modal-lg', initialState });


    createClaimsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  onMrchantChanged (event){
    if(event >0)
    {
      abp.ui.setBusy()
this._DueTransactionsServiceProxy.getMerchantLoans(event)
.subscribe((result: MerchantLoansDto[] ) =>{
  debugger
  this.merchantDueTransactions = result;
  abp.ui.clearBusy()
  });
}
}

  confirm() {
    debugger;
    abp.ui.setBusy()
    this.disableconfirmBtn = true;
    const data = { merchants: this.listID };
    this._DueTransactionsServiceProxy.createRequestClaim(this.listID).subscribe((result: boolean) =>{
       if(result){
        abp.notify.success(this.l('CreateRequestClaimSuccessfully'));
        abp.ui.clearBusy()
       }

      });

  }

}
