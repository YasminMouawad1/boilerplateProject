import { Component, OnInit } from '@angular/core';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';

// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users-list-permanent-rejected',
  templateUrl: './users-list-permanent-rejected.component.html',
  styleUrls:['./users-list-permanent-rejected.component.scss']
})
export class UsersListPermanentRejectedComponent implements OnInit {
  usersList: any[] = [];
  showTable :boolean = false;
  numberRows:number = 10;
  currentPage: number = 1;
  allDataCount:number = 0;
  term:string = '';

// personalImg: any;
  constructor(
    // private _userService: UsersService ,private _spinnerService: SpinnerService
    ) { }

  ngOnInit() {
   this.getRiskRejectedPermanentList();

  }

  getRiskRejectedPermanentList  (page :number = 1 ,pageSize :number = 10  ){
  //   this._spinnerService.requestStarted();


  //   this._userService.getRiskPermanentRejectedProfileList(page,pageSize).subscribe(res => {
    
  //   if(res.data != null){
  //    this.usersList = res.data ;
  //    this.showTable = this.usersList.length == 0 ? false : true;
  //  }

  //  this.allDataCount = res.allDataCount;
  //  this._spinnerService.requestEnded();

  //  },(error) => {
  //    this._spinnerService.requestEnded();
  //  }
  //    )
 
  }

  exportexcel(): void
  {
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'ExcelSheet.xlsx');

  // }

  // handelCurrentPage(currentPage:any){

  //   this.currentPage =currentPage;
  //   this.getRiskRejectedPermanentList(currentPage , this.numberRows)

}

onpagesizeChange(){

  this.getRiskRejectedPermanentList(this.currentPage , this.numberRows)
}

}
