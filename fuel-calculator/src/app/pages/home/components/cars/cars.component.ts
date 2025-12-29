import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { Car } from 'src/app/shared/models/car.interface';
import { IonCarsComponentModule } from './ion-modules';

@Component({
  standalone: true,
  selector: 'fc-cars',
  imports: [IonCarsComponentModule],
  template: `
    @if (loading()) {
    <ion-spinner />
    } @else {
    <ion-list>
      @for (c of cars(); track c.id) {
      <ion-item-sliding>
        <ion-item>
          <ion-label>
            <h2>{{ c.name }}</h2>
            <p>{{ c.year }} - {{ c.color }} - {{ c.engineSize }}</p>
          </ion-label></ion-item
        >
        <ion-item-options>
          <ion-item-option color="danger" (click)="deleteCar(c.id!)"
            >Delete</ion-item-option
          >
        </ion-item-options>
      </ion-item-sliding>
      } @empty {
      <ion-item>No cars yet</ion-item>
      }
    </ion-list>
    }
  `,
})
export class CarsComponent {
  private carsService = inject(CarsService);

  // trick: while there is no data, it will be `null`, and we show the loader
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
