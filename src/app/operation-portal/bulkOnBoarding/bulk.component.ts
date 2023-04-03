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
  ApplicationOnBoardingServiceProxy,
  ApplicationsOnBoardingDto
} from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

class PagedApplicationsOnBoardingDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './bulk.component.html',
  styleUrls:['./bulk.component.css'],
  animations: [appModuleAnimation()],
})
export class BulkComponent extends PagedListingComponentBase<ApplicationsOnBoardingDto>{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
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


  public corporatesList: Array<Select2OptionData>;
  public options: Options;


  isShowBulkOnBoardingList = abp.auth.isGranted('Pages.Operation.BulkOnBoarding');
  isShowAddBulkOnBoardingBtn = abp.auth.isGranted('Pages.Operation.BulkOnBoarding.Add');
  isShowSendAginBtn = abp.auth.isGranted('Pages.Operation.BulkOnBoarding.Send');

  constructor(injector: Injector,
    private _rolesService: RoleServiceProxy,
    private _BulkOnBoardingServiceProxy:BulkOnBoardingServiceProxy,
    private _LookUpServiceProxy:LookUpServiceProxy,
    private router: Router,
    private _ApplicationOnBoardingServiceProxy:ApplicationOnBoardingServiceProxy) {
    super(injector);
    // this.exampleData = [
    //   {id: '4', text: 'egabi stuff'},
    //   {id: '5', text: 'midbank stuff'},
    //   {id: '6', text: 'midtakseet'},
    //   {id: '7', text: 'Infofort'} ,
    //   {id: '9', text: 'Test salab'},
    //   {id: '8', text: 'Test MidTakseet A'},
    //   {id: '1', text: 'ts'},
    //   {id: '2', text: 'vodafone'},
    //   {id: '3', text: 'we'}
    // ];

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
    request: PagedApplicationsOnBoardingDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._BulkOnBoardingServiceProxy
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ApplicationsOnBoardingDtoPagedResultDto) => {
        debugger
     this.applicationsOnBoardingDto = result.items;

        this.showPaging(result, pageNumber);
      });
  }



    getAllCorporates(){
      debugger
      this._LookUpServiceProxy.getAllCorporate().subscribe((result: LookupCorporateDto[] ) =>{

        this.corporatesList = result.map(item=>{

          return <Select2OptionData>
          {
                id : item.corpCode,
                text: item.enName
           };

        });


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
var object = new CreateBulkOnBoardingConfigDto ()
object.init(body)
 console.log(object)
this._ApplicationOnBoardingServiceProxy.createBulkOnBoardingConfig(object).subscribe( (res : number) => {
     console.log(res)

     abp.message.success("Create Bulk Onboarding successfully");
     this.reloadCurrentRoute();
})


}

reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}

}
