import { Component, inject } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'fc-settings',
  templateUrl: 'settings.page.html',
  imports: [IonContent, IonButton],
})
export class SettingsPage {
  readonly auth = inject(AuthService);
}
