import { NgModule } from '@angular/core';
import {
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonItemOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, car } from 'ionicons/icons';

const MODULES = [
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonItemOption,
  IonIcon,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonCarsComponentModule {
  constructor() {
    addIcons({ car, addCircle });
  }
}
