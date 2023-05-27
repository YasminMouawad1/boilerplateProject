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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


  @Component({
    templateUrl: './time-line-dialog.component.html',
    styleUrls:['./time-line-dialog.component.css']
  })
  export class TimeLineConfirmationDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
     

    

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions,
      private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,
      private _usersServices:UsersService, 
      private router: Router, 
      public formBuilder: FormBuilder
    ) {
      super(injector);
    }

    ngOnInit(): void {
     
    }

 

    hide(){
      this.bsModalRef.hide()
    }

 
     
 
  }
