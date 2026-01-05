import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ModalController } from '@ionic/angular/standalone';
import { IonAddRefuelingModule } from '../ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { FuelEntry } from 'src/app/shared/models/fuel.type';

@Component({
  selector: 'fc-add-refueling-modal',
  templateUrl: 'add-refueling-modal.component.html',
  imports: [ReactiveFormsModule, IonAddRefuelingModule, TranslatePipe],
})
export class AddRefuelingModalComponent {
  private modalCtrl = inject(ModalController);
  private formBuilder = inject(FormBuilder);

  readonly fuelForm = this.formBuilder.group({
    liters: ['', Validators.required],
    uah: ['', Validators.required],
    km: ['', Validators.required],
    fullTank: [false],
  });

  get litersIsNotValid() {
    return (
      this.fuelForm.get('liters')?.touched &&
      this.fuelForm.get('liters')?.hasError('required')
    );
  }

  get uahIsNotValid() {
    return (
      this.fuelForm.get('uah')?.touched &&
      this.fuelForm.get('uah')?.hasError('required')
    );
  }

  get kmIsNotValid() {
    return (
      this.fuelForm.get('km')?.touched &&
      this.fuelForm.get('km')?.hasError('required')
    );
  }

  onSubmit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: FuelEntry) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }
}
