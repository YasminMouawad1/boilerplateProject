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
  templateUrl: './edit-program-dailog.component.html',
  styleUrls:['../program.compoent.css']
})
export class EditProgramDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  disableconfirmBtn:boolean = false;

  @Output() onSave = new EventEmitter<any>();
   
   

  isTableLoading:boolean = false;

  submitEditProgramForm!: FormGroup;
  submitForm = false;

  id:any;
  nameAR:any;
  nameEn:any;
 

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


  
  
   this.isTableLoading = false;

     this.id = this._modalOption.initialState.id; 
     this.nameAR = this._modalOption.initialState.nameAR; 
     this.nameEn = this._modalOption.initialState.nameEn; 

   
     
     this.submitEditProgramForm = this.formBuilder.group({
      id:[this.id,[Validators.required]],
      nameAR: [this.nameAR, [Validators.required]],
      nameEn: [this.nameEn, [Validators.required]], 
    });

  }



  hide(){
    this.bsModalRef.hide()
  }


  EditProgram() {
    this.submitForm = true;
    if (!this.submitEditProgramForm.valid)
      return;

       
    const data = {
      id:this.submitEditProgramForm.value.id,
      nameAR: this.submitEditProgramForm.value.nameAR,
      nameEn:this.submitEditProgramForm.value.nameEn
    };
    
    this._usersServices.EditProgram(data).subscribe(res => {
       if(res){
        
       Swal.fire({
        icon: 'success', 
        text: 'Edit Program Successfully !!', 
      })
         this.bsModalRef.hide();
       }
    })

    
  }

}
