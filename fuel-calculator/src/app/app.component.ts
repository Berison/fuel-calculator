import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonAppModule } from './ion-modules';

type languagesType = 'ua' | 'en';

@Component({
  selector: 'fc-root',
  templateUrl: 'app.component.html',
  imports: [IonAppModule],
})
export class AppComponent {
  private translate = inject(TranslateService);
  public languages: languagesType[] = ['ua', 'en'];

  get fallbackLang() {
    return this.translate.getFallbackLang();
  }

  constructor() {
    this.translate.addLangs(['ua', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  changeLanguage(code: languagesType) {
    this.translate.setFallbackLang(code);
    this.translate.use(code);
  }
}
