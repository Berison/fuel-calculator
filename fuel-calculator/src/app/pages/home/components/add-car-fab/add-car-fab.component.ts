import { Component, inject } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CarsService } from 'src/app/core/services/database/cars.service';

@Component({
  selector: 'fc-add-car-fab',
  template: `<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button (click)="createCar()">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>`,
  imports: [IonFab, IonFabButton, IonIcon],
})
export class AddCarFabComponent {
  private readonly carService = inject(CarsService);

  constructor() {
    addIcons({ add });
  }

  createCar() {
    // this.carService.addCar({
    //   name: 'Test car 2',
    //   year: 2007,
    //   color: 'Yellow',
    //   engineSize: '1.8',
    // });
  }
}
