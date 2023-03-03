import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list-rejected.component.html',
  styleUrls: ['./users-list-rejected.component.scss']
})
export class UsersListRejectedComponent implements OnInit {
usersList: any[] = [];

  numberRows:number = 10;
  currentPage: number = 1;

// personalImg: any;
  constructor(private _userService: UsersService , private _sanitizer: DomSanitizer,private _spinnerService: SpinnerService) { }

  ngOnInit() {
  this._spinnerService.requestStarted();

     this._userService.getRiskRejectedProfileList().subscribe(res => {

      if(res.data != null)
         this.usersList = res.data ;

      this._spinnerService.requestEnded();

          //  this.personalImg = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          //  + res.data.result.personalImage);


    }
      )

  }

}
