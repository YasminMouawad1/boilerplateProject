import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';
  
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-on-borading-list',
  templateUrl: './bulk-on-borading-list.component.html',
  styleUrls:['./bulk-on-borading-list.component.scss']
})
export class BulkOnBoradingListComponent implements OnInit {

  usersList: any[] = [];
  corpList:any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  allDataCount:number = 0;
  showTable :boolean = false;
  term:string = '';
  CorpCode!:number;      
 

  constructor(
    // private _userService: UsersService ,private _spinnerService: SpinnerService
    ) { }


  ngOnInit() {
  this.getBulkonBoardingList();
 
  }

  getBulkonBoardingList(page :number = 1 ,pageSize :number = 10 ){

    // this._spinnerService.requestStarted();
    // this._userService.getBulkBorading(page, pageSize).subscribe(res => {
      
    //   if(res.data != null)
    //     this.corpList = res.data ; 
    //     //this.showTable = this.corpList?.length == 0 ?false : true
    //     this.showTable = false;
         
    //     this.allDataCount = res.allDataCount;

    // this._spinnerService.requestEnded();
    //})
  }

    exportexcel(): void
    { 
      // let element = document.getElementById('excel-table');
      // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // XLSX.writeFile(wb, 'ExcelSheet.xlsx');
   
    }

    viewDetails(code:number){
      // this._spinnerService.requestStarted();

      //  this._userService.getCorpProfilePlus(code).subscribe(res => {
         
      //    if(res.data != null)
      //      this.usersList = res.data ; 
      //     else
      //       this.usersList.length = 0;

      //      this.showTable = this.usersList?.length == 0 ?false : true
   
            
      //  this._spinnerService.requestEnded();
      // })
    }

    handelCurrentPage(currentPage:any){

      this.currentPage =currentPage;
      this.getBulkonBoardingList(currentPage , this.numberRows)
  
  }
  
  onpagesizeChange(){
  
    this.getBulkonBoardingList(this.currentPage , this.numberRows)
  }
    
  

}
