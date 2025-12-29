import { Component, inject } from '@angular/core';
import { TranslateButtonComponent } from 'src/app/core/components/translate-button/translate-button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonSettingsPageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'fc-settings',
  templateUrl: 'settings.page.html',
  imports: [IonSettingsPageModule, TranslateButtonComponent, TranslatePipe],
})
export class SettingsPage {
  readonly auth = inject(AuthService);
}
