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
  CreateUserDto,
  RoleDto,
  LookUpServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';


import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  templateUrl: './create-message-template-dialog.component.html',
  styleUrls:['../messageTemplate.component.css']
})
export class CreateMessageTemplateDialogComponent extends AppComponentBase
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


  messageAr:any;
  messageEn:any;
  msgType:any;

  public typeList: Array<Select2OptionData>;
  public options: Options;

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public _lookupService: LookUpServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);

    this.typeList = [
      {id: '1', text: 'type 1'},
      {id: '2', text: 'type 2'},
      {id: '3', text: 'type 3'},
      {id: '4', text: 'type 4'} , 
    ];

    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '300',
      placeholder: "Select a Corporate",
      allowClear: true
    };
  }

  ngOnInit(): void {
    
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

    this.user.roleNames = this.getCheckedRoles();

    this._userService.create(this.user).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
