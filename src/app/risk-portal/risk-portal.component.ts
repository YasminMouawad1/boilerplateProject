import { Component, Injector, Input, OnInit, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  templateUrl: './risk-portal.component.html'
})
export class RiskPortalComponent extends AppComponentBase implements OnInit {
 
  sidebarExpanded: boolean; 

  newLanguage:any;
  checkLanguage:boolean = false;

  constructor(
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    private _appAuthService:AppAuthService
  ) {
    super(injector);
  }

  ngOnInit(): void {
 
    this.renderer.addClass(document.body, 'sidebar-mini');

    SignalRAspNetCoreHelper.initSignalR();

    abp.event.on('abp.notifications.received', (userNotification) => {
      abp.notifications.showUiNotifyForUserNotification(userNotification);

      // Desktop notification
      Push.create('AbpZeroTemplate', {
        body: userNotification.notification.data.message,
        icon: abp.appPath + 'assets/app-logo-small.png',
        timeout: 6000,
        onClick: function () {
          window.focus();
          this.close();
        }
      });
    });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });

    this._appAuthService.getNewLanguage().subscribe(value => {
           
      this.newLanguage = value;
      if(value == 'ar')
        this.checkLanguage = true;

       }); 
       
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }

  

  

}
