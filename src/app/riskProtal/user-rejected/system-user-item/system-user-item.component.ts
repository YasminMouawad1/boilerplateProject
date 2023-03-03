import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';
import { FormBuilder, Validators, FormGroup ,FormControl } from '@angular/forms'; 
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


 enum DocumentType
        {
            NationalIDFront = 1,
            NationalIDBack = 2,
            CarLicenseFront = 3,
            CarLicenseBack = 4,
            ClubIdFront = 5,
            ClubIdBack = 6,
            Contract = 7,
            ExtraDocument = 8,
        }

  

@Component({
  selector: 'app-system-user-item',
  templateUrl: './system-user-item.component.html',
  styleUrls:['./system-user-item.component.scss']
})
export class SystemUserItemComponent implements OnInit {


  IscoreFileLink : string = '';
  userItem!: any;
  nationalId!: [];
  userId!: string;
  natiolalIdBack: any;
  imagePathFrontNational: any;
  imagePathBackNational: any;
  imagePathFrontLicense: any;
  imagePathBackLicense: any;
  imagePathFrontClubId: any;
  imagePathBackClubId: any;
  imagePathContract: any;
  

  pesonalImages:any;
  
  closeResult = '';
  submitAcceptform = false;
  rejectResponse :any [] = []; 
  approveRiskComment : string = '';
  rejectRiskComment : string = '';

  riskApprovedLimit :number = 0 ;
  oldRiskApprovedLimit : number = 0;  
  loading:boolean=false;
  rejectOption:string='';
  rejectComment:string='';
  isClientActivation :boolean = false;
  
  rejectionReason : string = '';

  rejection:FormGroup = new FormGroup({
    options:new FormControl(null,Validators.required),
    comment:new FormControl(null,Validators.required)
});

  submit: boolean = false;
 
  clicked:boolean = false

  isShowRiskLimit:boolean=false;

  allContractImages: any [] = [];
 
  imgSrc:string ='';
  degree:number = 0;
   
  PersonalIMG:boolean=true; 

  gender:string='';
  expireDate:string='';
  dateOfBirth:string = '';
  currentStatus : boolean = false;

 uploadDocument! :FormGroup; 
 editPersonalData! :FormGroup; 
 rejectionValidationForm!: FormGroup; 
  
  submitrejectform = false;

 maritalStatus:string='';
 maritalStatuses :any [] = []; 

 document:any = '';
 documentType:string = '';
   
 NoteMsg:string='';
 isEnableActions :boolean = false; 
 isEditRiskLimit : boolean = false;
 eDocType = DocumentType;

 verifyChecked: boolean = false;
 
 verify_list :any[] = [];
 reject_list :any[] = [];
 bending_list :any[] = [];

 
 isriskApprovedLimitChanged : boolean = false

 keys() : Array<string> {
  var keys = Object.keys(this.eDocType);
  return keys.slice(keys.length / 2);
}

@Input() verifycheckInput: boolean = false;
@Output() verifyCheck = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private _userService: UsersService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public _TranslateService:TranslateService,
    private _spinnerService: SpinnerService,  
    private _sanitizer: DomSanitizer,
    private lightbox: Lightbox,
    private renderer: Renderer2,  
    private router : Router, 
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {

    this.uploadDocument = this.formBuilder.group({
      doc: ['', [Validators.required]],
      docType: ['', [Validators.required]],
 });
 

 this._spinnerService.requestStarted();
    this.route.params.subscribe((params) => (this.userId = params['id']));

    this.getUserByID();

    this._userService.getRejectResponse().subscribe(res=>{
      this.rejectResponse = res.data
    })

 

   // this.route.params.subscribe((params) => (this.userId = params['id']));

   // this.getUserByID();

   
    
  }

  getUserByID(){
    this._spinnerService.requestStarted();

    this._userService.getUserById(this.userId).subscribe((res) => {


       this.userItem = res.data;
     
    
       this.currentStatus = ( res.data.verify_BlockedClient== 1 &&  res.data.verify_CBE==1  &&  res.data.verify_I_ScoreNationalID==1  &&  res.data.verify_Valifay ==1)
      
       for(let i in this.userItem){
         if(this.userItem[i] === null || this.userItem[i] === ''){
                this.userItem[i] = 'N/A';
          }

       }


       if(this.userItem.rejectionRiskComment === 'N/A'){
         this.userItem.rejectionRiskComment = '';
       }

 

       this.editPersonalData = new FormGroup({
        name: new FormControl(this.userItem.name, Validators.required),
        nameEn: new FormControl(this.userItem.nameEn, Validators.required),
        jobTitle: new FormControl(this.userItem.jobTitle, Validators.required),
        maritalStatus: new FormControl(this.userItem.maritalStatus, Validators.required),
        phoneNumber : new FormControl(this.userItem.mobileNumber, Validators.required),
        gender: new FormControl(this.userItem.gender, Validators.required),
        homeAddress: new FormControl(this.userItem.homeAddress, Validators.required),
        expiryDate:new FormControl(this.userItem.expiryDate, Validators.required) ,
        dateOfBirth:new FormControl(this.userItem.dateOfBirth, Validators.required)
      });


       this._userService.getmaritalStatus().subscribe(res=>{
         this.maritalStatuses = res.data;
     })


     this.gender = this.userItem.gender;
     this.expireDate = this.userItem.expiryDate; 
     this.dateOfBirth = this.userItem.dateOfBirth;
 
     this.pesonalImages = this._sanitizer.bypassSecurityTrustResourceUrl(
       'data:image/jpg;base64,' + res.data.personalImage
     );
 
     if(res.data.personalImage == 'N/A')
         this.PersonalIMG = false;
 
         this.NoteMsg = this.userItem.note;
 

       if(this.userItem.riskApprovedLimit>0){
         this.riskApprovedLimit = this.userItem.riskApprovedLimit;
         this.oldRiskApprovedLimit = this.riskApprovedLimit;

       }
       else  {
         this.riskApprovedLimit = this.userItem.creditLimit;
         this.oldRiskApprovedLimit = this.riskApprovedLimit;
       }
 
       this.allContractImages = res.data.userDocuments;

       this.allContractImages.forEach(element => {
  
        if(!element.content.includes('data:image'))
            element.content = 'data:image/jpg;base64,'+ element.content;

          element.content =this._sanitizer.bypassSecurityTrustUrl(element.content);
  
      });
  

      if(res.data.userDocuments.length > 0)
      this.imgSrc = res.data.userDocuments[0].content;
 
      
      if(this.userItem.verify_Valifay == 1){
        this.verify_list.push('assets/images/Verified_3.png');
     }else if(this.userItem.verify_Valifay == 2){
      this.reject_list.push('assets/images/Verified_3.png');
     }else{
      this.bending_list.push('assets/images/Verified_3.png');
     }
    
     if(this.userItem.verify_I_ScoreNationalID == 1){
      this.verify_list.push('assets/images/Verified_2.png');
    }else if(this.userItem.verify_I_ScoreNationalID == 2){
        this.reject_list.push('assets/images/Verified_2.png');
    }else {
        this.bending_list.push('assets/images/Verified_2.png');
    }
    
    if(this.userItem.verify_BlockedClient == 1){
      this.verify_list.push('assets/images/Verified_4.png');
    }else if(this.userItem.verify_BlockedClient == 2){
        this.reject_list.push('assets/images/Verified_4.png');
    }else{
        this.bending_list.push('assets/images/Verified_4.png');
    }
    
    if(this.userItem.verify_CBE == 1){
      this.verify_list.push('assets/images/Verified_1.png');
    }else if(this.userItem.verify_CBE == 2){
        this.reject_list.push('assets/images/Verified_1.png');
    }else{
        this.bending_list.push('assets/images/Verified_1.png');
    }

      this._spinnerService.requestEnded();
  
      if(this.userItem.verify_Valifay == 1 && this.userItem.verify_I_ScoreNationalID == 1 &&
        this.userItem.verify_BlockedClient == 1 && this.userItem.verify_CBE == 1)
       {
         this.verifyCheck.emit(true);
       }
      
     });

     
     
     this._spinnerService.requestEnded();

  }

  cpoyPDFLink(){
    this.IscoreFileLink = 'file://192.168.10.2/iscorePFDs/'+ this.userItem.nationalId +'.pdf';
    //navigator.clipboard.writeText(this.IscoreFileLink);
     this.clicked = true;

    setTimeout(()=>{
      this.clicked = false;
    }, 3000);
  }

  showImg(index:number){
    this.imgSrc = this.allContractImages[index].content;
 }

 openLightbox(index: number): void {

  // open lightbox
  this.lightbox.open(this.allContractImages, index);
}

  
rotateImg(){

  let image = document.getElementById('imageRot');
  if(this.degree < 360){
    this.degree += 90;
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${this.degree}deg)`
    );
  }else{
    this.degree = 0;
  }

 }
  
  

  validSubmit() {
    this.submit = true;
  }
  
  
  open(content :any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }
  
  openModal(content: any) {

    this.modalService.open(content);
  }

  showSpinner(){
    this.loading = true;
  }

  // get form() {
  //   return this.uploadDocument.controls;
  // }


  selectFile(event:any){
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) { 
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => { 
			this.document = reader.result; 
      this.uploadDocument.value.doc =  reader.result;
		}
 
  }
  uploadImage(){

    if (!this.uploadDocument.valid){
       return;
    }

   // this.document = this.document.slice(22, this.document.length-1);

    const data = {
      doc: this.document,
      docType: this.uploadDocument.value.docType,
      clientNationalId:this.userItem.nationalId,
      isClient: true,
    };
         
  
    
    this._spinnerService.requestStarted();

    
   

       this._userService.addCleintDocument(data).subscribe((res) => {
        if(res.status)
         {
          this.modalService.dismissAll();
          this.getUserByID();
          console.log(this.userItem)
          console.log(data)
         } 
      });

      this._spinnerService.requestEnded();
  }

  get form() {
    return this.rejectionValidationForm.controls;
  }
  
  editRiskClientNote(){
    const data = {
     userMobile:this.userId,
     note:this.NoteMsg
    };


    this._userService.EditRiskClientNote(data).subscribe((res) => {
      if(res.status)
      {
       this.toastr.success("",  'Edit Note successfully');
      }
    });
   }

  updatePersonalData(){
    if (!this.editPersonalData.valid){
       return;
    }

    const data = {
      nameAr: this.editPersonalData.value.name,
      nameEn: this.editPersonalData.value.nameEn,
      job: this.editPersonalData.value.jobTitle,
      status : this.editPersonalData.value.maritalStatus,
      mobileNumber: this.editPersonalData.value.phoneNumber,
      gender:this.editPersonalData.value.gender,
      address:this.editPersonalData.value.homeAddress,
      expirationDate:this.editPersonalData.value.expiryDate,
      dateOfBirth:this.editPersonalData.value.dateOfBirth,
    };




    this._userService.EditUserNationalIdData(data).subscribe((res) => {
      if(res.status)
       {
        this.modalService.dismissAll()
        this.toastr.success("",  'Edit Data successfully');
       }
       this.getUserByID();

    });
    //EditUserNationalIdData
  }


  accceptRiskApplication() {

    this.submitAcceptform = true;
    const data = {
      clientNationalId: this.userItem.nationalId,
      riskComment: this.approveRiskComment,
      riskApprovedLimit: this.riskApprovedLimit,
      clientStatus: true,

    };
    this.modalService.dismissAll()

      this._userService.softApproveUser(data).subscribe((res) =>{
      if(res.status){
        this.toastr.success("",  'Accept Risk successfully');
      // Swal.fire({
      //   title:this._TranslateService.instant('USERITEMINFO.acceptRisk'),
      //   text:this._TranslateService.instant('USERITEMINFO.acceptMsg1')+ this.userItem.name + this._TranslateService.instant('USERITEMINFO.acceptMsg2'),
      //   confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
      //   icon:'success'
      // });
      this.router.navigate(['/layout/system-rejected'])
      }
    } );
  }

  rejectRiskApplication(){
    this.submitrejectform = true;
    if (!this.rejectionValidationForm.valid)
       return;

    const data = {
      clientNationalId: this.userItem.nationalId,
      riskComment: this.rejectRiskComment,
      rejectionReason : this.rejectionReason,
      clientStatus: false,
    };
    this.modalService.dismissAll()
        this._userService.postUser(data).subscribe((res) =>{
if(res.status)
       {
      // Swal.fire({
      //   title:this._TranslateService.instant('USERITEMINFO.rejection'),
      //   text:this._TranslateService.instant('USERITEMINFO.rejectMsg1') + this.userItem.name + this._TranslateService.instant('USERITEMINFO.rejectMsg2'),
      //   confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
      //   icon:'error'
      //  });
      this.toastr.error("",  'Reject Risk successfully');
        this.router.navigate(['/layout/users-approval'])
       }
        } );
  }

  editRiskLimit(cancel : boolean = false){

    this.isEditRiskLimit =  !this.isEditRiskLimit;

    if(cancel)
     {
      this.riskApprovedLimit = this.oldRiskApprovedLimit;
      this.isriskApprovedLimitChanged = false;
      this.isEditRiskLimit = false;
      return;
    }
    if (this.isriskApprovedLimitChanged)
     {  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title:this._TranslateService.instant('USERITEMINFO.areYouSure'),
        text: this._TranslateService.instant('USERITEMINFO.msgEidtrisk') +this.oldRiskApprovedLimit + this._TranslateService.instant('USERITEMINFO.to') +this.riskApprovedLimit,
        icon: 'warning',
        confirmButtonText: this._TranslateService.instant('USERITEMINFO.yesChange'),
        cancelButtonText: this._TranslateService.instant('USERITEMINFO.noRollback'),
        showCancelButton: true
      })
      .then(result => {


        if (result.value) {
          this.oldRiskApprovedLimit = this.riskApprovedLimit;
          this.isriskApprovedLimitChanged =false;
          swalWithBootstrapButtons.fire({
            title:this._TranslateService.instant('USERITEMINFO.yesTitle'),
            text:this._TranslateService.instant('USERITEMINFO.yesMsg'),
            confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
            icon:'success'
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title:this._TranslateService.instant('USERITEMINFO.rollTitle'),
            text:this._TranslateService.instant('USERITEMINFO.rollMsg'),
            confirmButtonText:this._TranslateService.instant('USERITEMINFO.ok'),
            icon:'error'
          });
          this.isEditRiskLimit =  !this.isEditRiskLimit;
          this.riskApprovedLimit = this.oldRiskApprovedLimit ;
        }
        else{
          this.isriskApprovedLimitChanged = false;
          this.riskApprovedLimit = this.oldRiskApprovedLimit ;
        }
      });}
      this.isriskApprovedLimitChanged = true;
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  clientActivation (mobileNumber : string){

    this.isClientActivation =  true;
 
    this._userService.getClientActivation(mobileNumber).subscribe((result) => {

      if(result.messege.length >0)
      {

        this.toastr.error("",  result.messege);
          console.log(result)
        return;
      }
    console.log(result)
    this.isShowRiskLimit = true;
    this.userItem.creditLimit =  result.data
    this.isClientActivation =  false;
    this.isEnableActions = true;
    })
  }

  openPdf(){
    window.open(this.userItem.iscoreFile); 
  }
 
  changeVerifiedStatus(img:string){
    debugger
        if(img !="assets/images/Verified_2.png")
        return;
        this._spinnerService.requestStarted();
        this._userService.callNationalId(this.userItem.nationalId).subscribe( res =>{
          this._spinnerService.requestEnded();
          if( res.data.status == 3 || res.data.status == -1  ){
    
            this.userItem.rejectionList = res.data.clientRejectionResones.map(function(item:any) {  return {name:  item["comment"]}})
            Swal.fire({
              icon: 'error',
              title: 'Something wrong happened please contact with sysadmin '
            })
          }
          else if ( res.data.status == 1 )
          {
             Swal.fire({
              icon: 'error',
              title: 'Rjected from national ID'
            })
            setTimeout(() => {
              window.location.reload()
            }, 3000);
          }
          else if ( res.data.status == 0 )
          {
             Swal.fire({
              icon: 'success',
              title: 'approved from national ID'
            })
            setTimeout(() => {
              window.location.reload()
            }, 3000);
          }
    
        })
    }

}
