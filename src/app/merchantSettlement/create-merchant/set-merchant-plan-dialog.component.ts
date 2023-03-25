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
    //SetMerchantPlanDto,
    RoleDto,
    LookUpServiceProxy
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
  
  import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

  @Component({
    templateUrl: './set-merchant-plan-dialog.component.html',
    styleUrls:['../merchantSettlement.component.css']
  })
  export class SetMerchantPlanDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    //merchantPlan = new SetMerchantPlanDto();

    merchantPlan:any;
    MerchantCode:any;
    settlementPlan:any;
    day:any;
    days:any;
    public merchantData: Array<Select2OptionData>;
    public merchantOptions: Options;

    public merchantPlans: Array<Select2OptionData>;
    public merchantPlansOptions: Options;

    public dayData: Array<Select2OptionData>;
    public dayOptions: Options;
    dayFlag:boolean = false;

    public daysData: Array<Select2OptionData>;
    public daysOptions: Options;
    daysFlag:boolean = true;

     
     
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
  
    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef
    ) {
      super(injector);

      this.merchantData = [
        {id: '4', text: 'egabi stuff'},
        {id: '3', text: 'trade Line'},
        {id: '4', text: 'ikia'},
        {id: '5', text: 'Hyper One'},
        {id: '7', text: 'zad baldna'},
        {id: '8', text: 'Sharp'},
        {id: '11',text: 'Al morshady'},
        {id: '15',text: 'Dubai phone'},
        {id: '16',text: 'abdel Aziz store '},
        {id: '17',text: 'Orascom contraction'},
        {id: '18',text: 'el naggar tourism'}
    ];

    this.merchantPlans = [
      {id: '1', text: 'Selected Dates'},
      {id: '2', text: 'After transactions by X days'}
    ]

    this.dayData= [
      {id: '1', text: '1'},
      {id: '2', text: '2'},
      {id: '3', text: '3'},
      {id: '4', text: '4'},
      {id: '5', text: '5'},
      {id: '6', text: '6'},
      {id: '7', text: '7'},
      {id: '8', text: '8'},
      {id: '9', text: '9'},
      {id: '10', text: '10'},
      {id: '11', text: '11'},
      {id: '12', text: '12'},
      {id: '13', text: '13'},
      {id: '14', text: '14'},
      {id: '15', text: '15'},
      {id: '16', text: '16'},
      {id: '17', text: '17'},
      {id: '18', text: '18'},
      {id: '19', text: '19'},
      {id: '20', text: '20'},
      {id: '21', text: '21'},
      {id: '22', text: '22'},
      {id: '23', text: '23'},
      {id: '24', text: '24'},
      {id: '25', text: '25'},
      {id: '26', text: '26'},
      {id: '27', text: '27'},
      {id: '28', text: '28'},
      {id: '29', text: '29'},
      {id: '30', text: '30'},
      {id: '31', text: '31'},
    ]
   this.daysData= [
      {id: '1', text: '1'},
      {id: '2', text: '2'},
      {id: '3', text: '3'},
      {id: '4', text: '4'},
      {id: '5', text: '5'},
      {id: '6', text: '6'},
      {id: '7', text: '7'},
      {id: '8', text: '8'},
      {id: '9', text: '9'},
      {id: '10', text: '10'},
      {id: '11', text: '11'},
      {id: '12', text: '12'},
      {id: '13', text: '13'},
      {id: '14', text: '14'},
      {id: '15', text: '15'},
      {id: '16', text: '16'},
      {id: '17', text: '17'},
      {id: '18', text: '18'},
      {id: '19', text: '19'},
      {id: '20', text: '20'},
      {id: '21', text: '21'},
      {id: '22', text: '22'},
      {id: '23', text: '23'},
      {id: '24', text: '24'},
      {id: '25', text: '25'},
      {id: '26', text: '26'},
      {id: '27', text: '27'},
      {id: '28', text: '28'},
      {id: '29', text: '29'},
      {id: '30', text: '30'},
      {id: '31', text: '31'},
    ]
    this.merchantOptions = {
      multiple: false,
      closeOnSelect: true,
      width: '100%',
      placeholder: "Select a merchant",
      allowClear: true
    };

    this.merchantPlansOptions = {
      multiple: false,
      closeOnSelect: true,
      width: '100%',
      placeholder: "Select a plan",
      allowClear: true
    }

    this.dayOptions={
      multiple: false,
      closeOnSelect: true,
      width: '100%',
      placeholder: "Select a day",
      allowClear: true
    }

    this.daysOptions={
      multiple: true,
      closeOnSelect: true,
      width: '100%',
      placeholder: "Select days",
      allowClear: true
    }
    }
  
    ngOnInit(): void { 
      debugger
  this._lookupService.getAllCorporate().subscribe((result) => {
     //console.log(result)
  });
   
    }
  
    changePlan(event){
      console.log('merchant plan',event.target.value)
 
    }
  
    save(): void {
      this.saving = true;
   
  
      // this._userService.create(this.merchantPlan).subscribe(
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
  }
  