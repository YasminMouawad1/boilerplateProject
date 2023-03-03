import { Component, OnInit } from '@angular/core'; 
import { DomSanitizer } from '@angular/platform-browser';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';
  

// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-coporates',
  templateUrl: './coporates.component.html',
  styleUrls:['./coporates.component.scss']
})
export class CoporatesComponent implements OnInit {

  corpList:any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;
  term:string = '';
  CorpCode!:number;      
 

   constructor(
    // private _userService: UsersService ,private _spinnerService: SpinnerService
    ) { }


 async ngOnInit() {
  // this._spinnerService.requestStarted();
  //  await this._userService.getBulkBorading().subscribe(res => {
      
  //     if(res.data != null)
  //       this.corpList = res.data ; 
  //       this.showTable = this.corpList?.length == 0 ?false : true

         
  //   this._spinnerService.requestEnded();
  //   })
  }

    exportexcel(): void
    { 
      // let element = document.getElementById('excel-table');
      // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // XLSX.writeFile(wb, 'ExcelSheet.xlsx');
   
    }

    

}
