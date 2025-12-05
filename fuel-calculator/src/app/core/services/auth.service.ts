import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

  /** Current user (observable), null if not logged in */
  readonly user$: Observable<User | null> = user(this.auth);

  /** Simple flag, whether the user is logged in */
  readonly isLoggedIn$: Observable<boolean> = this.user$.pipe(map((u) => !!u));

  /** Current user (sync getter, may be null) */
  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Email login + password
   * Throws an error if login is unsuccessful
   */
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /** Log out of your account */
  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
