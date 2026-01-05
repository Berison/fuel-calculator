import { Component, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { AddRefuelingModalComponent } from './add-refueling-modal/add-refueling-modal.component';
import { IonAddRefuelingModule } from './ion-modules';
import { NewFuelEntry } from 'src/app/shared/models/fuel.type';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/ui/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'fc-add-refueling',
  template: `<ion-button expand="block" shape="round" (click)="openModal()">
    <ion-icon slot="start" name="add-outline"></ion-icon>
    {{ 'pages.home.pages.car.refueling.button' | translate }}
  </ion-button>`,
  imports: [IonAddRefuelingModule, TranslatePipe],
})
export class AddRefuelingComponent {
  private readonly carService = inject(CarsService);
  private readonly modalCtrl = inject(ModalController);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly translateService = inject(TranslateService);

  private readonly carId = this.route.snapshot.paramMap.get('carId');

  private readonly msgToast = toSignal(
    this.translateService
      .stream([
        'toast.success.added-refuel-note',
        'toast.error.added-refuel-note',
      ])
      .pipe(
        map((msg) => ({
          success: msg['toast.success.added-refuel-note'],
          error: msg['toast.error.added-refuel-note'],
        }))
      ),
    { initialValue: { success: '', error: '' } }
  );

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
      this.createRefuelNote(data);
    }
  }

  createRefuelNote(refuelNote: NewFuelEntry) {
    this.carService
      .addRefuelToCar(refuelNote, this.carId as string)
      .then(() => this.toast.success(this.msgToast().success))
      .catch(() => this.toast.error(this.msgToast().error));
  }
}
