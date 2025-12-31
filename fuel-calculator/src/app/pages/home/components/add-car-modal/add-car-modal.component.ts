import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonAddCarModalModule } from './ion-modules';

@Component({
  selector: 'fc-add-car-modal',
  template: ` <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" (click)="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>New car</ion-title>
        <ion-buttons slot="end">
          <ion-button
            (click)="confirm()"
            [strong]="true"
            [disabled]="!canConfirm"
            >Confirm</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          labelPlacement="stacked"
          label="Enter car name"
          [(ngModel)]="name"
          placeholder="Car name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          labelPlacement="stacked"
          label="Enter year"
          [(ngModel)]="year"
          placeholder="2000"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          labelPlacement="stacked"
          label="Enter car color"
          [(ngModel)]="color"
          placeholder="Black"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          labelPlacement="stacked"
          label="Enter engine size"
          [(ngModel)]="engineSize"
          placeholder="1.6"
        ></ion-input>
      </ion-item>
    </ion-content>`,
  imports: [IonAddCarModalModule, FormsModule],
})
export class AddCarModalComponent {
  name = '';
  year = '';
  color = '';
  engineSize = '';

  get canConfirm(): boolean {
    return !!(
      this.name.trim() &&
      this.year.trim() &&
      this.color.trim() &&
      this.engineSize.trim()
    );
  }

  constructor(private modalCtrl: ModalController) {}

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
