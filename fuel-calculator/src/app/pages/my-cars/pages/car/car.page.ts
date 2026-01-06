import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { IonCarPageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/shared/models/car.interface';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { AddRefuelingComponent } from './components/add-refueling/add-refueling.component';
import { FuelEntry } from 'src/app/shared/models/fuel.type';
import { CarPageFacade } from './car.facade';
import { FuelNotesComponent } from './components/fuel-notes/fuel-notes.component';

@Component({
  selector: 'fc-car-page',
  templateUrl: 'car.page.html',
  imports: [
    IonCarPageModule,
    TranslatePipe,
    CarInfoComponent,
    AddRefuelingComponent,
    FuelNotesComponent,
  ],
  providers: [CarPageFacade],
})
export class CarPage {
  private route = inject(ActivatedRoute);
  private carPageFacade = inject(CarPageFacade);
  private readonly carId = this.route.snapshot.paramMap.get('carId');

  private carSig = signal<Car>(this.route.snapshot.data['car'] as Car);

  readonly car = computed(() => this.carSig());

  get fuelNotes(): WritableSignal<FuelEntry[] | null> {
    return this.carPageFacade.fuelNotes;
  }

  ionViewDidEnter() {
    this.carId && this.carPageFacade.init(this.carId);
  }
}
