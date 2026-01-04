import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { Car } from 'src/app/shared/models/car.interface';
import { defer, EMPTY, firstValueFrom } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export const carResolver: ResolveFn<Car> = (route) => {
  const carsService = inject(CarsService);
  const loadingCtrl = inject(LoadingController);
  const router = inject(Router);
  const translate = inject(TranslateService);

  const carId = route.paramMap.get('carId');
  if (!carId) {
    router.navigateByUrl('');
    return EMPTY;
  }

  return defer(async () => {
    const message = await firstValueFrom(translate.get('loading'));

    const loading = await loadingCtrl.create({
      message,
      spinner: 'crescent',
    });

    await loading.present();
    return loading;
  }).pipe(
    switchMap((loading) =>
      carsService.getCarOnce$(carId).pipe(finalize(() => loading.dismiss()))
    ),
    catchError(() => {
      router.navigateByUrl('');
      return EMPTY;
    })
  );
};
