import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { SystemConfigurationService } from 'projects/public/src/app/shared/services/endpoints/system-configuration.service';
// import Swal from 'sweetalert2';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-rejection-reasons',
  templateUrl: './system-rejection-reasons.component.html',
  styleUrls: ['./system-rejection-reasons.component.scss']
})
export class SystemRejectionReasonsComponent implements OnInit {

  reasonsList: any[] = [];
  numberRows:number = 10;
  currentPage: number = 1;
  showTable :boolean = false;

  rejectionReasons!:FormGroup;
  editrejectionReasons!:FormGroup;

  constructor(
    // private systemConfigurationService : SystemConfigurationService,private router:Router,
    // private toastr: ToastrService,private modalService: NgbModal,private _spinnerService: SpinnerService
    ) { }

    ngOnInit() {
    // this._spinnerService.requestStarted();
    //  this.getAllRejectionReasonList();

    // this.rejectionReasons = new FormGroup({
    //   name:new FormControl('',Validators.required),
    //   isActive:new FormControl('',Validators.required),
    //   isDeleted:new FormControl('',Validators.required),
    // })

    // this.editrejectionReasons = new FormGroup({
    //   id:new FormControl('',Validators.required),
    //   name:new FormControl('',Validators.required),
    //   isActive:new FormControl('',Validators.required),
    //   isDeleted:new FormControl('',Validators.required)
    // })

    // this._spinnerService.requestEnded();
    }

    getAllRejectionReasonList(){
    // this._spinnerService.requestStarted();
    //    ( this.systemConfigurationService.GetSystemConfigurationRejectionReasonList()).subscribe(res => {

    //     if(res != null)
    //       this.reasonsList = res ;
    //       this.showTable = this.reasonsList.length == 0 ?false : true
    //   })
    //   this._spinnerService.requestEnded();
    }

    createRejectionReason(){
      if (!this.rejectionReasons.valid){
        return;
     }

     const data = {
       name: this.rejectionReasons.value.name,
       isActive: this.rejectionReasons.value.isActive,
       isDeleted:this.rejectionReasons.value.isDeleted
     };

    // this.systemConfigurationService.createSystemRejectionReason(data).subscribe(res =>{
    //   if(res){
    //     this.getAllRejectionReasonList();
    //   }
    //   else
    //       {
    //       //console.log(res.message);
    //       }
    //   })

   }

   deleteRejectionReason(reason:any){
    const data = {
         id: reason.id,
         isDeleted:!reason.isDeleted
       };

       let text = ''
       if(data.isDeleted == true){
            text = 'Delete'
       }
       else
           text = 'Restore'

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
      //      this.systemConfigurationService.deleteSystemRiskRejectionReasonById(data).subscribe( res =>{
      //        if(res){
      //             Swal.fire(text + 'd!', 'Your file has been'+ text+'d.', 'success');
      //             this.getAllRejectionReasonList();
      //           }
      //         });
      //    }
      //  });
     }

     activeRejectionReason(reason:any){
      const data = {
           id: reason.id,
           isActive:!reason.isActive
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
        //      this.systemConfigurationService.activeSystemRiskRejectionReasonById(data).subscribe( res =>{
        //        if(res){
        //             Swal.fire(text + 'd!', 'Your file has been '+ text+'d.', 'success');
        //             this.getAllRejectionReasonList();
        //           }
        //         });
        //    }
        //  });
       }

       GetSystemRiskRejectionReasonsById(id:number){

        // this.systemConfigurationService.GetSystemRiskRejectionReasonsById(id).subscribe( res =>{

        //   if(res){
        //     this.editrejectionReasons.controls['id'].setValue(res.id);
        //     this.editrejectionReasons.controls['name'].setValue(res.name);
        //     this.editrejectionReasons.controls['isActive'].setValue(res.isActive);
        //     this.editrejectionReasons.controls['isDeleted'].setValue(res.isDeleted);
        //   }

        // })

      }
  updateSystemRiskRejectionReason(){
        if (!this.editrejectionReasons.valid){
           return;
        }

        const data = {
          id: this.editrejectionReasons.value.id,
          name: this.editrejectionReasons.value.name,
          isActive: this.editrejectionReasons.value.isActive,
          isDeleted:this.editrejectionReasons.value.isDeleted
        };


      // this.systemConfigurationService.UpdateSystemConfiguratioRejectionReason(data).subscribe(res =>{
      //   if(res){
      //     this.getAllRejectionReasonList();
      //     this.modalService.dismissAll();
      //     this.toastr.success("",  'Edit Data successfully');
      //   }
      //   else
      //      {
      //       //console.log(res.message);
      //      }
      //   })
       }

}
