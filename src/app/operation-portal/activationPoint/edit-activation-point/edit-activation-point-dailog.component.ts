import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
  } from '@angular/core';
  import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';
  import {
    UserServiceProxy,
    CreateUserDto,
    RoleDto,
    LookUpServiceProxy,
    PortalRegistrationUsersServiceProxy,
    AddActivationPointDto
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { Router } from '@angular/router';
import { UsersService } from '@shared/services/endpoints/users.service';
  
  @Component({
    templateUrl: './edit-activation-point-dailog.component.html',
    styleUrls:['../activation-point.component.css']
  })
  export class EditActivationPointDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    //user = new CreateUserDto();
    user:any;
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
    init_pointID : any;
    name : string = '';
    longitude : string = '';
    latitude : string = '';
    
    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      private router: Router,
      public _portalRegistrationUsersServiceProxy:PortalRegistrationUsersServiceProxy,
      public _modalOption:ModalOptions,
      private _usersServices:UsersService,
    ) {
      super(injector);
    }
  
    ngOnInit(): void {

        this.init_pointID =  this._modalOption.initialState.init_pointID;
       
        this.GetActivationPointById();
    }

    GetActivationPointById(){
      this._usersServices.getActivationByID(this.init_pointID).subscribe((res) =>{
       
           this.init_pointID = res.result.data.id;
           this.name = res.result.data.name;
           this.longitude = res.result.data.longitude;
           this.latitude = res.result.data.latitude;
          console.log(res)
      })
}
   
  
    save(): void {
      this.saving = true;
   
      let body  = { 
        id:this.init_pointID,
        name: this.name,
        longitude: this.longitude,
        latitude: this.latitude
      }
    var object = new AddActivationPointDto ()
  
    
    object.init(body)  
  
    this._portalRegistrationUsersServiceProxy.addActivarionPoints(object).subscribe( (res ) => {
          
        if(res){
          abp.message.success("Edit Activation Point successfully");
          this.bsModalRef.hide();
         this.reloadCurrentRoute();
        }
    });
    }


    reloadCurrentRoute() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
  }
  