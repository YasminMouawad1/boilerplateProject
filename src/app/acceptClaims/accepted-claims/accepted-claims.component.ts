import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
    Input
  } from '@angular/core';
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
import { CheckedListService } from '@shared/services/endpoints/checkedList.services';
import { Router } from '@angular/router';

  @Component({
    templateUrl: './accepted-claims.component.html',
    styleUrls:['../accept-claims-list.component.css']
  })
  export class AcceptedClaimsComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     viewList:any;
     listID:any;

    spWarning:boolean = false;

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions,
      private _Router:Router,
      private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,
      private _checkedList:CheckedListService
    ) {
      super(injector);
    }

    ngOnInit(): void {
 
     this.viewList = this._checkedList.list; 
     this.listID = this._checkedList.listID;
    }

    confirm(){
       debugger;
    abp.ui.setBusy()
    this.disableconfirmBtn = true;
    const data = { merchants: this.listID };
    this._DueTransactionsServiceProxy.createRequestClaim(this.listID).subscribe((result: boolean) =>{
       if(result){
        abp.notify.success(this.l('CreateRequestClaimSuccessfully'));
        abp.ui.clearBusy()
        this.bsModalRef.hide()
       }


      });
    }

    
    back(){
      this._Router.navigate(['/app/accept-claims/'])
    }

    hide(){
      this.bsModalRef.hide()
    }

 
  }
