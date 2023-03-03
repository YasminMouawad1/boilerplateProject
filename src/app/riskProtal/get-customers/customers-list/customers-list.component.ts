import { Component, OnInit } from '@angular/core';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';

import { FormBuilder, Validators, FormGroup ,FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls:['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  coustomerData:any;
  customerName:string = '';
  showData:boolean= false;


  usersList: any[] = [];
  corpList:any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;
  term:string = '';
  CorpCode!:number;


  constructor(
    // private _userService: UsersService,
    // public formBuilder: FormBuilder,
    // public _TranslateService:TranslateService,
    // private _spinnerService: SpinnerService
  ) {

  }

  ngOnInit() {

  }

  handleKeyUp(e:any){
    if(e.keyCode === 13){
       this.viewDetails(e);
    }
 }

  viewDetails(e:any){
    // this._spinnerService.requestStarted();

    // if(this.customerName === null || this.customerName == ""){
    //   this.showTable = false;
    //   this._spinnerService.requestEnded();
    //    return;
    // }
    // else{
    //   this._userService.getAllUsersList(this.customerName).subscribe(res => {
    //     if(res.data != null)
    //        this.usersList = res.data ;
    //     else{
    //       this._spinnerService.requestEnded();
    //     }


    //        this.showTable = this.usersList?.length == 0 ?false : true

    //     this._spinnerService.requestEnded();
    //   })
    // }

    // this._spinnerService.requestEnded();
  }



}
