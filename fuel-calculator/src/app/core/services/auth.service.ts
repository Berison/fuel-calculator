import { inject, Injectable, computed } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user as firebaseUser$,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  filter,
  firstValueFrom,
  map,
  shareReplay,
  startWith,
  take,
} from 'rxjs';
import { NavController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly nav = inject(NavController);

  private readonly authState$ = firebaseUser$(this.auth).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private readonly firebaseUserSig = toSignal<User | null | undefined>(
    this.authState$,
    { initialValue: undefined }
  );

  readonly user = computed(() => this.firebaseUserSig());
  readonly ready = computed(() => this.firebaseUserSig() !== undefined);
  readonly isLoggedIn = computed(() => !!this.firebaseUserSig());

  get currentUser(): User | null | undefined {
    return this.firebaseUserSig();
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await firstValueFrom(
        this.authState$.pipe(
          filter((u) => u === null),
          take(1)
        )
      );
    } finally {
      await this.nav.navigateRoot('/signin', { replaceUrl: true });
    }
  }
}
