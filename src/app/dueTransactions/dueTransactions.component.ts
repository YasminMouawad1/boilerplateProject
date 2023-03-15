import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { LookUpServiceProxy,
   LookupDto, UserServiceProxy ,
   UserDto,UserDtoPagedResultDto, LookupCorporateDto,} from '@shared/service-proxies/service-proxies';
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

    merchantDueTransactions:any[]=[
        {
         debtRecordCode:'202',branchAname:'branch1',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
         merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
         bookingDate:'20/1/2023',merchantDue:4555
        },
        {
            debtRecordCode:'202',branchAname:'branch2',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch3',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch4',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch5',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch6',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch7',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch8',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },

    ];

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

  constructor(injector: Injector,  private _LookUpServiceProxy:LookUpServiceProxy,private _userService: UserServiceProxy,
    private _modalService: BsModalService) {
    super(injector);
     this. getAllMerchant();
    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '300',
      placeholder: "Select a Merchant",
      allowClear: true
    };


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

  // (()=> {
  //     // Whatever is here will be executed as soon as the script is loaded.
  //     console.log('executed')
  // })();

 getAllMerchant(){
  this._LookUpServiceProxy.getAllCorporate().subscribe((result: LookupCorporateDto[] ) =>{
    this.merchantList = result.map(item=>{

      return <Select2OptionData>
      {
            id : item.corpCode,
            text: item.enName
       };

    });

      console.log(this.merchantList)
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
    this.showCreateClaimsDialog(this.checkedList);
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

public onMrchantChanged(event: string) {
  console.log('model changed: ' + event);
}
  confirm() {
    debugger;
    this.disableconfirmBtn = true;
    const data = { merchants: this.listID };

    // this._userService.confirm(data).subscribe((res) => {
    //   if (res) {
    //     debugger
    //   // this.convetToPDF();
    //     this.toastr.success("",  'Saved successfully');


    //     setTimeout(()=>{
    //         window.location.reload()
    //          }, 3000);
    //   } else {
    //     this.spWarning = true;
    //     setTimeout(()=>{
    //          this.spWarning = false;
    //          }, 3000);
    //   }
    // });



  }

}
