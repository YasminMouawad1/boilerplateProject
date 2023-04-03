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
    templateUrl: './edit-dailog.component.html',
    styleUrls:['../users-list-approval.component.css']
  })
  export class editDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
    userItem:any;
    oldRiskApprovedLimit:any;
    isEditRiskLimit:any;
    riskApprovedLimit:any;
    editPersonalData:any;
    expireDate:any;
    dateOfBirth:any;
    gender:any;
    maritalStatuses:any;
    maritalStatus:any;

    isTableLoading : boolean = false;

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

      this.isTableLoading = true;

      this.userItem = this._modalOption.initialState;
      this.oldRiskApprovedLimit = this._modalOption.initialState.oldRiskApprovedLimit;
      this.isEditRiskLimit = this._modalOption.initialState.isEditRiskLimit;
      this.riskApprovedLimit = this._modalOption.initialState.riskApprovedLimit; 
      this.editPersonalData=this._modalOption.initialState.editPersonalData; 
      this.expireDate = this._modalOption.initialState.expireDate;
      this.dateOfBirth= this._modalOption.initialState.dateOfBirth;
      this.gender = this._modalOption.initialState.gender;
      this.maritalStatuses=this._modalOption.initialState.maritalStatuses;
      this.maritalStatus= this._modalOption.initialState.maritalStatus;

      this.isTableLoading = false;
    }

 

    hide(){
      this.bsModalRef.hide()
    }


    updatePersonalData(){
      if (!this.editPersonalData.valid){
         return;
      }
  
      const data = {
        nameAr: this.editPersonalData.value.name,
        nameEn: this.editPersonalData.value.nameEn,
        job: this.editPersonalData.value.jobTitle,
        status : this.editPersonalData.value.maritalStatus,
        mobileNumber: this.editPersonalData.value.phoneNumber,
        gender:this.editPersonalData.value.gender,
        address:this.editPersonalData.value.homeAddress,
        expirationDate:this.editPersonalData.value.expiryDate,
        dateOfBirth:this.editPersonalData.value.dateOfBirth,
      };
  
   
  
      this._usersServices.EditUserNationalIdData(data).subscribe((res) => {
        if(res)
        { 
          abp.message.success("Edit USer NationalID Data successfully")
          this.router.navigate(['/app/users-approval'])
       
        } 
      });
  
    }

     
  }
