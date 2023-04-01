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
    ) {
      super(injector);
    }
  
    ngOnInit(): void {

        this.init_pointID =  this._modalOption.initialState.init_merchantCode;
      
      debugger
  this._lookupService.getAllCorporate().subscribe((result) => {
     console.log(result)
  });
  
      this._userService.getRoles().subscribe((result) => {
        this.roles = result.items;
        this.setInitialRolesStatus();
      });


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
   
      let body  = { 
        name: this.name,
        longitude: this.longitude,
        latitude: this.latitude
      }
    var object = new AddActivationPointDto ()
  
    
    object.init(body) 
    console.log(object)
  
    this._portalRegistrationUsersServiceProxy.addActivarionPoints(object).subscribe( (res ) => {
          
        if(res){
          abp.message.success("Create Activation Point successfully");
          this.bsModalRef.hide();
          this.router.navigate(['/app/activation-point']);
        }
    });
    }



  }
  