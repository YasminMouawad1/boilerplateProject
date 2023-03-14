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
    LookUpServiceProxy
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
  
  @Component({
    templateUrl: './claims-dialog.component.html',
    styleUrls:['../dueTransactions.component.css']
  })
  export class ClaimsDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
     
  
    @Output() onSave = new EventEmitter<any>();
     viewList:any;
  
    spWarning:boolean = false;

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions
    ) {
      super(injector);
    }
  
    ngOnInit(): void { 

     this.viewList = this._modalOption.initialState;
      
      
    }
  
      
  
    save(): void {
      this.saving = true;
   
    }
  }
  