import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';

// import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
usersList: any[] = [];

  numberRows:number = 10;
  currentPage: number = 1;
  allDataCount:number = 0;
  showTable :boolean = false;
  reviewed:boolean = false;

  term:string = '';
// personalImg: any;
  constructor(
    // private _userService: UsersService , private _sanitizer: DomSanitizer,private _spinnerService: SpinnerService
    ) { }


  ngOnInit() {
     this.getUserApprovalList();
  }

  getUserApprovalList(page :number = 1 ,pageSize :number = 10  ){
    // this._spinnerService.requestStarted();

    // this._userService.getWaitingRiskApprovalList(page, pageSize).subscribe(res => {
     
    //   if(res.data != null)
    //     this.usersList = res.data ;
    //     this.showTable = this.usersList.length == 0 ?false : true;

    //     this.allDataCount = res.allDataCount;
    //     this._spinnerService.requestEnded(); 


    // })
  }

    view(user:any){
     user.isReviwed = false; 
    }

    exportexcel(): void
  { 
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // XLSX.writeFile(wb, 'ExcelSheet.xlsx');
 
  }

  handelCurrentPage(currentPage:any){

    this.currentPage =currentPage;
    this.getUserApprovalList(currentPage , this.numberRows)

}

onpagesizeChange(){

  this.getUserApprovalList(this.currentPage , this.numberRows)
}


}
