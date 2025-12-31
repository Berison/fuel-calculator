import { Component, inject } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { AddCarModalComponent } from '../add-car-modal/add-car-modal.component';
import { Car, NewCar } from 'src/app/shared/models/car.interface';

@Component({
  selector: 'fc-add-car-fab',
  template: `<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button id="open-modal" (click)="openModal()">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>`,
  imports: [IonFab, IonFabButton, IonIcon],
})
export class AddCarFabComponent {
  private readonly carService = inject(CarsService);
  private readonly modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ add });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddCarModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }

  createCar(car: NewCar) {
    // this.carService.addCar({
    //   name: 'Test car 2',
    //   year: 2007,
    //   color: 'Yellow',
    //   engineSize: '1.8',
    // });
  }
}
