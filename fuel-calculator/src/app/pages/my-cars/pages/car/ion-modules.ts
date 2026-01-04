import { NgModule } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

const MODULES = [
  IonContent,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonBackButton,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonCarPageModule {}
