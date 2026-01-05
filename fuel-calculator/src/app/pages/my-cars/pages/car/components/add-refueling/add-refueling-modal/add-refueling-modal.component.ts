import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular/standalone';
import { IonAddRefuelingModule } from '../ion-modules';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NewFuelEntry } from 'src/app/shared/models/fuel.type';
import { ToastService } from 'src/app/core/services/ui/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fc-add-refueling-modal',
  templateUrl: 'add-refueling-modal.component.html',
  imports: [ReactiveFormsModule, IonAddRefuelingModule, TranslatePipe],
})
export class AddRefuelingModalComponent {
  private modalCtrl = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastService);
  private translateService = inject(TranslateService);

  private readonly formErrorToast = toSignal(
    this.translateService.stream('pages.home.pages.car.refueling.form.error')
  );

  readonly fuelForm = this.formBuilder.group({
    liters: this.formBuilder.control<number | null>(null, Validators.required),
    priceUAH: this.formBuilder.control<number | null>(
      null,
      Validators.required
    ),
    km: this.formBuilder.control<number | null>(null, Validators.required),
    fullTank: this.formBuilder.control(false, { nonNullable: true }),
  });

  get litersIsNotValid() {
    return (
      this.fuelForm.get('liters')?.touched &&
      this.fuelForm.get('liters')?.hasError('required')
    );
  }

  get uahIsNotValid() {
    return (
      this.fuelForm.get('priceUAH')?.touched &&
      this.fuelForm.get('priceUAH')?.hasError('required')
    );
  }

  get kmIsNotValid() {
    return (
      this.fuelForm.get('km')?.touched &&
      this.fuelForm.get('km')?.hasError('required')
    );
  }

  onSubmit() {
    if (!this.fuelForm.valid) {
      this.toast.error(this.formErrorToast());
      return;
    }

    const v = this.fuelForm.getRawValue();

    const data: NewFuelEntry = {
      liters: v.liters!,
      priceUAH: v.priceUAH!,
      km: v.km!,
      fullTank: v.fullTank,
    };

    this.confirm(data);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: NewFuelEntry) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }
}
