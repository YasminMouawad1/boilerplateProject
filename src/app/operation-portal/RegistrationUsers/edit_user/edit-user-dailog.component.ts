import { Component, Injector, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { 
  RoleDto, 
  LookUpServiceProxy, 
  PortalRegistrationUsersServiceProxy,
  PortalUsersRegistrationDto,
  UserServiceProxy
} from '@shared/service-proxies/service-proxies';
import { UsersService } from '@shared/services/endpoints/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

 

@Component({
  templateUrl:  './edit-user-dailog.component.html',
  styleUrls:['../RegistrationUsers.component.css'],
  animations: [appModuleAnimation()],
})
export class editUserDialogComponent implements OnInit{
    saving = false; 
     
    roles: RoleDto[] = [];
    checkedRolesMap: { [key: string]: boolean } = {};
    defaultRoleCheckedStatus = false;
    passwordValidationErrors: Partial<AbpValidationError>[] = [
      {
        name: 'pattern',
        localizationKey:
          'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber',
      },
    ];
    confirmPasswordValidationErrors: Partial<AbpValidationError>[] = [
      {
        name: 'validateEqual',
        localizationKey: 'PasswordsDoNotMatch',
      },
    ];
  
    @Output() onSave = new EventEmitter<any>();
  

init_id:any;
merchantPortalSignUp:any;
merchantSignUp:any;
salesSignUp:any;
mobileNumber:any;
smsMsg:boolean = false;


 registerationForm:FormGroup;

 public merchantData: Array<Select2OptionData>;
 public merchantOptions: Options;
 
 public activationPointIdData: Array<Select2OptionData>;
 public activationPointIdOptions: Options;

 document:any = '';

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy, 
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public formBuilder: FormBuilder,
      private _LookUpServiceProxy:LookUpServiceProxy,
      private _usersServices:UsersService,
      private router:Router,
      public _modalOption:ModalOptions,
      private _PortalRegistrationUsersServiceProxy:PortalRegistrationUsersServiceProxy
    ) {
      //super(injector);
    }
  
    ngOnInit(): void { 
       
       
      
 
  
     

      this.getAllMerchants();
      this.getAllActivationPoint();
      // this.merchantOptions = {
      //   multiple: false,
      //   closeOnSelect: true,
      //   width: '100%',
      //   placeholder: "Select a merchant",
      //   allowClear: true
      // };

      this.init_id =  this._modalOption.initialState.init_id;
      this.merchantPortalSignUp =  this._modalOption.initialState.merchantPortalSignUp;
      this.merchantSignUp =  this._modalOption.initialState.merchantSignUp;
      this.salesSignUp =  this._modalOption.initialState.salesSignUp;
     

      this.getUserByID();
    }
  
   
    getUserByID(){
      let body = {
        id:this.init_id,
        NationalId:'',
        arName: '',
        enName: '',
        mobileNumber: '',  
        activationPointId: 0, 
        password:'',
        branchPhoneNumber: '',
        merchantCode: '',
        merchantLogo: '',
        sendSms: false,
        merchantPortalSignUp: this.merchantPortalSignUp, 
        merchantSignUp: this.merchantSignUp,
        salesSignUp: this.salesSignUp
       
      } 

        this._usersServices.getMerchantUserByID(body).subscribe( (res) =>{
       
        
           this.mobileNumber = res.result.data.mobileNumber;
           
         
         
        })
    }

    editUser(){
 

      let body = {
          //id:this.init_id,
          NationalId:'',
          arName: '',
          enName: '', 
          mobileNumber: this.mobileNumber,
          activationPointId: 0, 
          password:'',
          branchPhoneNumber: '',
          merchantCode: '',
          merchantLogo: '', 
          sendSms: this.smsMsg,
          merchantPortalSignUp: this.merchantPortalSignUp,
          merchantSignUp: this.merchantSignUp,
          salesSignUp: this.salesSignUp,
          
          
         
        
      }
 

      console.log(body)

      this._usersServices.registerationUser(body).subscribe((res) =>{
         
          if(res){
             abp.message.success("reset Password successfully");
             this.bsModalRef.hide();
             //this.reloadCurrentRoute();
          }
            
      })
    }
  
   

    hide(){
      this.bsModalRef.hide()
    }

    getAllMerchants(){
      debugger
      this._LookUpServiceProxy.getAllMerchants().subscribe((result: any) =>{
  
        this.merchantData = result.map(item=>{
  
          return <Select2OptionData>
          {
                id : item.merchantCode,
                text: item.englishName
           };
  
        });
  
  
      });
    }

    getAllActivationPoint(){
      
      this._usersServices.getActivationPoints().subscribe((result: any) =>{
  debugger
  
        this.activationPointIdData = result.result.data.map(item=>{
  
          return <Select2OptionData>
          {
                id : item.id,
                text: item.name
           };
  
        });
  
  
      });
    }



   selectFile(event:any){
      debugger
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
      
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    
    reader.onload = (_event) => { 
      this.document = reader.result; 
    }
 
 
  }

 

    reloadCurrentRoute() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
    
  }