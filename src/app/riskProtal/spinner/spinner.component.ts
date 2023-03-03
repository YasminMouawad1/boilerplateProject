import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../shared/services/endpoints/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls:['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner:boolean= false;

  constructor(private _SpinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.init();
  }

init(){
  this._SpinnerService.getSpinnerObserver().subscribe((status) =>{
    if(status === 'start'){
      this.showSpinner = true; 
    }
    else{
      this.showSpinner = false; 
    } 

    

  });
 

}


}
