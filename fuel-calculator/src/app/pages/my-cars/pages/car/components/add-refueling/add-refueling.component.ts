import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { AddRefuelingModalComponent } from './add-refueling-modal/add-refueling-modal.component';
import { IonAddRefuelingModule } from './ion-modules';

@Component({
  selector: 'fc-add-refueling',
  template: `<ion-button expand="block" shape="round" (click)="openModal()">
    <ion-icon slot="start" name="add-outline"></ion-icon>
    {{ 'pages.home.pages.car.refueling.button' | translate }}
  </ion-button>`,
  imports: [IonAddRefuelingModule, TranslatePipe],
})
export class AddRefuelingComponent {
  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ addOutline });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddRefuelingModalComponent,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      alert('TEST');
    }
  }
}
