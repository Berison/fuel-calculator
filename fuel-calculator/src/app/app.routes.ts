import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { guestGuard } from './core/guards/guest/guest.guard';

export const routes: Routes = [
  // Public (no auth)
  {
    path: 'signin',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('./pages/signin/signin.page').then((c) => c.SigninPage),
  },

  // Private (auth required)
  {
    path: 'tabs',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.routes').then((m) => m.routes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.routes').then((m) => m.routes),
      },
    ],
  },

  { path: '**', redirectTo: 'tabs' },
];
