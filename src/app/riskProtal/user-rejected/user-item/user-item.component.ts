import { Component, Input, OnInit,Renderer2} from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls:['./user-item.scss']
})


export class UserRejectedItemComponent implements OnInit {


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
  submitrejectform = false;
  rejectResponse :any [] = [];
  approveRiskComment : string = '';


  riskApprovedLimit :number = 0 ;
  oldRiskApprovedLimit : number = 0;
  rejectRiskComment : string = '';
  isEditRiskLimit : boolean = false;
  rejectionReason : string = ''
 
  rejectionValidationForm!: FormGroup;
  editPersonalData! :FormGroup; 

  PersonalIMG:boolean=true; 

  gender:string='';
  expireDate:string='';
  dateOfBirth:string = '';

  currentStatus : boolean = false;
  
  NoteMsg:string='';
  isEnableActions :boolean = false; 

  loading:boolean=false;
  submit: boolean = false; 
  clicked:boolean = false

  isShowRiskLimit:boolean=false;
 
  isClientActivation :boolean = false;
  isriskApprovedLimitChanged : boolean = false
 
  maritalStatus:string='';
  maritalStatuses :any [] = []; 
 


  verify_list :any[] = [];
  reject_list :any[] = [];
  bending_list :any[] = [];
 
  allContractImages: any [] = [];
  imgSrc:string ='';
  degree:number = 0;

  @Input() verifycheckInput: boolean = false;

  constructor(
    private modalService: NgbModal,
    private _userService: UsersService, 
    private route: ActivatedRoute, 
    public formBuilder: FormBuilder,
    public _TranslateService:TranslateService,
    private _spinnerService: SpinnerService,  
    private toastr: ToastrService, 
    private _sanitizer: DomSanitizer, 
    private router : Router, 
    private renderer: Renderer2,
    private lightbox: Lightbox, 
  ) {

  }

  
  ngOnInit() {

    this.rejectionValidationForm = this.formBuilder.group({
      rejectionReason: ['', [Validators.required]],
      rejectRiskComment: ['', [Validators.required]],
    });

    this.route.params.subscribe((params) => (this.userId = params['id']));

    this.getUserByID();

    this._userService.getRejectResponse().subscribe(res=>{
      this.rejectResponse = res.data
    })

 this._spinnerService.requestEnded();
  }

  getUserByID(){
    this._spinnerService.requestStarted();

    this._userService.getUserById(this.userId).subscribe((res) => {

       this.userItem = res.data;

       this.currentStatus = ( res.data.verify_BlockedClient== 1 &&  res.data.verify_CBE==1  &&  res.data.verify_I_ScoreNationalID==1  &&  res.data.verify_Valifay ==1)
      
       this._spinnerService.requestEnded();

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

       element.content = 'data:image/jpg;base64,'+ element.content
       element.content =this._sanitizer.bypassSecurityTrustUrl(element.content)
     });

     if(res.data.userDocuments.length > 0)
     this.imgSrc = res.data.userDocuments[0].content;

     this._spinnerService.requestEnded();
     });

  }


 

  cpoyPDFLink(){
    this.IscoreFileLink = 'file://192.168.10.2/iscorePFDs/'+ this.userItem.nationalId +'.pdf';
    //navigator.clipboard.writeText(this.IscoreFileLink);
     this.clicked = true;

    setTimeout(()=>{
      this.clicked = false;
    }, 3000);
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
  
  showSpinner(){
    this.loading = true;
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

  openModal(content: any) {

    this.modalService.open(content);
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

    this._userService.getClientActivation(mobileNumber) .subscribe((result) => {

      if(result.messege.length >0)
      {

        this.toastr.error("",  result.messege);

        return;}
   // console.log(result)
    this.isShowRiskLimit = true;
    this.userItem.creditLimit =  result.data
    this.isClientActivation =  false;
    this.isEnableActions = true;
    })
  }

  openPdf(){
    window.open(this.userItem.iscoreFile); 
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
}
