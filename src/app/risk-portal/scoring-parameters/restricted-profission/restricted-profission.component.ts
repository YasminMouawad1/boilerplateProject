import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import Swal from 'sweetalert2';
import { UsersService } from '@shared/services/endpoints/users.service';

@Component({
  templateUrl: './restricted-profission.component.html',
  animations: [appModuleAnimation()],
  styleUrls:['./restricted-profission.component.css'], 
})
export class RestrictedProfissionComponent extends AppComponentBase {
  
  professionsList: any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;

  constructor(injector: Injector, private UsersService:UsersService) {
    super(injector);
    this.getAllProfessionList();
  }

  getAllProfessionList(){ 
      // this.UsersService.GetSystemConfigurationProfessionsList().subscribe(res => {

      //   if(res != null)
      //     this.professionsList = res ;
      //   else{
      //   }
      //     this.showTable = this.professionsList.length == 0 ?false : true
      // }) 
      
      this.professionsList = [{name:'test restrict i-score 1',code:'code1',isActive: true,isDeleted:false},
      {name:'test restrict i-score 2',code:'code1',isActive: true,isDeleted:true},
      {name:'test restrict i-score 3',code:'code1',isActive: false,isDeleted:true},
      {name:'test restrict i-score 4',code:'code1',isActive: true,isDeleted:false}
    ]
    this.showTable = true;
    }


  deleteSystemConfiguration(professtion:any){
    const data = {
         id: professtion.id,
         isDeleted:!professtion.isDeleted
       };
       let text = ''
       if(data.isDeleted == true){
            text = 'Delete'
       }
       else
           text = 'Restore'
 
       Swal.fire({
         title: 'Are you sure?',
         text: 'You won\'t be able to revert this!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#34c38f',
         cancelButtonColor: '#f46a6a',
         confirmButtonText: text
       }).then(result => {
         if (result.value) {
           this.UsersService.deleteSystemConfigurationProfessionsById(data).subscribe( res =>{
             if(res){
                  Swal.fire(text + 'd!', 'Your file has been'+ text+'d.', 'success');
                  this.getAllProfessionList();
                }
              });
         }
       });
 
 
     }
 
 activeSystemConfiguration(professtion:any){
       const data = {
            id: professtion.id,
            isActive:!professtion.isActive
          };
 
          let text = ''
          if(data.isActive == true){
               text = 'Dactive'
          }
          else
              text = 'Active'
 
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: text
          }).then(result => {
            if (result.value) {
              this.UsersService.activeSystemConfigurationProfessionsById(data).subscribe( res =>{
                if(res){
                     Swal.fire(text + 'd!', 'Your file has been '+ text+'d.', 'success');
                     this.getAllProfessionList();
                   }
                 });
            }
          });
     }
}