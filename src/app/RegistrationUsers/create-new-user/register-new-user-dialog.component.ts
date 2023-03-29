import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
  } from '@angular/core';
  import { BsModalRef } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';
  import {
    UserServiceProxy, 
    RoleDto,
    LookUpServiceProxy
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'html2canvas';
  
  @Component({
    templateUrl: './register-new-user-dialog.component.html',
    styleUrls:['../RegistrationUsers.component.css']
  })
  export class RegisterNewUserDialogComponent extends AppComponentBase
    implements OnInit {
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
  



 registerationForm:FormGroup;

 public merchantData: Array<Select2OptionData>;
 public merchantOptions: Options;
 
 public activationPointIdData: Array<Select2OptionData>;
 public activationPointIdOptions: Options;
    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public formBuilder: FormBuilder,
      private _LookUpServiceProxy:LookUpServiceProxy,
    ) {
      super(injector);
    }
  
    ngOnInit(): void { 
      

      this.registerationForm = new FormGroup({
        NationalId:new FormControl('', Validators.required), 
        arName: new FormControl('', Validators.required), 
        enName: new FormControl('', Validators.required), 
        mobileNumber: new FormControl('', Validators.required), 
        activationPointId: new FormControl('', Validators.required), 
        branchPhoneNumber: new FormControl('', Validators.required), 
        merchantCode: new FormControl('', Validators.required), 
        merchantLogo: new FormControl('', Validators.required), 
        sendSms: new FormControl('', Validators.required), 
        merchantPortalSignUp: new FormControl('', Validators.required), 
        merchantSignUp: new FormControl('', Validators.required), 
        salesSignUp: new FormControl('', Validators.required), 
      
      });

  this._lookupService.getAllCorporate().subscribe((result) => {
    
  });
  
      this._userService.getRoles().subscribe((result) => {
        this.roles = result.items;
        this.setInitialRolesStatus();
      });


      this.getAllMerchants();
      this.getAllActivationPoint();
      // this.merchantOptions = {
      //   multiple: false,
      //   closeOnSelect: true,
      //   width: '100%',
      //   placeholder: "Select a merchant",
      //   allowClear: true
      // };
    }
  
    setInitialRolesStatus(): void {
      _map(this.roles, (item) => {
        this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
          item.normalizedName
        );
      });
    }
  
    isRoleChecked(normalizedName: string): boolean {
      // just return default role checked status
      // it's better to use a setting
      return this.defaultRoleCheckedStatus;
    }
  
    onRoleChange(role: RoleDto, $event) {
      this.checkedRolesMap[role.normalizedName] = $event.target.checked;
    }
  
    getCheckedRoles(): string[] {
      const roles: string[] = [];
      _forEach(this.checkedRolesMap, function (value, key) {
        if (value) {
          roles.push(key);
        }
      });
      return roles;
    }
  
    save(): void {
      this.saving = true;
  
      // this.user.roleNames = this.getCheckedRoles();
  
      // this._userService.create(this.user).subscribe(
      //   () => {
      //     this.notify.info(this.l('SavedSuccessfully'));
      //     this.bsModalRef.hide();
      //     this.onSave.emit();
      //   },
      //   () => {
      //     this.saving = false;
      //   }
      // );
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
      
      // this._LookUpServiceProxy.getAllMerchants().subscribe((result: any) =>{
  
      //   this.merchantData = result.map(item=>{
  
      //     return <Select2OptionData>
      //     {
      //           id : item.merchantCode,
      //           text: item.englishName
      //      };
  
      //   });
  
  
      // });
    }

    registerUser(){
       const data = {
        NationalId:this.registerationForm.controls['NationalId'].value,
        arName: this.registerationForm.controls['arName'].value,
        enName: this.registerationForm.controls['enName'].value,
        mobileNumber: this.registerationForm.controls['mobileNumber'].value,  
        activationPointId: 0,
        branchPhoneNumber: this.registerationForm.controls['branchPhoneNumber'].value,
        merchantCode: this.registerationForm.controls['merchantCode'].value,
        merchantLogo: this.registerationForm.controls['merchantLogo'].value,
        sendSms: this.registerationForm.controls['sendSms'].value,
        merchantPortalSignUp: this.registerationForm.controls['merchantPortalSignUp'].value, 
        merchantSignUp: this.registerationForm.controls['merchantSignUp'].value,
        salesSignUp: this.registerationForm.controls['salesSignUp'].value
       
       }

       console.log(data)
    }
  }
  