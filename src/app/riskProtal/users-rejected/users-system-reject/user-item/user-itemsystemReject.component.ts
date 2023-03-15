import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './user-itemsystemReject.component.html',
  styleUrls:['./user-itemsystemReject.component.css'],
  animations: [appModuleAnimation()], 
})
export class UserItemSystemRejectComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
