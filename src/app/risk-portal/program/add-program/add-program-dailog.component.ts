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
import Swal from 'sweetalert2';


  @Component({
    templateUrl: './add-program-dailog.component.html',
    styleUrls:['../program.compoent.css']
  })
  export class AddProgramDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
     

    isTableLoading:boolean = false;

    submitAddProgramForm!: FormGroup;
    submitForm = false;
 

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
      this.isTableLoading = true;
  
 
     this.submitAddProgramForm = this.formBuilder.group({
      nameAR: ['', [Validators.required]],
      nameEn: ['', [Validators.required]], 
    });
    
     this.isTableLoading = false;

     
    }

 

    hide(){
      this.bsModalRef.hide()
    }

 
    AddProgram() {
      this.submitForm = true;
      if (!this.submitAddProgramForm.valid)
        return;
  
         
      const data = {
        nameAR: this.submitAddProgramForm.value.nameAR,
        nameEn:this.submitAddProgramForm.value.nameEn
      };
      
      this._usersServices.AddProgram(data).subscribe(res => {
         if(res){
          
         Swal.fire({
          icon: 'success', 
          text: 'Add Program Successfully !!', 
        })
           this.bsModalRef.hide();
         }
      })

      
    }
 
  }
