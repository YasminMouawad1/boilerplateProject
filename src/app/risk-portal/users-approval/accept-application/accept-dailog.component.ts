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
    templateUrl: './accept-dailog.component.html',
    styleUrls:['../users-list-approval.component.css']
  })
  export class acceptDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
    userItem:any;
    riskApprovedLimit:any;
    approveRiskComment:any;
    salesRepMessage:any;
    submitAcceptform:any;

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions,
      private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,
      private _usersServices:UsersService, 
      private router: Router, 
    ) {
      super(injector);
    }

    ngOnInit(): void {

     this.userItem = this._modalOption.initialState;
     this.riskApprovedLimit = this._modalOption.initialState.riskApprovedLimit;
     this.approveRiskComment = this._modalOption.initialState.approveRiskComment;
     this.salesRepMessage = this._modalOption.initialState.salesRepMessage;
     this.submitAcceptform = this._modalOption.initialState.submitAcceptform;
 
    }

 

    hide(){
      this.bsModalRef.hide()
    }


    accceptRiskApplication() {
     
        this.submitAcceptform = true;
        const data = {
          clientNationalId: this.userItem.userItem.nationalId,
          riskComment: this.approveRiskComment,
          riskApprovedLimit: this.riskApprovedLimit,
          clientStatus: true,
          salesRepMessage:this.salesRepMessage
    
        }; 
 
    
          this._usersServices.postUser(data).subscribe((res) => {
          if (res) { 
            abp.message.success("Accept Risk successfully")
            this.router.navigate(['/app/users-approval'])
          }
        });
      }
 
  }
