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
    LookUpServiceProxy,
    PortalRegistrationUsersServiceProxy,
    PortalUsersRegistrationDto
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'html2canvas';
import { UsersService } from '@shared/services/endpoints/users.service';
import { Router } from '@angular/router';
  
  @Component({
    templateUrl: './create-portal-user-dialog.component.html',
    styleUrls:['../RegistrationUsers.component.css']
  })
  export class PortalUserDialogComponent extends AppComponentBase
    implements OnInit {
    
  



 registerationForm:FormGroup;

 public merchantData: Array<Select2OptionData>;
 public merchantOptions: Options;
 
 

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
      private _PortalRegistrationUsersServiceProxy:PortalRegistrationUsersServiceProxy
    ) {
      super(injector);
    }
  
    ngOnInit(): void { 
      

      this.registerationForm = new FormGroup({ 
        arName: new FormControl('', Validators.required), 
        enName: new FormControl('', Validators.required),  
        activationPointId: new FormControl('', Validators.required), 
        branchPhoneNumber: new FormControl('', Validators.required), 
        merchantCode: new FormControl('', Validators.required), 
        merchantLogo: new FormControl('', Validators.required), 
        sendSms: new FormControl(false, Validators.required),   
      
      });

  this._lookupService.getAllCorporate().subscribe((result) => {
    
  });
  
      


      this.getAllMerchants();
      
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

    console.log(this.document)
 
  }


    registerUser(){
 
       const data = { 
        arName: this.registerationForm.controls['arName'].value,
        enName: this.registerationForm.controls['enName'].value,
        mobileNumber: this.registerationForm.controls['mobileNumber'].value,    
        branchPhoneNumber: this.registerationForm.controls['branchPhoneNumber'].value,
        merchantCode: this.registerationForm.controls['merchantCode'].value,
        merchantLogo: this.document,
        sendSms: this.registerationForm.controls['sendSms'].value, 
       
       }
 
      

      var object = new  PortalUsersRegistrationDto()
object.init(data) 
 
console.log(data)
      this._PortalRegistrationUsersServiceProxy.registrationPortalUsers(object).subscribe((res : boolean)=> {
        
          if(res){
            console.log(res)
            abp.message.success("Create user successfully");
            this.bsModalRef.hide();
            this.reloadCurrentRoute();
          }
      } );
       
    }

    reloadCurrentRoute() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
    
  }
  