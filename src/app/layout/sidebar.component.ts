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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebarExpanded: boolean;
 
  newLanguage:any;
  checkLanguage:boolean = false;

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
