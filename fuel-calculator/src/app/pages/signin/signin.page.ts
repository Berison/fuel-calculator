import { Component, signal } from '@angular/core';
import { IonSigninModule } from './ion-modules';
import { FCHeader } from 'src/app/core/components/header/header.component';

@Component({
  selector: 'fc-signin',
  templateUrl: 'signin.page.html',
  styleUrl: 'signin.page.scss',
  imports: [IonSigninModule, FCHeader],
})
export class SigninPage {
  passwordVisible = signal(false);

  togglePasswordVisibility() {
    this.passwordVisible.update((v) => !v);
  }
}
