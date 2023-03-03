import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
// import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
// import { SystemConfigurationService } from 'projects/public/src/app/shared/services/endpoints/system-configuration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-core-configuration',
  templateUrl: './system-core-configuration.component.html',
  styleUrls:['./system-core-configuration.component.scss']
})
export class SystemCoreConfigurationComponent implements OnInit {

 systemCoreConfiguration!: FormGroup;
 isSystemCoreConfigurationSubmit :boolean = false;

 constructor (
  // private systemConfigurationService : SystemConfigurationService, private _spinner:SpinnerService
  ){}


  ngOnInit()  {

//     this._spinner.requestStarted();
//     this.systemConfigurationService.geSystemConfiguration().subscribe((res) => {


//       this.systemCoreConfiguration.patchValue({
//         minmumAge:  res.minmumAge,
//         maxmumAge : res.maxmumAge  ,
//         minmumIncome: res.minmumIncome,
//         maxmumIncome :res.maxmumIncome


//       });
//          })


// this.systemCoreConfiguration = new FormGroup({
// 'minmumAge' : new FormControl('',[Validators.required ,Validators.max(22) ,Validators.min(18)]),
// 'maxmumAge' : new FormControl('', [Validators.required ,Validators.max(70) ,Validators.min(50) ]),
// 'minmumIncome' : new FormControl('',Validators.required ),
// 'maxmumIncome' : new FormControl('',Validators.required )

// })

// this._spinner.requestEnded();
  }

   saveSystemCoreConfiguration(){

     

   if (!this.systemCoreConfiguration.valid)
   return
const data ={
  MinmumAge: this.systemCoreConfiguration.value.minmumAge,
  MaxmumAge: this.systemCoreConfiguration.value.maxmumAge,
  MinmumIncome: this.systemCoreConfiguration.value.minmumIncome,
  MaxmumIncome: this.systemCoreConfiguration.value.maxmumIncome
}


  //   this.systemConfigurationService.updateSystemCoreConfiguration(data)
  // .subscribe((res) => {
  //   if(res){
  //     Swal.fire({
  //       title: "Saved Configuration Successfully",
  //       text:"",
  //       confirmButtonText:"OK",
  //       icon:'success'
  //     });
  //   }
  // });

  }
  validateNo(e:any): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
}

}
