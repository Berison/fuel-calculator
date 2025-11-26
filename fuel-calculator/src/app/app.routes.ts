import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin/signin.page').then((c) => c.SigninPage),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
];
