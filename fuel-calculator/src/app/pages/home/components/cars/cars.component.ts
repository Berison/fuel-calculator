import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { Car } from 'src/app/shared/models/car.interface';
import { IonCarsComponentModule } from './ion-modules';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'fc-cars',
  imports: [IonCarsComponentModule, TranslatePipe, RouterLink],
  template: `
    @if (loading()) {
    <ion-spinner />
    } @else {
    <ion-list>
      @for (c of cars(); track c.id) {
      <ion-item-sliding>
        <ion-item [routerLink]="c.id">
          <ion-label>
            <h2>{{ c.name }} <ion-icon name="car-outline" /></h2>
            <p>
              {{ c.year }} - {{ c.color }} - {{ c.engineSize }}
              {{ engineVolume() }}
            </p>
          </ion-label></ion-item
        >
        <ion-item-options>
          <ion-item-option color="danger" (click)="deleteCar(c.id!)">{{
            'pages.home.cars.actions.delete' | translate
          }}</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
      } @empty {
      <ion-item>{{ 'pages.home.cars.no-cars' | translate }}</ion-item>
      }
    </ion-list>
    }
  `,
})
export class CarsComponent {
  private carsService = inject(CarsService);
  private translate = inject(TranslateService);

  private readonly langSig = toSignal(
    this.translate.onLangChange.pipe(map((e) => e.lang)),
    { initialValue: this.translate.getCurrentLang() }
  );

  readonly engineVolume = computed(() =>
    this.langSig() === 'ua' ? 'Л.' : 'L.'
  );

  // trick: while there is no data, it will be `null`, show the loader
  private carsSig = toSignal(
    this.carsService.getCars$().pipe(startWith(null as Car[] | null)),
    { initialValue: null }
  );

  readonly loading = computed(() => this.carsSig() === null);
  readonly cars = computed(() => this.carsSig() ?? []);

  async deleteCar(carId: string) {
    await this.carsService.deleteCar(carId);
  }
}
