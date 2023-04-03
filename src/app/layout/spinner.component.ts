import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SpinnerService } from '../../shared/services/endpoints/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls:['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent extends AppComponentBase implements OnInit {
  
    showSpinner:boolean= false;

  constructor(injector: Injector,private _SpinnerService:SpinnerService) {
    super(injector);
 
  }

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
