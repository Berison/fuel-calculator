import { NgModule } from '@angular/core';
import {
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonItemOption,
} from '@ionic/angular/standalone';

const MODULES = [
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonItemOption,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonCarsComponentModule {}
