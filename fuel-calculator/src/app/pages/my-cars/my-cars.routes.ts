import { Routes } from '@angular/router';
import { carResolver } from './pages/car/car.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-cars.page').then((c) => c.MyCarsPage),
  },
  {
    path: ':carId',
    resolve: { car: carResolver },
    loadComponent: () => import('./pages/car/car.page').then((c) => c.CarPage),
  },
];
