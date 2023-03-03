import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { SystemConfigurationService } from 'projects/public/src/app/shared/services/endpoints/system-configuration.service';
// import Swal from 'sweetalert2';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';

declare var $:any

@Component({
  selector: 'app-system-configuration-professions',
  templateUrl: './system-configuration-professions.component.html',
  styleUrls: ['./system-configuration-professions.component.scss']
})
export class SystemConfigurationProfessionsComponent implements OnInit {
  professionsList: any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;

  configurationProfession!:FormGroup;
  editConfigurationProfession!:FormGroup;

  constructor(
    // private systemConfigurationService : SystemConfigurationService,private modalService: NgbModal,
    //  private router:Router,private _spinnerService: SpinnerService,private toastr: ToastrService
     ) { }

    ngOnInit() {
     this.getAllProfessionList();

    this.configurationProfession = new FormGroup({
      name:new FormControl('',Validators.required),
      code:new FormControl('',Validators.required),
      isActive:new FormControl('',Validators.required),
      isDeleted:new FormControl('',Validators.required)
    })

    this.editConfigurationProfession = new FormGroup({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      code:new FormControl('',Validators.required),
      isActive:new FormControl('',Validators.required),
      isDeleted:new FormControl('',Validators.required)
    })

    }


    getAllProfessionList(){
    // this._spinnerService.requestStarted();
    //   this.systemConfigurationService.GetSystemConfigurationProfessionsList().subscribe(res => {

    //     if(res != null)
    //       this.professionsList = res ;
    //       else{

    //         this.router.navigate(['unauthorized']);
    //         this._spinnerService.requestEnded();
    //       }
    //       this.showTable = this.professionsList.length == 0 ?false : true
    //   })
    //   this._spinnerService.requestEnded();
    }

createSystemConfiguration(){
      if (!this.configurationProfession.valid){
         return;
      }

      const data = {
        name: this.configurationProfession.value.name,
        code : this.configurationProfession.value.code,
        isActive: this.configurationProfession.value.isActive,
        isDeleted:this.configurationProfession.value.isDeleted
      };

    // this.systemConfigurationService.createSystemCongifurationProfession(data).subscribe(res =>{
    //   if(res){
    //     this.getAllProfessionList();
    //   }
    //   else
    //      {

    //      }
    //   })
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

      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: 'You won\'t be able to revert this!',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#34c38f',
      //   cancelButtonColor: '#f46a6a',
      //   confirmButtonText: text
      // }).then(result => {
      //   if (result.value) {
      //     this.systemConfigurationService.deleteSystemConfigurationProfessionsById(data).subscribe( res =>{
      //       if(res){
      //            Swal.fire(text + 'd!', 'Your file has been'+ text+'d.', 'success');
      //            this.getAllProfessionList();
      //          }
      //        });
      //   }
      // });


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

        //  Swal.fire({
        //    title: 'Are you sure?',
        //    text: 'You won\'t be able to revert this!',
        //    icon: 'warning',
        //    showCancelButton: true,
        //    confirmButtonColor: '#34c38f',
        //    cancelButtonColor: '#f46a6a',
        //    confirmButtonText: text
        //  }).then(result => {
        //    if (result.value) {
        //      this.systemConfigurationService.activeSystemConfigurationProfessionsById(data).subscribe( res =>{
        //        if(res){
        //             Swal.fire(text + 'd!', 'Your file has been '+ text+'d.', 'success');
        //             this.getAllProfessionList();
        //           }
        //         });
        //    }
        //  });
    }

GetSystemConfigurationProfessionsById(id:number){

      // this.systemConfigurationService.GetSystemConfigurationProfessionsById(id).subscribe( res =>{

      //   if(res){
      //     this.editConfigurationProfession.controls['id'].setValue(res.id);
      //     this.editConfigurationProfession.controls['name'].setValue(res.name);
      //     this.editConfigurationProfession.controls['code'].setValue(res.code);
      //     this.editConfigurationProfession.controls['isActive'].setValue(res.isActive);
      //     this.editConfigurationProfession.controls['isDeleted'].setValue(res.isDeleted);
      //   }

      // })

    }

updateSystemConfiguration(){
      if (!this.editConfigurationProfession.valid){
         return;
      }

      const data = {
        id: this.editConfigurationProfession.value.id,
        name: this.editConfigurationProfession.value.name,
        code : this.editConfigurationProfession.value.code,
        isActive: this.editConfigurationProfession.value.isActive,
        isDeleted:this.editConfigurationProfession.value.isDeleted
      };


      //console.log(data);
    // this.systemConfigurationService.updateSystemCongifurationProfession(data).subscribe(res =>{
    //   if(res){
    //     this.modalService.dismissAll();
    //     this.getAllProfessionList();
    //     this.toastr.success("",  'Edit Data successfully');
    //   }
    //   else
    //      {

    //      }
    //   })
     }



}
