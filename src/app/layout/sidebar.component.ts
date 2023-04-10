import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  OnInit,
  Input
} from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html', 
  styleUrls:['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebarExpanded: boolean;
 
  newLanguage:any;
  checkLanguage:boolean = false;

  isShowAdmin = abp.auth.isAnyGranted("Pages.Roles","Pages.Users");
  isShowAdminUsers = abp.auth.isGranted("Pages.Users");
  isShowAdminRoles = abp.auth.isGranted("Pages.Roles");
  isShowAdminTenants = abp.auth.isGranted("Pages.Tenants");

  isSohwOperation = abp.auth.isAnyGranted("Pages.Operation.BulkOnBoarding","Pages.Operation.DueTransactions","Pages.Operation.ActivationPoint","Pages.Operation.RegistrationUsers","Pages.Operation.DueTransactions");
  isSohwOperationBulkOnBoarding = abp.auth.isGranted("Pages.Operation.BulkOnBoarding");
  isSohwOperationDueTransactions = abp.auth.isGranted("Pages.Operation.DueTransactions");
  isSohwOperationActivationPoint = abp.auth.isGranted("Pages.Operation.ActivationPoint");
  isSohwOperationRegisterationUser = abp.auth.isGranted("Pages.Operation.RegistrationUsers");
  isSohwOperationAcceptClaims = abp.auth.isGranted("Pages.Operation.DueTransactions");

  isShowSystemConfig = abp.auth.isAnyGranted("Pages.SystemConfiguration.MessageType ","Pages.SystemConfiguration.MessageTemplate ","Pages.SystemConfiguration.EmailType ","Pages.SystemConfiguration.CreateEmail ");
  isShowSystemConfigMessageType = abp.auth.isGranted("Pages.SystemConfiguration.MessageType ");
  isShowSystemConfigMessageTemplate = abp.auth.isGranted("Pages.SystemConfiguration.MessageTemplate ");
  isShowSystemConfigEmailType = abp.auth.isGranted("Pages.SystemConfiguration.EmailType ");
  isShowSystemConfigEmailContent = abp.auth.isGranted("Pages.SystemConfiguration.CreateEmail "); 

  isShowRisk = abp.auth.isAnyGranted("Pages.Risk.UsersApproval","Pages.Risk.SoftRejected","Pages.Risk.HardRejected","Pages.Risk.SystemRejected","Pages.Risk.BulkOnBorading","Pages.Risk.Customers","Pages.Risk.LimitReview");
  isShowRiskApproval = abp.auth.isGranted("Pages.Risk.UsersApproval");
  isShowRiskRejectUsers = abp.auth.isAnyGranted("Pages.Risk.SoftRejected","Pages.Risk.HardRejected","Pages.Risk.SystemRejected");
  isShowRiskSpftReject = abp.auth.isGranted("Pages.Risk.SoftRejected");
  isShowRiskHardReject = abp.auth.isGranted("Pages.Risk.HardRejected");
  isShowRiskSysReject = abp.auth.isGranted("Pages.Risk.SystemRejected"); 
  isShowriskLimitReview = abp.auth.isGranted("Pages.Risk.LimitReview");
  isShowRiskBulk = abp.auth.isGranted("Pages.Risk.BulkOnBorading");
  isShowRiskCustomers = abp.auth.isGranted("Pages.Risk.Customers"); 


 
 

  constructor(
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    private _appAuthService:AppAuthService
  ) {}

  ngOnInit(): void {
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
      this.toggleSidebar();
    });
 
    this._appAuthService.getNewLanguage().subscribe(value => {
           
      this.newLanguage = value;
      if(value == 'ar')
        this.checkLanguage = true;

       }); 
     
    
  }


  toggleSidebar(): void {
    if (this.sidebarExpanded) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  }

  showSidebar(): void {
    this.renderer.removeClass(document.body, 'sidebar-collapse');
    this.renderer.addClass(document.body, 'sidebar-open');
  }

  hideSidebar(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-collapse');
  }
}
