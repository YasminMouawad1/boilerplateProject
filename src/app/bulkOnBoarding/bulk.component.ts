import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

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
  ApplicationOnBoardingServiceProxy
} from '@shared/service-proxies/service-proxies';

class PagedRolesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './bulk.component.html',
  styleUrls:['./bulk.component.css'],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkComponent extends PagedListingComponentBase<RoleDto> implements OnInit{
  protected delete(entity: RoleDto): void {
    throw new Error('Method not implemented.');
  }
  roles: RoleDto[] = []; 
  keyword = ''; 
  reqNID:boolean = false;
  reqSelie:boolean = false;
  reqLiveness:boolean = false;
  reqCar:boolean = false;
  reqClub:boolean = false;
  reqInstantLimit:boolean = false;
  reqScoreCard:boolean = false;
  reqChangePassword:boolean = false;
  reqContractReview:boolean = false;
  reqSelectedMerchant:boolean = false;
  reqSelectedToner:boolean = false;
  fileBase64:string = '';
  corpCode:string = '';


  public exampleData: Array<Select2OptionData>;
  public options: Options;

  constructor(injector: Injector,
    private _rolesService: RoleServiceProxy,
    private _BulkOnBoardingServiceProxy:BulkOnBoardingServiceProxy,
    private _LookUpServiceProxy:LookUpServiceProxy,
    private _ApplicationOnBoardingServiceProxy:ApplicationOnBoardingServiceProxy) {
    super(injector);
  }


  ngOnInit(): void {
    this.exampleData = [
      {id: '4', text: 'egabi stuff'},
      {id: '5', text: 'midbank stuff'},
      {id: '6', text: 'midtakseet'},
      {id: '7', text: 'Infofort'} ,
      {id: '9', text: 'Test salab'},
      {id: '8', text: 'Test MidTakseet A'},
      {id: '1', text: 'ts'},
      {id: '2', text: 'vodafone'},
      {id: '3', text: 'we'}
    ];

    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '300',
      placeholder: "Select a Corporate",
      allowClear: true
    };

    this.getAllCorporates();
  }

  list(
    request: PagedRolesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._rolesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.roles = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  list2(): void {
  
  debugger
      this._BulkOnBoardingServiceProxy
        .getAll(
          this.keyword,1,5)
        .pipe(
          finalize(() => {
          //  finishedCallback();
          })
        )
        .subscribe((result: ApplicationsOnBoardingDtoPagedResultDto) => {
         console.log(result.items) ;
          this.showPaging(result, 1);
        });
    }

    getAllCorporates(){
      this._LookUpServiceProxy.getAllCorporate().subscribe((result: LookupCorporateDto[] ) =>{
    
   

        this.exampleData = result.map(item=>{

          return <Select2OptionData>
          {
                id : item.corpCode,
                text: item.enName
           };
      
        }); 

        console.log(this.exampleData)
      });

      
 
    }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        //console.log(reader.result);
        this.fileBase64 = (reader.result).toString();
    };
}

createBulkOnBoarding(){
  let body  = {
    "reqNID": this.reqNID,
    "reqSelie": this.reqSelie,
    "reqLiveness": this.reqLiveness,
    "reqCar": this.reqCar,
    "reqClub": this.reqClub,
    "reqInstantLimit": this.reqInstantLimit,
    "reqScoreCard": this.reqScoreCard,
    "reqChangePassword": this.reqChangePassword,
    "reqContractReview": this.reqContractReview,
    "reqSelectedMerchant": this.reqSelectedMerchant,
    "reqSelectedToner": this.reqSelectedMerchant,
    "fileBase64": this.fileBase64,
    "corpCode": this.corpCode
  }
  
// this._ApplicationOnBoardingServiceProxy.createBulkOnBoardingConfig(body).subscribe( (res : number) => {
//      console.log(res)
// })
 
 
}
}
