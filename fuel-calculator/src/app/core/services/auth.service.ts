import { inject, Injectable, computed, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user as firebaseUser$,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

  /** Firebase user$ */
  private readonly firebaseUserSig = toSignal<User | null>(
    firebaseUser$(this.auth),
    { initialValue: null }
  );

  /** Current Firebase User */
  readonly user = computed(() => this.firebaseUserSig());

  /** User logged in or not */
  readonly isLoggedIn = computed(() => !!this.firebaseUserSig());

  /** Current User */
  get currentUser(): User | null {
    return this.firebaseUserSig();
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
