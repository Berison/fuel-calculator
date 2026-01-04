import { Component, computed, inject } from '@angular/core';
import { IonHomePageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { HelloUserComponent } from './components/hello-user/hello-user.component';
import { ToCarsButtonComponent } from './components/to-cars-button/to-cars-button.component';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'fc-home',
  templateUrl: 'home.page.html',
  imports: [
    IonHomePageModule,
    TranslatePipe,
    HelloUserComponent,
    ToCarsButtonComponent,
  ],
})
export class HomePage {
  private readonly carsService = inject(CarsService);

  carsCount = toSignal(
    this.carsService.getCars$().pipe(map((cars) => cars?.length)),
    { initialValue: 0 }
  );

  isEvenOneCar = computed(() => this.carsCount() > 0);
}
