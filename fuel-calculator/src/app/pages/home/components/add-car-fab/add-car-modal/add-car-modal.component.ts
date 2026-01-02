import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonAddCarModalModule } from './ion-modules';
import { InputItemComponent } from './input-item.component';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'fc-add-car-modal',
  template: ` <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" (click)="cancel()">{{
            'pages.home.cars.actions.cancel' | translate
          }}</ion-button>
        </ion-buttons>
        <ion-title>{{ 'pages.home.cars.new-car' | translate }}</ion-title>
        <ion-buttons slot="end">
          <ion-button
            (click)="confirm()"
            [strong]="true"
            [disabled]="!canConfirm"
            >{{ 'pages.home.cars.actions.confirm' | translate }}</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <fc-input-item
        [(model)]="name"
        [labelPlacement]="'stacked'"
        [label]="'pages.home.cars.form.car-name.label'"
        [placeholder]="'pages.home.cars.form.car-name.placeholder'"
      />
      <fc-input-item
        [(model)]="year"
        [labelPlacement]="'stacked'"
        [label]="'pages.home.cars.form.year.label'"
        [placeholder]="'pages.home.cars.form.year.placeholder'"
      />
      <fc-input-item
        [(model)]="color"
        [labelPlacement]="'stacked'"
        [label]="'pages.home.cars.form.color.label'"
        [placeholder]="'pages.home.cars.form.color.placeholder'"
      />
      <fc-input-item
        [(model)]="engineSize"
        [labelPlacement]="'stacked'"
        [label]="'pages.home.cars.form.engine-size.label'"
        [placeholder]="'pages.home.cars.form.engine-size.placeholder'"
      />
    </ion-content>`,
  imports: [IonAddCarModalModule, InputItemComponent, TranslatePipe],
})
export class AddCarModalComponent {
  private modalCtrl = inject(ModalController);

  name = '';
  year = '';
  color = '';
  engineSize = '';

  // Easy validation
  get canConfirm(): boolean {
    return !!(
      this.name.trim() &&
      this.year.trim() &&
      this.color.trim() &&
      this.engineSize.trim()
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.canConfirm) return;
    return this.modalCtrl.dismiss(
      {
        name: this.name.trim(),
        year: this.year.trim(),
        color: this.color.trim(),
        engineSize: this.engineSize.trim(),
      },
      'confirm'
    );
  }
}
