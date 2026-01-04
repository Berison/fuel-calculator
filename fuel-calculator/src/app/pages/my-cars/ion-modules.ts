import { NgModule } from '@angular/core';
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';

const MODULES = [
  IonContent,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonBackButton,
  IonButtons,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonMyCarsPageModule {}
