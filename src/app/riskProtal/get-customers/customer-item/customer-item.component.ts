import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'projects/public/src/app/core/services/loader/loader.service';
import { UsersService } from 'projects/public/src/app/shared/services/endpoints/users.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from 'projects/public/src/app/shared/services/endpoints/spinner.service';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls:['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {

  IscoreFileLink: string = '';
  clicked: boolean = false;
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

  pesonalImages: any;
  allContractImages: any[] = [];
  closeResult = '';
  submitAcceptform = false;
  submitrejectform = false;
  rejectResponse: any[] = [];
  approveRiskComment: string = '';


  riskApprovedLimit: number = 0;
  oldRiskApprovedLimit: number = 0;
  rejectRiskComment: string = '';
  isEditRiskLimit: boolean = false;
  rejectionReason: string = ''

  imgSrc: string = ''
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

  PersonalIMG:boolean=true;

  constructor(
    private modalService: NgbModal,
    private _userService: UsersService,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private lightbox: Lightbox,
    public formBuilder: FormBuilder,
    public _TranslateService: TranslateService,
    private _spinnerService: SpinnerService,
    private toastr: ToastrService
  ) { }




  ngOnInit() {



    this.rejectionValidationForm = this.formBuilder.group({
      rejectionReason: ['', [Validators.required]],
      rejectRiskComment: ['', [Validators.required]],
    });


    this.route.params.subscribe((params) => (this.userId = params['id']));

    this.getUserById();

    this._userService.getRejectResponse().subscribe(res => {
      this.rejectResponse = res.data

    })




    // setTimeout(()=>{
    //   this.loading = false;
    // }, 6000);

    this._spinnerService.requestEnded();
  }


getUserById(){

  this._spinnerService.requestStarted();
  this._userService.getUserById(this.userId).subscribe((res) => {

    //   console.log(d);

    //  console.log("getUserById", res);

    this._spinnerService.requestEnded();

    this.userItem = res.data;


    for (let i in this.userItem) {
      if (this.userItem[i] === null || this.userItem[i] === '') {
        this.userItem[i] = 'N/A';
      }
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

    this.allContractImages = res.data.userDocuments;

    this.allContractImages.forEach(element => {

      element.content = 'data:image/jpg;base64,'+ element.content
      element.content =this._sanitizer.bypassSecurityTrustUrl(element.content)
    });

    if(res.data.userDocuments.length > 0)
    this.imgSrc = res.data.userDocuments[0].content;


    this.pesonalImages = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + res.data.personalImage
    );


    if(res.data.personalImage == 'N/A')
    this.PersonalIMG = false;

    this._userService.getmaritalStatus().subscribe(res=>{
        this.maritalStatuses = res.data;
    })


  });
}
  openLightbox(index: number): void {

    // open lightbox
    this.lightbox.open(this.allContractImages, index);
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

      this._userService.postUser(data).subscribe((res) => {
      if (res.status) {
        // Swal.fire({
        //   title: this._TranslateService.instant('USERITEMINFO.acceptRisk'),
        //   text: this._TranslateService.instant('USERITEMINFO.acceptMsg1') + this.userItem.name + this._TranslateService.instant('USERITEMINFO.acceptMsg2'),
        //   confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
        //   icon: 'success'
        // });
        this.toastr.success("",  'Accept Risk successfully');
        this.router.navigate(['/layout/customer'])
      }
    });
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
  async rejectRiskApplication() {
    this.submitrejectform = true;
    if (!this.rejectionValidationForm.valid)
      return;

    const data = {
      clientNationalId: this.userItem.nationalId,
      riskComment: this.rejectRiskComment,
      rejectionReason: this.rejectionReason,
      clientStatus: false,
    };
    this.modalService.dismissAll()
    await this._userService.postUser(data).subscribe((res) => {
      if (res.status) {
        // Swal.fire({
        //   title: this._TranslateService.instant('USERITEMINFO.rejection'),
        //   text: this._TranslateService.instant('USERITEMINFO.rejectMsg1') + this.userItem.name + this._TranslateService.instant('USERITEMINFO.rejectMsg2'),
        //   confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
        //   icon: 'error'
        // });
        this.toastr.error("",  'Reject Risk successfully');
        this.router.navigate(['/layout/customer'])
      }
    });
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger ms-2'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          title: this._TranslateService.instant('USERITEMINFO.areYouSure'),
          text: this._TranslateService.instant('USERITEMINFO.msgEidtrisk') + this.oldRiskApprovedLimit + this._TranslateService.instant('USERITEMINFO.to') + this.riskApprovedLimit,
          icon: 'warning',
          confirmButtonText: this._TranslateService.instant('USERITEMINFO.yesChange'),
          cancelButtonText: this._TranslateService.instant('USERITEMINFO.noRollback'),
          showCancelButton: true
        })
        .then(result => {


          if (result.value) {
            this.oldRiskApprovedLimit = this.riskApprovedLimit;
            this.isriskApprovedLimitChanged = false;
            swalWithBootstrapButtons.fire({
              title: this._TranslateService.instant('USERITEMINFO.yesTitle'),
              text: this._TranslateService.instant('USERITEMINFO.yesMsg'),
              confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
              icon: 'success'
            });
            this._spinnerService.requestStarted();
            this.ngOnInit();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: this._TranslateService.instant('USERITEMINFO.rollTitle'),
              text: this._TranslateService.instant('USERITEMINFO.rollMsg'),
              confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
              icon: 'error'
            });
            this.isEditRiskLimit = !this.isEditRiskLimit;
            this.riskApprovedLimit = this.oldRiskApprovedLimit;
          }
          else {
            this.isriskApprovedLimitChanged = false;
            this.riskApprovedLimit = this.oldRiskApprovedLimit;
          }
        });
    }
    this.isriskApprovedLimitChanged = true;
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  openModal(content: any) {

    this.modalService.open(content);
  }

  showImg(index: number) {
    this.imgSrc = this.allContractImages[index].content;
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

    const contentDataURL = canvas.toDataURL('image/png') ;
    let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf');
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
      //  Swal.fire({
      //    icon: 'success',
      //    title:this._TranslateService.instant('USERITEMINFO.editMsg1'),
      //    showConfirmButton: false,
      //    timer:3000
      //  })
      }
      this.getUserById();
    });

  }
}
