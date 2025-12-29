import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from 'src/app/core/services/ui/theme.service';

@Component({
  selector: 'fc-ion-mode-toggle',
  template: `<ion-item>
    <ion-label>{{ 'pages.settings.mode-title' | translate }}</ion-label>
    <ion-toggle
      slot="end"
      [checked]="theme.paletteToggle()"
      (ionChange)="theme.toggleChange($event)"
    ></ion-toggle>
  </ion-item>`,
  imports: [IonItem, IonLabel, IonToggle, TranslatePipe],
})
export class IonModeToggleComponent {
  theme = inject(ThemeService);
}
