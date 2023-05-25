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
import { FormControl, FormGroup, Validators } from '@angular/forms';


  @Component({
    templateUrl: './add-dailog.component.html',
    styleUrls:['../restricted-iscore.component.css']
  })
  export class addRestrictedIScoreDialogComponent extends AppComponentBase
    implements OnInit {
     
        configurationProfession!:FormGroup;
        
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
        this.configurationProfession = new FormGroup({
            name:new FormControl('',Validators.required),
            code:new FormControl('',Validators.required),
            isActive:new FormControl('',Validators.required),
            isDeleted:new FormControl('',Validators.required)
          })
    }

 

    hide(){
      this.bsModalRef.hide()
    }

    createSystemConfiguration(){
        if (!this.configurationProfession.valid){
           return;
        }
  
        const data = {
          name: this.configurationProfession.value.name,
          code : this.configurationProfession.value.code,
          isActive: this.configurationProfession.value.isActive,
          isDeleted:this.configurationProfession.value.isDeleted
        };
  
      this._usersServices.createSystemCongifurationProfession(data).subscribe(res =>{
        if(res){
         // this.getAllProfessionList();
        }
        else
           {
  
           }
        })
       }

 
 
  }
