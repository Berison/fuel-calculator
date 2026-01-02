import { Component, computed, inject, signal } from '@angular/core';
import { IonCarPageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/shared/models/car.interface';
import { CarInfoComponent } from './components/car-info/car-info.component';

@Component({
  selector: 'fc-car-page',
  templateUrl: 'car.page.html',
  imports: [IonCarPageModule, TranslatePipe, CarInfoComponent],
})
export class CarPage {
  private route = inject(ActivatedRoute);

  private carSig = signal<Car>(this.route.snapshot.data['car'] as Car);

  readonly car = computed(() => this.carSig());
}
