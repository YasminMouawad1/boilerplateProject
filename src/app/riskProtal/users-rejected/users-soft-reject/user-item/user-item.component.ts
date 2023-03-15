import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './user-item.component.html',
  styleUrls:['./user-item.component.css'],
  animations: [appModuleAnimation()], 
})
export class UserItemSoftRejectComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
