import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
    Input
  } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';
  import {
    UserServiceProxy,
    CreateUserDto,
    RoleDto,
    LookUpServiceProxy,
    DueTransactionsServiceProxy
  } from '@shared/service-proxies/service-proxies';
  import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { UsersService } from '@shared/services/endpoints/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


  @Component({
    templateUrl: './edit-comment-dialog.component.html',
    styleUrls:['../detailsItem.component.css']
  })
  export class EditCommentConfirmationDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    disableconfirmBtn:boolean = false;

    @Output() onSave = new EventEmitter<any>();
     
    
    submitAcceptform:any;

    isTableLoading:boolean = false;

    submitEditCommentForm!: FormGroup;
    submitForm = false;

    requestID:any;
    commentID:any;
    comment:any;

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public _lookupService: LookUpServiceProxy,
      public bsModalRef: BsModalRef,
      public _modalOption:ModalOptions,
      private _DueTransactionsServiceProxy :DueTransactionsServiceProxy,
      private _usersServices:UsersService, 
      private router: Router, 
      public formBuilder: FormBuilder
    ) {
      super(injector);
    }

    ngOnInit(): void {
      this.isTableLoading = true;

     this.requestID = this._modalOption.initialState.requestID; 
     this.commentID = this._modalOption.initialState.commentID; 
     this.comment = this._modalOption.initialState.comment; 
 
     console.log(this._modalOption.initialState);
 
     this.submitEditCommentForm = this.formBuilder.group({
      requestID: [this.requestID, [Validators.required]],
      commentID: [this.commentID, [Validators.required]],
      comment: [this.comment.comment, [Validators.required]], 
    });
    
     this.isTableLoading = false;

     
    }

 

    hide(){
      this.bsModalRef.hide()
    }

 
    Edit() {
      this.submitForm = true;
      if (!this.submitEditCommentForm.valid)
        return;
  
         
      const data = {
        requestId: this.submitEditCommentForm.value.requestID,
        commentId:this.submitEditCommentForm.value.commentID,
        comment:this.submitEditCommentForm.value.comment
      };
      
      this._usersServices.EditComent(data.requestId, data.commentId,data.comment).subscribe(res => {
         if(res)
           this.bsModalRef.hide();
      })

      
    }
 
  }
