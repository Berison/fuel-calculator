import { Component, inject } from '@angular/core';
import { IonCurrentUserComponentModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'fc-current-user',
  template: `<ion-card>
    <ion-card-header>
      <ion-card-title>{{
        'pages.settings.user.title' | translate
      }}</ion-card-title>
      <ion-card-subtitle>{{ auth.currentUser?.email }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-item
        ><strong>{{
          'pages.settings.user.account-created' | translate
        }}</strong>
        {{ auth.currentUser?.metadata?.creationTime }}</ion-item
      >
    </ion-card-content>

    <ion-button class="ion-padding" (click)="auth.logout()">{{
      'pages.settings.logout-button' | translate
    }}</ion-button>
  </ion-card>`,
  imports: [IonCurrentUserComponentModule, TranslatePipe],
})
export class CurrentUserComponent {
  readonly auth = inject(AuthService);
}
