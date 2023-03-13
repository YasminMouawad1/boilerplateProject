import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './dueTransactions.component.html',
  styleUrls:['./dueTransactions.component.css'],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DueTransactionComponent extends AppComponentBase {

    merchantDueTransactions:any[]=[
        {
         debtRecordCode:'202',branchAname:'branch1',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
         merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
         bookingDate:'20/1/2023',merchantDue:4555
        },
        {
            debtRecordCode:'202',branchAname:'branch1',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch1',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           },
           {
            debtRecordCode:'202',branchAname:'branch1',clientAname:'client1',loanAmount:5222,nationalId:'12569874563',
            merchantCommissionRate:1.5,merchantCommission:1500,adminFee:200,merchantDiscountRate:200,merchantDiscount:2.5,
            bookingDate:'20/1/2023',merchantDue:4555
           }
    ];

  constructor(injector: Injector) {
    super(injector);
  }
}
