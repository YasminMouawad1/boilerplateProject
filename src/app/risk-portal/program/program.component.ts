import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { 
  BulkOnBoardingServiceProxy, 
  ApplicationsOnBoardingDto,
  RiskServiceProxy
} from '@shared/service-proxies/service-proxies';

import{ Router} from '@angular/router';
import {UsersService} from '@shared/services/endpoints/users.service'
import { SpinnerService } from '@shared/services/endpoints/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddProgramDialogComponent } from './add-program/add-program-dailog.component';
import { EditProgramDialogComponent } from './edit-program/edit-program-dailog.component';
import Swal from 'sweetalert2';
import { NotifyService } from 'abp-ng2-module';

class PagedApplicationsOnBoardingDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './program.component.html',
  styleUrls:['./program.compoent.css'],
  animations: [appModuleAnimation()],
})
export class ProgramComponent implements OnInit{
  protected delete(entity: ApplicationsOnBoardingDto): void {

  }
  applicationsOnBoardingDto: ApplicationsOnBoardingDto[] = [];
  keyword = '';
 
 
 numberRows:number = 10;
 currentPage: number = 1;
 isTableLoading:boolean = false;
 showTable:boolean = true;
 
 Programs:any;
 
 id:any;
 nameAr:any;
 nameEn:any;

  constructor( 
    private _Router:Router,
    private _userService:UsersService,
    private _SpinnerService:SpinnerService,
    private _modalService: BsModalService, 
    ) {
    
    
    //  super(injector);
   
 
    
    
  }

  ngOnInit() {
    this.getAllProgram();
 
  }

  

  getAllProgram(){
    this._userService.GetAllPrograms().subscribe( res =>{
      if(res)
        this.Programs = res.result.items;
    })
  }

 
  addProgram(){
    let addProgramDialog: BsModalRef;
   
    addProgramDialog = this._modalService.show(AddProgramDialogComponent,{class: 'modal-lg' });
  
  }
 
  editProgram(programID:number){
    let EditProgramDailog:BsModalRef;


    this._userService.getProgramByID(programID).subscribe( res =>{
      
       if(res){
        this.id = res.result.id;
        this.nameAr = res.result.nameAR;
        this.nameEn = res.result.nameEn;
     
       }

       const initialState = {
        id:this.id,
        nameAR:this.nameAr,
        nameEn:this.nameEn
     };
  
    EditProgramDailog = this._modalService.show(EditProgramDialogComponent,{class: 'modal-lg', initialState });
  

    });
    
  }

  delProgram(id:any){
     
        this._userService.DeleteProgram(id).subscribe(res => {
          if(res){   
            console.log(res);
            this.getAllProgram();
          }
      });
      
    
  }

}
