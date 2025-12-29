import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.ready).pipe(
    filter(Boolean),
    debounceTime(0),
    take(1),
    map(() => (auth.isLoggedIn() ? true : router.createUrlTree(['/signin'])))
  );
};
