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
import { map, startWith } from 'rxjs';

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

  readonly ready = toSignal(
    firebaseUser$(this.auth).pipe(
      map(() => true),
      startWith(false)
    ),
    { initialValue: false }
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
