import { Component, Injector, ChangeDetectionStrategy, OnInit, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SpinnerService } from '@shared/services/endpoints/spinner.service';
import { UsersService } from '@shared/services/endpoints/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
 

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';  
import { SubmitApprovalConfirmationDialogComponent } from './submitApproval/submit-approval-dialog.component';
import { TimeLineConfirmationDialogComponent } from './timeLine/time-line-dialog.component';
import { EditCommentConfirmationDialogComponent } from './edit-comment/edit-comment-dialog.component';
import { NotifyService } from 'abp-ng2-module';
import Swal from 'sweetalert2';
import { SubmitConfirmationDialogComponent } from './submit/submit-dailog.component';

@Component({
  templateUrl: './detailsItem.component.html',
  styleUrls:['./detailsItem.component.css'],
  animations: [appModuleAnimation()], 
})

export class DetailsItemConfirmationComponent implements OnInit {

  userItem!: any;
  IscoreFileLink: string = '';
  clicked: boolean = false; 
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

  pesonalImages: any;
  allContractImages: any[] = [];
  closeResult = '';
  submitAcceptform = false;
  submitrejectform = false;
  rejectResponse: any[] = [];
  approveRiskComment: string = '';

  isTableLoading:boolean = false;

  riskApprovedLimit: number = 0;
  oldRiskApprovedLimit: number = 0;
  rejectRiskComment: string = '';
  isEditRiskLimit: boolean = false;
  rejectionReason: string = ''

  imgSrc: string = '';
  locationName:string = '';
  mobileNum:string = '';
  name:string = '';

  loading: boolean = false;


  rejectOption: string = '';
  rejectComment: string = '';

  rejection: FormGroup = new FormGroup({
    options: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required)
  });

  submit: boolean = false;
  rejectionValidationForm!: FormGroup;

  isVisibleBtn:boolean = true;

  editPersonalData! :FormGroup;
  maritalStatus:string='';
  maritalStatuses :any [] = [];
  expireDate:string='';
  gender:string='';
  dateOfBirth:string = '';

  NoteMsg:string='';
  PersonalIMG:boolean=true;
  degree:number = 0;

  scoreCardLimit:any;

  isClientActivation :boolean = false;
  
  isShowRiskLimit:boolean=false;
  isEnableActions :boolean = false; 

  programID:any;

  Selectedprogram:any;
  SelectedProgramName:any;

  isShowAcceptBtn = abp.auth.isGranted("Pages.Risk.UsersApproval.Accept");
  isShowRejectBtn = abp.auth.isGranted("Pages.Risk.UsersApproval.Reject");
  isShowEditBtn = abp.auth.isGranted("Pages.Risk.UsersApproval.Edit");
  isSaveEditNoteBtn = abp.auth.isGranted("Pages.Risk.UsersApproval.SaveEditNote");
  isShowEditNoteBtn = abp.auth.isGranted("Pages.Risk.UsersApproval.ShowEditNote");
  isShowScoreCard = abp.auth.isGranted("Pages.Risk.UsersApproval.ScoreCard"); 
  isShowAddressInfo = abp.auth.isGranted("Pages.Risk.UsersApproval.ShowAddressInfo");
  isShowMainInfo = abp.auth.isGranted("Pages.Risk.UsersApproval.ShowMainInfo ");

  
  salesRepMessage :string = '';

  verifyChecked: boolean = false;
 
  isShowEditRiskLimit:boolean = false;
  verify_list :any[] = [];
  reject_list :any[] = [];
  bending_list :any[] = [];

  currentStatus : boolean = false;
  uploadDocument! :FormGroup; 
  document:any = '';

  NationalIdDoc:any[] = [];
  CarLicenseDoc:any[] = [];
  clubMembership:any[] = [];
  ClientContract:any[] = [];
  PersonalPhoto:any[] = [];

  statusName:string = '';
  backgroundColor: string = '#47A992';
  
  profileImg:any;

 comments:any;
 newComment:any;
 Programs:any;

 mobileRejection:any;
 iscoreRejection:any;

  eDocType = DocumentType;
  notify: any;
  type:any;

  keys() : Array<string> {
    var keys = Object.keys(this.eDocType);
    return keys.slice(keys.length / 2);
  }


  constructor(injector: Injector,private _sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router,public formBuilder: FormBuilder,
              private _spinnerService:SpinnerService,private _userService:UsersService,
              private _notify: NotifyService,
              private renderer: Renderer2,
              private modalService: NgbModal,
              private _modalService: BsModalService
              ) {
    //super(injector);
  }

  ngOnInit() {
 
  this.getAllProgram();

    this.uploadDocument = this.formBuilder.group({
      doc: ['', [Validators.required]],
      docType: ['', [Validators.required]],
   });


    this.rejectionValidationForm = this.formBuilder.group({
      rejectionReason: ['', [Validators.required]],
      rejectRiskComment: ['', [Validators.required]],
    });


    this.route.params.subscribe((params) => (this.userId = params['publicId']));

     

    this.getRequestDetails();

    // this._userService.getRejectResponse().subscribe(res => {
    //   this.rejectResponse = res.result.data
       

    // })

    this._spinnerService.requestEnded();

   
    
  }

  // clientActivation (mobileNumber : string){

  //  // this.isClientActivation =  true;

  //   this._userService.getClientActivation(mobileNumber).subscribe((result) => {

  //     if(result.messege.length >0)
  //     {

  //       //this.toastr.error("",  result.messege);

  //       return;
  //     } 
  //   this.isShowRiskLimit = true;
  //   this.userItem.creditLimit =  result.data
  //   //this.isClientActivation =  false;
  //   this.isEnableActions = true;
  //   })
  // }


  getRequestDetails(){
    this.isTableLoading = true;

    this._spinnerService.requestStarted();
    this._userService.getRequestDetails(this.userId).subscribe((res) => {
  
       
      this._spinnerService.requestEnded();
   
      this.userItem = res.result;

      this.comments = this.userItem.comments;

      if(this.userItem.instantLimit != null && this.userItem.instantLimit != 0)
      this.isShowEditRiskLimit = true;
      else
       this.isShowEditRiskLimit = false;

       this.scoreCardLimit = this.userItem.instantLimit;
  
      // this.currentStatus = ( res.data.verify_BlockedClient== 1 &&  res.data.verify_CBE==1  &&  res.data.verify_I_ScoreNationalID==1  &&  res.data.verify_Valifay ==1)
      
      this.getUserStatus();
      
  
      for (let i in this.userItem) {
        if (this.userItem[i] === null || this.userItem[i] === '') {
          this.userItem[i] = 'N/A';
        }
      }
  
      this.NoteMsg = this.userItem.note;
  
  
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
  
      this.maritalStatus = this.userItem.maritalStatus;
      this.expireDate = this.userItem.expiryDate;
      this.gender = this.userItem.gender;
      this.dateOfBirth = this.userItem.dateOfBirth;
  
      if (this.userItem.riskApprovedLimit > 0) {
        this.riskApprovedLimit = this.userItem.riskApprovedLimit;
        this.oldRiskApprovedLimit = this.riskApprovedLimit;
  
      }
      else {
        this.riskApprovedLimit = this.userItem.creditLimit;
        this.oldRiskApprovedLimit = this.riskApprovedLimit;
      }
  
     
      this._userService.GetAllDocuments(this.userId).subscribe(res => {
        if(res){
 
   this.allContractImages = res.result; 
          this.imgSrc = this.allContractImages[0].url; 
          this.mobileNum = this.allContractImages[0].reviewerMobile; 
          this.name = this.allContractImages[0].reviewerName; 
          this.locationName = this.allContractImages[0].reviewerLocation; 

          for(let i = 0 ; i < this.allContractImages.length ; i++){
                 if(this.allContractImages[i].documentType == 0)
                    this.profileImg = this.allContractImages[i].url
          }

          for(let i = 0 ; i< this.allContractImages.length ; i++){
              if(this.allContractImages[i].documentType == 1 || this.allContractImages[i].documentType == 2)
                  this.NationalIdDoc.push(this.allContractImages[i]);
              else if(this.allContractImages[i].documentType == 3 || this.allContractImages[i].documentType == 4)
                  this.CarLicenseDoc.push(this.allContractImages[i]);
              else if(this.allContractImages[i].documentType == 5 || this.allContractImages[i].documentType == 6)
                  this.clubMembership.push(this.allContractImages[i]);
              else if(this.allContractImages[i].documentType == 7)
                  this.ClientContract.push(this.allContractImages[i]);
              else if(this.allContractImages[i].documentType == 0 )
              this.PersonalPhoto.push(this.allContractImages[i]);
                  
          }

 
        }
  });

     this._userService.GetMobileRejection(this.userId).subscribe(res => {
      if(res){
        this.mobileRejection = res.result;  
      }
    });

    this._userService.GetIScoreRejection(this.userId).subscribe(res => {
      if(res){
        this.iscoreRejection = res.result;  
      }
    });

  
       
      this.pesonalImages = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + res.result.personalImage
      ); 
  
      if(res.result.personalImage == 'N/A')
          this.PersonalIMG = false;
  
  
      // this._userService.getmaritalStatus().subscribe(res=>{
      //   this.maritalStatuses = res.result;
 
      // })

      this.isTableLoading = false;
  
    });
 
  }


  selectProgram(program:any){
         this.Selectedprogram = program;
         this.getProgramByID();
  }

  getProgramByID(){
    this._userService.getProgramByID(this.Selectedprogram).subscribe(res => {
        this.SelectedProgramName = res.result;
    })
  }
  getUserStatus(){
    if(this.userItem.status == 2003){
         this.backgroundColor = '#f5a15b';
         this.statusName = 'Re-Examined'
     }
     else if(this.userItem.status == 2000){
      this.backgroundColor = '#00AF91';
      this.statusName = 'New Request'
      }
     else if(this.userItem.status == 2001){
        this.backgroundColor = '#F45050';
        this.statusName = 'Reject by Maker'
      }
      else if(this.userItem.status == 2002){
        this.backgroundColor = '#5fbc7a';
        this.statusName = 'Approve by Maker'
      }
      else if(this.userItem.status == 990){
        this.backgroundColor = '#F45050';
        this.statusName = 'Reject by checker'
      }
     else if(this.userItem.status == 70){
        this.backgroundColor = '#3E6D9C';
        this.statusName = 'Upload Contract'
      }
      else if(this.userItem.status == 100){
        this.backgroundColor = '#53BF9D';
        this.statusName = 'Approve active'
      }
     else if(this.userItem.status == 80){
        this.backgroundColor = '#3E6D9C';
        this.statusName = 'Re-Upload Contract'
      }
      else if(this.userItem.status == 90){
        this.backgroundColor = '#5fbc7a';
        this.statusName = 'System Approve Request'
      }
     
  }

  calculateLimit(){

    this.isClientActivation = true;

    this._userService.CalculateLimit(this.userId).subscribe(res => {
     if(res){
      this.scoreCardLimit = res.result.scoreCardLimit;
       this.isShowEditRiskLimit = true;
     
    }
    this.isClientActivation = false;
   });

 }

 getAllProgram(){
  this._userService.GetAllPrograms().subscribe(res => {
    this.Programs = res.result.items;
  })
}

  addComment(comment:any){
    this._userService.AddComent(this.userItem.id,comment).subscribe( res => {
     if(res){
      this.newComment = '';
       this.getRequestDetails();
     }
  });

  }


  ReleaseAssignment(){

    Swal.fire({
      title: 'Are You Sure for Release ?',
      showCancelButton: true,
      confirmButtonText: 'Release', 
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');

        this._userService.ReleaseAssignment(this.userItem.id).subscribe(res => {
          if(res){ 
           // this._notify.success('Successfully Release ');
            this.router.navigate(['/app/risk-portal/confirmation']);
          }
      });
      
      }  
    })
    
 

}
 
   editCommentDialog(requestID:any,commentID:any,comment:any): void {
      let editCommentDialog: BsModalRef;
  
      const initialState = {
        requestID: requestID,
        commentID: commentID,
        comment: comment
      };
  
      editCommentDialog = this._modalService.show(EditCommentConfirmationDialogComponent,{class: 'modal-lg', initialState });
  
    }

 
 
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

            this.getRequestDetails();

            
           } 
        });
  
        this._spinnerService.requestEnded();
    }
   


  Submit(status :any): void {
    this.showSubmitApprovalDialog(this.userItem,status );

     
    
  }

  

  private showSubmitApprovalDialog(userItem:any, status :any): void {
    let acceptDialog: BsModalRef;
 

     

    const initialState = {
      userItem: userItem,
      SelectedProgramName:this.SelectedProgramName
    };

  if(status == '90')
    acceptDialog = this._modalService.show(SubmitConfirmationDialogComponent,{class: 'modal-lg', initialState });
  else
    acceptDialog = this._modalService.show(SubmitApprovalConfirmationDialogComponent,{class: 'modal-lg', initialState });

  }

  TimeLineView(): void {
   
    this.TimeLineViewDialog();
  }

  private TimeLineViewDialog(): void {
    let timeLineDialog: BsModalRef;

    const initialState = {
       
    };

    timeLineDialog = this._modalService.show(TimeLineConfirmationDialogComponent,{class: 'modal-lg', initialState });

  }
  
  

 
  

  isriskApprovedLimitChanged: boolean = false
    editRiskLimit(cancel: boolean = false) {
  
      this.isEditRiskLimit = !this.isEditRiskLimit;
  
      if (cancel) {
        this.riskApprovedLimit = this.oldRiskApprovedLimit;
        this.isriskApprovedLimitChanged = false;
        this.isEditRiskLimit = false;
        return;
      }
      if (this.isriskApprovedLimitChanged) {
        // const swalWithBootstrapButtons = Swal.mixin({
        //   customClass: {
        //     confirmButton: 'btn btn-success',
        //     cancelButton: 'btn btn-danger ms-2'
        //   },
        //   buttonsStyling: false
        // });
  
        // swalWithBootstrapButtons
        //   .fire({
        //     title: this._TranslateService.instant('USERITEMINFO.areYouSure'),
        //     text: this._TranslateService.instant('USERITEMINFO.msgEidtrisk') + this.oldRiskApprovedLimit + this._TranslateService.instant('USERITEMINFO.to') + this.riskApprovedLimit,
        //     icon: 'warning',
        //     confirmButtonText: this._TranslateService.instant('USERITEMINFO.yesChange'),
        //     cancelButtonText: this._TranslateService.instant('USERITEMINFO.noRollback'),
        //     showCancelButton: true
        //   })
        //   .then(result => {
  
  
        //     if (result.value) {
        //       this.oldRiskApprovedLimit = this.riskApprovedLimit;
        //       this.isriskApprovedLimitChanged = false;
        //       swalWithBootstrapButtons.fire({
        //         title: this._TranslateService.instant('USERITEMINFO.yesTitle'),
        //         text: this._TranslateService.instant('USERITEMINFO.yesMsg'),
        //         confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
        //         icon: 'success'
        //       });
        //       this._spinnerService.requestStarted();
        //       this.ngOnInit();
        //     } else if (
        //       /* Read more about handling dismissals below */
        //       result.dismiss === Swal.DismissReason.cancel
        //     ) {
        //       swalWithBootstrapButtons.fire({
        //         title: this._TranslateService.instant('USERITEMINFO.rollTitle'),
        //         text: this._TranslateService.instant('USERITEMINFO.rollMsg'),
        //         confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
        //         icon: 'error'
        //       });
        //       this.isEditRiskLimit = !this.isEditRiskLimit;
        //       this.riskApprovedLimit = this.oldRiskApprovedLimit;
        //     }
        //     else {
        //       this.isriskApprovedLimitChanged = false;
        //       this.riskApprovedLimit = this.oldRiskApprovedLimit;
        //     }
        //   });
      }
      this.isriskApprovedLimitChanged = true;
    }

  openModal(content: any) {

    this.modalService.open(content);
  }

  cpoyPDFLink() {
    this.IscoreFileLink = 'file://192.168.10.2/iscorePFDs/' + this.userItem.nationalId + '.pdf';
    //navigator.clipboard.writeText(this.IscoreFileLink);

    this.clicked = true;

    setTimeout(() => {
      this.clicked = false;
    }, 3000);
  }
  validSubmit() {
    this.submit = true;
  }
  get form() {
    return this.rejectionValidationForm.controls;
  }
 

 
   
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  

  showImg(image:any) {

    console.log(image)
    this.imgSrc = image.url;

    if(image != null){
      this.locationName = image.reviewerLocation;
      this.mobileNum = image.reviewerMobile;
      this.name = image.reviewerName;
    }else{
      this.locationName = 'N/A';
      this.mobileNum = 'N/A';
      this.name = 'N/A';
    }

  }

  showSpinner() {
    this.loading = true;
  }

  public convetToPDF()
  {

    var data = document.getElementById('contentToConvert')!;


    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('user-item.pdf');
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
        
       //this.toastr.success("",  'Edit Data successfully');
     
      }
      this.getRequestDetails();
    });

  }


  editRiskClientNote(){
   const data = {
    userMobile:this.userId,
    note:this.NoteMsg
   };



   this._userService.EditRiskClientNote(data).subscribe((res) => {
     if(res)
     {
      abp.message.success("Edit Note successfully");
     }
   });
  }

  saveMessage(message:any){
     this.salesRepMessage = message?.value;

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
