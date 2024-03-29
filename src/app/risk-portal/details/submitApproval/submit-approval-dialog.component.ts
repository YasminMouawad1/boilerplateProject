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
import { forEach as _forEach, map as _map, flatMap } from 'lodash-es';
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
  templateUrl: './submit-approval-dialog.component.html',
  styleUrls:['../detailsItem.component.css']
})
export class SubmitApprovalDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  disableconfirmBtn:boolean = false;

  @Output() onSave = new EventEmitter<any>();
   
  userItem:any;
  riskApprovedLimit:any;
  approveRiskComment:any;
  salesRepMessage:any;
  submitAcceptform:any;

  isTableLoading:boolean = false;

  submitPendingForm!: FormGroup;
  submitForm = false;

  viewApproval:boolean = false;
  viewReject:boolean = false;
  

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

   this.userItem = this._modalOption.initialState.userItem; 

   
  
   this.submitPendingForm = this.formBuilder.group({
    action: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    approvalReason: [''],
    rejectReason: [''],
  });
  
   this.isTableLoading = false;

   
   
  }



  hide(){
    this.bsModalRef.hide()
  }

  saveAction(action:any){
    

    if(action === 'approve'){
      this.viewReject = false;
      this.viewApproval = true;
    }
    else if(action === 'reject'){
      this.viewReject = true;
      this.viewApproval= false;
    }
    else{
      this.viewApproval = false;
      this.viewReject = false;
    }
       
  }


  Submit() {
    this.submitForm = true;
    if (!this.submitPendingForm.valid)
      return;

       if(this.userItem.systemRiskLimit == 'N/A'){
          this.userItem.systemRiskLimit  = 0
       }

       if(this.userItem.riskApprovedLimit == 'N/A'){
        this.userItem.riskApprovedLimit  = 0
     }


    const data = {
      requestId :this.userItem.id,
      systemRiskLimit: this.userItem.systemRiskLimit,
      riskApprovedLimit :this.userItem.riskApprovedLimit,
      programID: this.userItem.programID,
      requestStatus: this.userItem.status,      
      comment:this.submitPendingForm.value.comment

    };


   // console.log(data)  

    this._usersServices.CahngeRequestStatus(data).subscribe(res => {
      if(res)
        this.hide();
         
    })
    

    
  }

}
