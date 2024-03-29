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
  PortalUsersRegistrationDto,
  PurchaseUserRegistrationDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'html2canvas';
import { UsersService } from '@shared/services/endpoints/users.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-purchase-user-dialog.component.html',
  styleUrls:['../RegistrationUsers.component.css']
})
export class PurchaseUserDialogComponent extends AppComponentBase
  implements OnInit {
  

registerationForm:FormGroup;

public activationPointIdData: Array<Select2OptionData>;
public activationPointIdOptions: Options;


disBtnSave:boolean = false;

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
      NationalId:new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required), 
      branchPhoneNumber: new FormControl('', Validators.required),   
      sendSms: new FormControl(false, Validators.required),  
    
    });

this._lookupService.getAllCorporate().subscribe((result) => {
  
});

    


    this.getAllActivationPoint();
   
  }




  hide(){
    this.bsModalRef.hide()
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





  registerUser(){
    this.disBtnSave = true;

     const data = { 
      arName: this.registerationForm.controls['arName'].value,
      enName: this.registerationForm.controls['enName'].value,
      NationalId:this.registerationForm.controls['NationalId'].value,
      mobileNumber: this.registerationForm.controls['mobileNumber'].value,  
      branchPhoneNumber: this.registerationForm.controls['branchPhoneNumber'].value,
      sendSms: this.registerationForm.controls['sendSms'].value, 
     
     }

    

    var object = new  PurchaseUserRegistrationDto()
object.init(data) 

 
    // this._PortalRegistrationUsersServiceProxy.registrationPurchaseUser(object).subscribe((res : boolean)=> {
    //   console.log(res)
    //     if(res){
         
    //       abp.message.success("Create user successfully");
    //       this.bsModalRef.hide();
    //       this.reloadCurrentRoute();
    //     }
    // } );

    this._usersServices.addPurchaseUsers(data).subscribe(res =>{
       
      if(res){
         
              abp.message.success("Create user successfully");
              this.bsModalRef.hide();
              this.reloadCurrentRoute();
            }
    })
    this.disBtnSave = false;
     
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  
}
