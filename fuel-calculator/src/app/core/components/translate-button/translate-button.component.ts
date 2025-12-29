import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonTranslateButtonModule } from './ion-modules';

type languagesType = 'ua' | 'en';

@Component({
  selector: 'fc-translate-button',
  template: `<ion-fab slot="fixed" horizontal="end" vertical="top">
    <ion-fab-button size="small">
      <ion-icon name="language-outline" />
    </ion-fab-button>
    <ion-fab-list side="start">
      @for (language of languages; track language) {
      <ion-fab-button
        (click)="changeLanguage(language)"
        [disabled]="fallbackLang == language"
        [color]="fallbackLang == language ? 'success' : 'light'"
      >
        {{ language }}
      </ion-fab-button>
      }
    </ion-fab-list>
  </ion-fab>`,
  imports: [IonTranslateButtonModule],
})
export class TranslateButtonComponent {
  private translate = inject(TranslateService);
  public languages: languagesType[] = ['ua', 'en'];

  get fallbackLang() {
    return this.translate.getFallbackLang();
  }

  changeLanguage(code: languagesType) {
    this.translate.setFallbackLang(code);
    this.translate.use(code);
  }
}
