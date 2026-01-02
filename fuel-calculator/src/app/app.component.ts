import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonAppModule } from './ion-modules';

@Component({
  selector: 'fc-root',
  templateUrl: 'app.component.html',
  imports: [IonAppModule],
})
export class AppComponent {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ua', 'en']);
    this.translate.setFallbackLang('ua');
    this.translate.use('ua');
  }
}
