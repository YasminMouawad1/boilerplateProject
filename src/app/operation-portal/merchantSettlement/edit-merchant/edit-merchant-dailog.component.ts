import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  RoleServiceProxy,
  RoleDto,
  RoleDtoPagedResultDto,
  ApplicationsOnBoardingDtoPagedResultDto,
  BulkOnBoardingServiceProxy,
  LookUpServiceProxy,
  LookupCorporateDto,
  CreateBulkOnBoardingConfigDto,
  ApplicationOnBoardingServiceProxy,
  ApplicationsOnBoardingDto,
  SetMerchantSettlementPlanDto,
  PortalRegistrationUsersServiceProxy
} from '@shared/service-proxies/service-proxies';
import { UsersService } from '@shared/services/endpoints/users.service';
import { Router } from '@angular/router';


class PagedApplicationsOnBoardingDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl:  './edit-merchant-dailog.component.html',
  styleUrls:['../merchantSettlement.component.css'],
  animations: [appModuleAnimation()],
})
export class editMerchantPlanDialogComponent implements OnInit{
  protected delete(entity: SetMerchantSettlementPlanDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
  

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

  

  public daysData: Array<Select2OptionData>;
  public daysOptions: Options;


  init_merchantCode:any;

  constructor(injector: Injector,
    public bsModalRef: BsModalRef,
    private _rolesService: RoleServiceProxy,
    private _BulkOnBoardingServiceProxy:BulkOnBoardingServiceProxy, 
    private _LookUpServiceProxy:LookUpServiceProxy,
    private _portalRegistrationUsersServiceProxy:PortalRegistrationUsersServiceProxy,
      public _modalOption:ModalOptions,
      private _usersServices:UsersService,
      private router: Router,) {
    //super(injector);
    
    

//   this.merchantData = [
//     {id: '4', text: 'egabi stuff'},
//     {id: '3', text: 'trade Line'},
//     {id: '4', text: 'ikia'},
//     {id: '5', text: 'Hyper One'},
//     {id: '7', text: 'zad baldna'},
//     {id: '8', text: 'Sharp'},
//     {id: '11',text: 'Al morshady'},
//     {id: '15',text: 'Dubai phone'},
//     {id: '16',text: 'abdel Aziz store '},
//     {id: '17',text: 'Orascom contraction'},
//     {id: '18',text: 'el naggar tourism'}
// ];

this.getAllMerchants();

this.merchantPlans = [
  {id: '1', text: 'Selected Dates'},
  {id: '2', text: 'After transactions by X days'}
]

this.dayData= [
  {id: '0', text: '0'},
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
]
this.daysData= [
  {id: '0', text: '0'},
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
    this.init_merchantCode =  this._modalOption.initialState.init_merchantCode;

    this.GetMerchanstsSettlementPlanById();
  }


  GetMerchanstsSettlementPlanById(){
        this._usersServices.getMerchantPlanByID(this.init_merchantCode).subscribe((res) =>{
             this.MerchantCode = res.result.data.merchantCode;
             this.settlementPlan = res.result.data.settlementPlanName;
             
              
        })
  }


  hide(){
    this.bsModalRef.hide()
  }

  EditSettlementPlan(){
debugger
    let body  = {
      "merchantCode": this.MerchantCode,
      "settlementPlanId": this.settlementPlan,
      "day": this.day,
      "days": this.days, 
    }
  var object = new SetMerchantSettlementPlanDto ()

  console.log(object)
  object.init(body) 
  this._portalRegistrationUsersServiceProxy.setMerchantSettlementPlan(object).subscribe( (res ) => {
        
      if(res){
        abp.message.success("Edit Settlement plan successfully");
        this.bsModalRef.hide(); 
        //this.router.navigate(['/app/operation-portal/merchant-settlement']);
        this.reloadCurrentRoute();
      }
       
  })
  
 
  
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
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
     
}
