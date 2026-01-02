import { Routes } from '@angular/router';
import { carResolver } from './pages/car/car.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.page').then((c) => c.HomePage),
  },
  {
    path: ':carId',
    resolve: { car: carResolver },
    loadComponent: () => import('./pages/car/car.page').then((c) => c.CarPage),
  },
];
