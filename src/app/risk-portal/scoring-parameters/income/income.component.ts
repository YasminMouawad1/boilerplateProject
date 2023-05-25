import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './income.component.html',
  animations: [appModuleAnimation()],
  styleUrls:['./income.component.css'], 
})
export class IncomeComponent extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
  }
}