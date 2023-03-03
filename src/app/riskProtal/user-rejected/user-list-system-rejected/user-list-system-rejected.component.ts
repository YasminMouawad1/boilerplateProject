import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';


// import * as XLSX from 'xlsx';
@Component({
  selector: 'app-user-list-system-rejected',
  templateUrl: './user-list-system-rejected.component.html',
  styleUrls:['./user-list-system-rejected.component.scss']
})
export class UserListSystemRejectedComponent implements OnInit {

  usersList: any[] = [];

  numberRows:number = 10;

  allDataCount:number = 0;
  currentPage: number = 1;
  showTable :boolean = false;
  isClicked: boolean = false;

  term:string = '';

  totalCount:number = 0;
// personalImg: any;
  constructor(
    // private _userService: UsersService , private _sanitizer: DomSanitizer,private _spinnerService: SpinnerService
    ) { }

  ngOnInit() {
    this.getRejectedProfilePlusSystemErrors();
  }


  getRejectedProfilePlusSystemErrors (page :number = 1 ,pageSize :number = 10 ): void
{
  
  // this._spinnerService.requestStarted();

  //    this._userService.getRejectedProfilePlusSystemErrors(page, pageSize).subscribe(res => {
  //     debugger
  //    if(res.data != null)
  //      this.usersList = res.data ;
  //      this.showTable = this.usersList.length == 0 ?false : true

  //       this.allDataCount = res.allDataCount;

  //         this._spinnerService.requestEnded();
  //   }
  //     )



}
  view(){
    //console.log('clicked view');
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
      this.getRejectedProfilePlusSystemErrors(currentPage , this.numberRows)

  }

  onpagesizeChange(){

    this.getRejectedProfilePlusSystemErrors(this.currentPage , this.numberRows)
  }
}


