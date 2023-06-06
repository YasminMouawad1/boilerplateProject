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
import Swal from 'sweetalert2';


  @Component({
    templateUrl: './submit-pending-dialog.component.html',
    styleUrls:['../detailsItem.component.css']
  })
  export class SubmitPendingDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
    userItem:any;
    SelectedProgramName:any;
    riskApprovedLimit:any;
    approveRiskComment:any;
    salesRepMessage:any;
    submitAcceptform:any;

    isTableLoading:boolean = false;

    submitPendingForm!: FormGroup;
    submitForm = false;

    viewApproval:boolean = false;
    viewReject:boolean = false;
    
    errorMSG:string='';

    Programs:any;

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
     this.SelectedProgramName = this._modalOption.initialState.SelectedProgramName;

     
    
     this.submitPendingForm = this.formBuilder.group({
      action: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      approvalReason: [''],
      rejectReason: [''],
      programId:[this.SelectedProgramName.id,[Validators.required]],
    });
    
     this.isTableLoading = false;
 
     this.getAllProgram();
     
    }

    getAllProgram(){
      this._usersServices.GetAllPrograms().subscribe(res => {

        this.Programs = res.result.items;
      })
    }
  
 

    hide(){
      this.bsModalRef.hide()
    }

    saveAction(action:any){
      

      if(action === '2002'){
        this.viewReject = false;
        this.viewApproval = true;
      }
      else if(action === '2001'){
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


       if(this.userItem.programID == 'N/A'){
        this.userItem.programID = 0;
       }

      const data = {
        requestId :this.userItem.id,
        systemRiskLimit: this.userItem.systemRiskLimit,
        riskApprovedLimit :this.userItem.riskApprovedLimit,
        programID: this.submitPendingForm.value.programId,
        requestStatus: this.submitPendingForm.value.action,      
        comment:this.submitPendingForm.value.comment
  
      };


     // console.log(data)  
     this._usersServices.AddComent(this.userItem.id,data.comment).subscribe( res => {
      if(res){ 
        this.notify.success(this.l('Successfully Add Comment'));
      }
   });


      this._usersServices.CahngeRequestStatus(data).subscribe(res => {
       
        if(res.success){
          Swal.fire({
            icon: 'success', 
            text: 'Change Request status Successfully !!', 
          })
            
          this.hide();
          this.router.navigate(['/app/risk-portal/pending']);
        }else{
          Swal.fire({
            icon: 'error', 
            text: 'something error in data!!', 
          })
            
          this.hide();
          this.router.navigate(['/app/risk-portal/pending']);
        }
           
      })
      

      
    }
 
  }
