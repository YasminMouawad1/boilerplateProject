import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
    Input
  } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';
  import {
    UserServiceProxy,
    CreateUserDto,
    RoleDto,
    LookUpServiceProxy,
    DueTransactionsServiceProxy
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { UsersService } from '@shared/services/endpoints/users.service';

  @Component({
    templateUrl: './reject-dailog.component.html',
    styleUrls:['../users-list-approval.component.css']
  })
  export class rejectDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
    userItem:any; 

    submitrejectform:any;
    rejectionValidationForm:any;
    rejectionReason:any;
    rejectRiskComment:any;
    salesRepMessage:any;
    rejectResponse:any;

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions,
      private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,
      private _usersServices:UsersService, 
      private router: Router
    ) {
      super(injector);
    }

    ngOnInit(): void {

     this.userItem = this._modalOption.initialState;
     this.submitrejectform = this._modalOption.initialState.submitrejectform;
     this.rejectionValidationForm = this._modalOption.initialState.rejectionValidationForm;
     this.rejectionReason = this._modalOption.initialState.rejectionReason; 
     this.rejectRiskComment=this._modalOption.initialState.rejectRiskComment; 
     this.salesRepMessage = this._modalOption.initialState.salesRepMessage; 
     this.rejectResponse = this._modalOption.initialState.rejectResponse;
    }

 

    hide(){
      this.bsModalRef.hide()
    }


    async rejectRiskApplication() {
      this.submitrejectform = true;
      if (!this.rejectionValidationForm.valid)
        return;
  
      const data = {
        clientNationalId: this.userItem.nationalId,
        riskComment: this.rejectRiskComment,
        rejectionReason: this.rejectionReason,
        clientStatus: false,
  
        salesRepMessage:this.salesRepMessage
  
      };
      
      await this._usersServices.postUser(data).subscribe((res) => {
        if (res.status) {
          //this.toastr.error("",  'Reject Risk successfully');
          //this.router.navigate(['/app/users-approval'])
        }
      });
    }
 
  }
