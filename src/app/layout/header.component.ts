import { Component, ChangeDetectionStrategy , OnInit} from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  
  newLanguage:any;
  checkLanguage:boolean = false;

  constructor(private _appAuthService:AppAuthService){
    
  }

  ngOnInit(){
     this._appAuthService.getNewLanguage().subscribe(value => {
           
       this.newLanguage = value;
       if(value == 'ar')
         this.checkLanguage = true;

        }); 
      
  }

  // ngAfterViewInit(){
  //   this._appAuthService.getNewLanguage().subscribe(value => {
           
  //     this.newLanguage = value;
  //     if(value == 'ar')
  //       this.checkLanguage = true;

  //      }); 
  // }
  
 

  

}
