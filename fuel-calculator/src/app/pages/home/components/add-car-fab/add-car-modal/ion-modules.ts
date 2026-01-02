import { NgModule } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

const MODULES = [
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonAddCarModalModule {}
