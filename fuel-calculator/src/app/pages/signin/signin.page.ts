import { Component, inject, signal } from '@angular/core';
import { IonSigninModule } from './ion-modules';
import { FCHeader } from 'src/app/core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/ui/toast.service';
import { NavController } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { createGetTranslateByKey$ } from 'src/app/shared/utils';
import { take } from 'rxjs';

@Component({
  selector: 'fc-signin',
  templateUrl: 'signin.page.html',
  styleUrl: 'signin.page.scss',
  imports: [IonSigninModule, FCHeader, FormsModule, TranslatePipe],
})
export class SigninPage {
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly nav = inject(NavController);
  readonly t$ = createGetTranslateByKey$();

  toastSuccessMessage$ = this.t$('toast.success.signin.login-success').pipe(
    take(1)
  );

  passwordVisible = signal(false);
  loading = signal(false);

  email = 'test-user@fuel-calculator.com';
  password = '123456';

  get canLogin(): boolean {
    return this.email.trim().length > 0 && this.password.trim().length > 0;
  }

  togglePasswordVisibility() {
    this.passwordVisible.update((v) => !v);
  }

  async onLogin() {
    if (!this.canLogin) {
      await this.toast.error('Login failed, check your credentials');
      return;
    }

    this.loading.set(true);

    try {
      await this.successSignin();
    } catch (err: any) {
      console.error(err);
      await this.toast.error('Login failed, check your credentials');
    } finally {
      this.loading.set(false);
    }
  }

  private async successSignin() {
    await this.auth.login(this.email, this.password);
    await this.nav.navigateRoot('tabs/home');
    // this.toastSuccessMessage$.subscribe((res) => this.toast.success(res));
  }
}
