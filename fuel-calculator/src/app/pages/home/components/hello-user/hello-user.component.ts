import { Component, inject } from '@angular/core';
import { IonLabel } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'fc-hello-user',
  template: `<ion-label
    ><h1>
      {{ 'pages.home.hello-user' | translate : { name: userEmail } }}
    </h1></ion-label
  >`,
  imports: [IonLabel, TranslatePipe],
})
export class HelloUserComponent {
  private readonly authService = inject(AuthService);

  get userEmail() {
    return this.authService.currentUser?.email?.split('@')[0];
  }
}
