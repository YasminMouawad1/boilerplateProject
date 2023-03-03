import { Component, OnInit, Directive } from '@angular/core';
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

@Component({
  selector: 'app-bulk-on-borading-item',
  templateUrl: './bulk-on-borading-item.component.html',
  styleUrls:['./bulk-on-borading-item.component.scss']
})
export class BulkOnBoradingItemComponent implements OnInit {

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

  showImage: boolean = true;
  imgBox:boolean = true;

  rejection: FormGroup = new FormGroup({
    options: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required)
  });

  submit: boolean = false;
  rejectionValidationForm!: FormGroup;

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
  ) {



  }

   ngOnInit() {

    this._spinnerService.requestStarted();

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
    if(this.pesonalImages == null || this.pesonalImages == undefined){
      this.showImage = false;
    }
    if(this.imgSrc == ''){
      this.imgBox = false;
    }

  }


getUserById(){
  this._userService.getUserDocumentsByClientId(this.userId).subscribe((res) => {

    //   console.log(d);

    //  console.log("getUserById", res);

    this._spinnerService.requestEnded();

    this.userItem = res.data;


    for (let i in this.userItem) {
      if (this.userItem[i] === null || this.userItem[i] === '') {
        this.userItem[i] = 'N/A';
      }
    }


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
    //this.imgSrc = res.data.userDocuments[0].content;




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
      rejectionReason:0
    };
    this.modalService.dismissAll()

     this._userService.softApproveCorporate(data).subscribe((res) => {
      if (res.status) {
        // Swal.fire({
        //   title: this._TranslateService.instant('USERITEMINFO.acceptLimit'),
        //   text: this._TranslateService.instant('USERITEMINFO.acceptMsg1') + this.userItem.name + this._TranslateService.instant('USERITEMINFO.acceptMsgLimit'),
        //   confirmButtonText: this._TranslateService.instant('USERITEMINFO.ok'),
        //   icon: 'success'
        // });
        this.toastr.success("",  'Accept Risk successfully');
        this.router.navigate(['/layout/bulkon-borading'])
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
        this.router.navigate(['/layout/users-approval'])
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


}
