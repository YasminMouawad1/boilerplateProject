import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './user-item-hard.component.html',
  styleUrls:['./user-item-hard.component.css'],
  animations: [appModuleAnimation()], 
})
export class UserItemHardRejectComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
