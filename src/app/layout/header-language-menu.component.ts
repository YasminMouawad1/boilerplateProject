import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector,
  EventEmitter,
  Output
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import {
  UserServiceProxy,
  ChangeUserLanguageDto
} from '@shared/service-proxies/service-proxies';
import { filter as _filter } from 'lodash-es';

@Component({
  selector: 'header-language-menu',
  templateUrl: './header-language-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLanguageMenuComponent extends AppComponentBase
  implements OnInit {
  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;
 
   
  
  constructor(injector: Injector, private _userService: UserServiceProxy,private _authService:AppAuthService) {
    super(injector);
  }

  ngOnInit() {
    this.languages = _filter(
      this.localization.languages,
      (l) => !l.isDisabled
    );
    this.currentLanguage = this.localization.currentLanguage;
 
     
    this._authService.setNewLanguage(this.currentLanguage.name);
  }

  changeLanguage(languageName: string): void {
 

    const input = new ChangeUserLanguageDto();
    input.languageName = languageName;

        
    this._userService.changeLanguage(input).subscribe(() => {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        abp.appPath
      );

      window.location.reload();
    });
  }
}
