import { Component, computed, input } from '@angular/core';
import { IonCarInfoComponentModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { Car } from 'src/app/shared/models/car.interface';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'fc-car-info',
  template: `<ion-accordion-group expand="inset">
    <ion-accordion value="first">
      <ion-item slot="header" color="light">
        <ion-label>{{
          'pages.home.pages.car.info.title' | translate
        }}</ion-label>
      </ion-item>
      <ion-list class="ion-padding" slot="content">
        <ion-item>
          {{ 'pages.home.pages.car.info.color' | translate }} :
          {{ car().color }}
        </ion-item>
        <ion-item>
          {{ 'pages.home.pages.car.info.engineSize' | translate }} :
          {{ car().engineSize }}
        </ion-item>
        <ion-item>
          {{ 'pages.home.pages.car.info.year' | translate }} :
          {{ car().year }}
        </ion-item>
        <ion-item>
          {{ 'pages.home.pages.car.info.createdAt' | translate }} :
          {{ carDate() | date : 'short' }}
        </ion-item>
      </ion-list>
    </ion-accordion>
  </ion-accordion-group>`,
  imports: [IonCarInfoComponentModule, TranslatePipe, DatePipe],
})
export class CarInfoComponent {
  car = input.required<Car>();

  carDate = computed(() => {
    const car = this.car();
    const ts = car?.createdAt as Timestamp | null | undefined;
    return ts ? ts.toDate() : null;
  });
}
